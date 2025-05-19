import Header from "../components/Header";
import Navbar from "../components/Navbar";
import ProcessOverview from "../components/ProcessOverview";
import QuestionGenerator from "../components/QuestionGenerator";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Header/>
      <ProcessOverview/>
      <QuestionGenerator/>
    </div>
  );
}
