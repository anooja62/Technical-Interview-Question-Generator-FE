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
import { useNavigate } from "react-router-dom";

export default function Quiz() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  {questions[current].options.map((option, index) => {
    const isCorrect = index === questions[current].answer;
    const isSelected = selected !== null && index === selected;

    let styles = "bg-white text-gray-700 hover:bg-blue-50";
    if (selected !== null) {
      if (isSelected && isCorrect) {
        styles = "bg-green-100 text-green-800 border border-green-500";
      } else if (isSelected && !isCorrect) {
        styles = "bg-red-100 text-red-800 border border-red-500";
      } else if (!isSelected && isCorrect) {
        styles = "bg-green-50 text-green-700 border border-green-300";
      } else {
        styles += " opacity-50";
      }
    }

    return (
      <button
        key={index}
        onClick={() => {
          if (selected === null) {
            dispatch(selectOption(index));
          }
        }}
        disabled={selected !== null}
        className={`block w-full text-left px-4 py-3 rounded-lg transition ${styles}`}
      >
        {option}
      </button>
    );
  })}
</div>

            <div className="flex justify-between mt-6">
        
              <div className="flex flex-wrap gap-4 mt-6 justify-between">
  <button
    onClick={() => dispatch(prevQuestion())}
    disabled={current === 0}
    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition disabled:opacity-50"
  >
    Previous
  </button>

  <div className="flex gap-4">
    <button
      onClick={() => dispatch(nextQuestion())}
      disabled={isLastQuestion}
      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition disabled:opacity-50"
    >
      Next
    </button>

    <button
      onClick={() => {
        if (window.confirm("Are you sure you want to submit the quiz?")) {
          dispatch(submitQuiz());
        }
      }}
      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
    >
      Submit
    </button>
  </div>
</div>

            </div>
          </>
        ) : (
          
      <div>
   

    <div className="text-center">
  <h2 className="text-3xl font-bold text-green-600 mb-4">Quiz Completed!</h2>
  <p className="text-xl text-gray-700">
    Your Score: <span className="font-bold">{score}</span> / {questions.length}
  </p>

  <div className="flex justify-center gap-4 mt-6 flex-wrap">
    <button
      onClick={() => {
        dispatch(resetQuiz());
        setQuizStarted(false);
      }}
      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
    >
      Retake Quiz
    </button>
    <button
      onClick={() => navigate("/profile")}
      className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
    >
      Go to Profile
    </button>
  </div>
</div>

         

  </div>
        
        )}
      </div>
    </div>
  );
}
