import interview from "../assets/interview.png";

export default function Header() {
  return (
    <div className="h-[50vh] bg-gradient-to-b from-blue-50 via-white to-purple-100 px-4 py-12 flex items-center justify-center">
      <div className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-10">
        {/* Left Branding/Intro */}
        <div className="text-center md:text-left flex-1">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 leading-tight">
            Crack Your <span className="text-purple-600">Tech Interview</span>
          </h1>
          <p className="text-gray-600 mt-4 text-lg">
            Generate AI-powered technical interview questions tailored to your skills.
          </p>
        
        </div>

        {/* Right Image */}
        <div className="w-full md:max-w-md">
          <img src={interview} alt="Interview Illustration" />
        </div>
      </div>
    </div>
  );
}
