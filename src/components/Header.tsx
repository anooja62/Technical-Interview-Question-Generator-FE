import interview from "../assets/interview.png";

export default function Header() {
  return (
    <div className="h-auto md:h-[50vh] bg-gradient-to-b from-blue-50 via-white to-purple-100 px-4 py-12 flex items-center justify-center">
      <div className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-10">
        {/* Left Branding/Intro */}
        <div className="text-center md:text-left flex-1">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-700 leading-snug md:leading-tight">
            Crack Your <span className="text-purple-600">Tech Interview</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mt-4">
            Generate AI-powered technical interview questions tailored to your skills.
          </p>
        </div>

        {/* Right Image */}
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
          <img src={interview} alt="Interview Illustration" className="w-full h-auto" />
        </div>
      </div>
    </div>
  );
}
