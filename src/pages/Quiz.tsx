import { useDispatch, useSelector } from "react-redux";
import {
  selectOption,
  nextQuestion,
  prevQuestion,
  submitQuiz,
  resetQuiz,
  setQuestions,
} from "../store/quizSlice";
import axiosClient from "../api/axiosClient";
import { RootState } from "../store";
import {  useState } from "react";

export default function Quiz() {
  const dispatch = useDispatch();
  const { questions, current, selected, answers, submitted } = useSelector(
    (state: RootState) => state.quiz
  );

  const [jobRequirements, setJobRequirements] = useState("");
  const [experience, setExperience] = useState("junior");
  const [quizStarted, setQuizStarted] = useState(false);

  const fetchQuestions = async () => {
    try {
      const response = await axiosClient.post("/quiz", {
        jobRequirements,
        experience,
      });
      dispatch(setQuestions(response.data.questions));
      setQuizStarted(true);
    } catch (err) {
      console.error("Failed to load questions", err);
    }
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full">
          <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Start Quiz</h2>

          <label className="block mb-4">
            <span className="text-gray-700 font-medium">Job Requirements</span>
            <input
              type="text"
              value={jobRequirements}
              onChange={(e) => setJobRequirements(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200 placeholder-gray-400 "
              placeholder="e.g., React, Node.js, MongoDB"
            />
          </label>

          <label className="block mb-6">
            <span className="text-gray-700 font-medium">Experience Level</span>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
            >
              <option value="junior">Junior</option>
              <option value="mid">Mid</option>
              <option value="senior">Senior</option>
            </select>
          </label>

          <button
            onClick={fetchQuestions}
            className="w-full bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
            disabled={!jobRequirements.trim()}
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) return <p className="text-center">Loading questions...</p>;

  const score = answers.reduce((acc, ans, idx) => {
    return ans === questions[idx]?.answer ? acc + 1 : acc;
  }, 0);

  const isLastQuestion = current === questions.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-2xl rounded-3xl p-8 max-w-2xl w-full">
        {!submitted ? (
          <>
            <h2 className="text-xl font-bold text-blue-700 mb-4">
              Question {current + 1} of {questions.length}
            </h2>
            <p className="text-gray-800 text-lg mb-6 font-medium">
              {questions[current].question}
            </p>
            <div className="space-y-3 mb-6">
              {questions[current].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => dispatch(selectOption(index))}
                  className={`block w-full text-left px-4 py-3 rounded-lg border ${
                    selected === index
                      ? "bg-blue-600 text-white border-blue-700"
                      : "bg-white text-gray-700 hover:bg-blue-50"
                  } transition`}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={() => dispatch(prevQuestion())}
                disabled={current === 0}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition disabled:opacity-50"
              >
                Previous
              </button>
              {isLastQuestion ? (
                <button
                  onClick={() => dispatch(submitQuiz())}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
                >
                  Submit
                </button>
              ) : (
                <button
                  onClick={() => dispatch(nextQuestion())}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                >
                  Next
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-green-600 mb-4">Quiz Completed!</h2>
            <p className="text-xl text-gray-700">
              Your Score: <span className="font-bold">{score}</span> / {questions.length}
            </p>
            <button
              onClick={() => {
                dispatch(resetQuiz());
                setQuizStarted(false);
              }}
              className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Retake Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
