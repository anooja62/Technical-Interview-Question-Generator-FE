import { useState } from "react";
//import { generateQuestion } from "../services/api";
import { QuestionInput, GeneratedQuestion } from "../types";

interface Props {
  onGenerated: (q: GeneratedQuestion[]) => void;  // Change from single question to array of questions
}

export default function Form({ onGenerated }: Props) {
  const [form, setForm] = useState<QuestionInput>({ role: "", experience: "junior" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8000/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data: GeneratedQuestion[] = await res.json();
    onGenerated(data);  // Pass the array of questions to the parent
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        name="role"
        value={form.role}
        onChange={handleChange}
        placeholder="Job Role"
        required
        className="border border-gray-300 rounded px-4 py-2"
      />
      <label className="text-sm font-medium text-gray-700">
        Experience Level
        <select
          name="experience"
          value={form.experience}
          onChange={handleChange}
          className="mt-1 border border-gray-300 rounded px-4 py-2 w-full"
        >
          <option value="junior">Junior</option>
          <option value="mid">Mid</option>
          <option value="senior">Senior</option>
        </select>
      </label>
      <button
        type="submit"
        className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition"
      >
        Generate
      </button>
    </form>
  );
}
