import { useState } from "react";
import Form from "../components/Form";
import QuestionCard from "../components/QuestionCard";
import { GeneratedQuestion } from "../types";

export default function Home() {
  const [questions, setQuestions] = useState<GeneratedQuestion[]>([]);

  const handleGeneratedQuestions = (newQuestions: GeneratedQuestion[]) => {
    setQuestions(newQuestions);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Technical Interview Question Generator
        </h1>
        <Form onGenerated={handleGeneratedQuestions} />
      </div>

      {questions.map((q, index) => (
        <div key={index} className="w-full max-w-2xl mt-6 bg-white rounded-2xl shadow-lg p-6">
          <QuestionCard {...q} />
        </div>
      ))}
    </div>
  );
}
