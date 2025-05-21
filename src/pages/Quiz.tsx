import { useState } from "react";

const sampleQuestions = [
  {
    id: 1,
    question: "What does `useState` do in React?",
    options: [
      "Updates the DOM",
      "Manages side effects",
      "Manages component state",
      "Handles routing"
    ],
    answer: 2,
  },
  {
    id: 2,
    question: "Which HTTP method is used to create a resource?",
    options: ["GET", "POST", "PUT", "DELETE"],
    answer: 1,
  },
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleOptionClick = (index: number) => {
    setSelected(index);
  };

  const handleNext = () => {
    if (selected !== null) {
      const updatedAnswers = [...answers];
      updatedAnswers[current] = selected;
      setAnswers(updatedAnswers);
      setSelected(null);
      setCurrent((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrent((prev) => prev - 1);
    setSelected(answers[current - 1] ?? null);
  };

  const handleSubmit = () => {
    if (selected !== null) {
      const updatedAnswers = [...answers];
      updatedAnswers[current] = selected;
      setAnswers(updatedAnswers);
    }
    setSubmitted(true);
  };

  const score = answers.reduce((acc, ans, idx) => {
    return ans === sampleQuestions[idx].answer ? acc + 1 : acc;
  }, 0);

  const isLastQuestion = current === sampleQuestions.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-2xl rounded-3xl p-8 max-w-2xl w-full">
        {!submitted ? (
          <>
            <h2 className="text-xl font-bold text-blue-700 mb-4">
              Question {current + 1} of {sampleQuestions.length}
            </h2>
            <p className="text-gray-800 text-lg mb-6 font-medium">
              {sampleQuestions[current].question}
            </p>
            <div className="space-y-3 mb-6">
              {sampleQuestions[current].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(index)}
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
                onClick={handlePrev}
                disabled={current === 0}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition disabled:opacity-50"
              >
                Previous
              </button>
              {isLastQuestion ? (
                <button
                  onClick={handleSubmit}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
                >
                  Submit
                </button>
              ) : (
                <button
                  onClick={handleNext}
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
              Your Score: <span className="font-bold">{score}</span> / {sampleQuestions.length}
            </p>
            <button
              onClick={() => {
                setCurrent(0);
                setAnswers([]);
                setSelected(null);
                setSubmitted(false);
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
