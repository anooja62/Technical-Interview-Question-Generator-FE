export default function ProcessOverview() {
  return (
    <div className="bg-gradient-to-b from-purple-100 via-white to-blue-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">Ace Your Interview in 3 Steps</h2>
        <p className="mt-4 text-lg text-gray-600">
          Crack technical interviews with smart question generation and real-time practice.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {[
          {
            title: "Sign In & Choose Tech",
            color: "blue-600",
            desc: "Log in with Google and select the technology you want to prepare for."
          },
          {
            title: "Generate Questions Instantly",
            color: "purple-600",
            desc: "Let AI create tailored interview questions and quizzes on demand."
          },
          {
            title: "Practice & Improve",
            color: "green-600",
            desc: "Attempt quizzes, review answers, and get closer to cracking the job."
          },
        ].map(({ title, color, desc }, idx) => (
          <div
            key={idx}
            className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2 hover:scale-105 duration-300 cursor-pointer"
          >
            <h3 className={`text-xl font-semibold text-${color} mb-2`}>
              {idx + 1}. {title}
            </h3>
            <p className="text-gray-600">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
