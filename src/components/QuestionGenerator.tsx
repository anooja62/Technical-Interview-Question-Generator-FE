import { useState } from "react";
import QuestionCard from "./QuestionCard";
import { GeneratedQuestion } from "../types";
import Form from "./Form";

export default function QuestionGenerator() {
  const [questions, setQuestions] = useState<GeneratedQuestion[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const QUESTIONS_PER_PAGE = 1;

  const handleGeneratedQuestions = (newQuestions: GeneratedQuestion[]) => {
    setQuestions(newQuestions);
    setCurrentPage(1); // Reset page on new questions
  };

  const paginatedQuestions = questions.slice(
    (currentPage - 1) * QUESTIONS_PER_PAGE,
    currentPage * QUESTIONS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-100 px-4 py-12 flex items-center justify-center">
      <div className="w-full max-w-3xl flex flex-col items-center">
        <div className="w-full bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-8">
            Practice Smarter, Interview Better
          </h1>
          <Form onGenerated={handleGeneratedQuestions} />
        </div>

        {paginatedQuestions.map((q, index) => (
          <div
            key={index}
            className="w-full mt-8 bg-white rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 hover:scale-[1.02] transition duration-300 p-6"
          >
            <QuestionCard
              {...q}
              number={index + 1 + (currentPage - 1) * QUESTIONS_PER_PAGE}
            />
          </div>
        ))}

        {questions.length > 0 && (
          <div className="flex justify-center items-center gap-6 mt-10">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-md transition 
                ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white hover:bg-purple-100 text-purple-700"
                }`}
            >
              &lt;
            </button>
            <button
              disabled={currentPage * QUESTIONS_PER_PAGE >= questions.length}
              onClick={() => setCurrentPage((p) => p + 1)}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-md transition
                ${
                  currentPage * QUESTIONS_PER_PAGE >= questions.length
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-purple-600 text-white hover:bg-purple-700"
                }`}
            >
              &gt;
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
