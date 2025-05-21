import { useNavigate } from "react-router-dom";

export default function MainSection() {
  const navigate = useNavigate();

  const handleProtectedRoute = (route: string) => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    } else {
      navigate(route);
    }
  };

  return (
    <div className="min-h-[60vh] flex flex-col md:flex-row gap-8 px-6 py-12 bg-gradient-to-b from-blue-50 via-white to-purple-100">
      
      {/* Left Side – Quiz */}
      <div className="flex-1 bg-white rounded-2xl shadow-md p-8 flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-bold text-purple-700 mb-4">Take a Quiz</h2>
          <p className="text-gray-600 mb-6">
            Test your knowledge with multiple choice questions across various technical domains. Improve your accuracy and timing!
          </p>
        </div>
        <button
          onClick={() => handleProtectedRoute("/quiz")}
          className="self-start mt-auto bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
        >
          Go to Quiz
        </button>
      </div>

      {/* Right Side – Question Generator */}
      <div className="flex-1 bg-white rounded-2xl shadow-md p-8 flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-bold text-blue-700 mb-4">Generate Questions</h2>
          <p className="text-gray-600 mb-6">
            Instantly generate technical interview questions by technology and difficulty level. Great for focused preparation!
          </p>
        </div>
        <button
          onClick={() => handleProtectedRoute("/questions")}
          className="self-start mt-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Go to Question Generator
        </button>
      </div>
    </div>
  );
}
