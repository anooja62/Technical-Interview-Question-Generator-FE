// src/pages/Home.tsx
import Footer from "../components/Footer";
import Header from "../components/Header";
import MainSection from "../components/MainSection";
import ProcessOverview from "../components/ProcessOverview";

export default function Home() {
  return (
    <div>
      <Header />
      <ProcessOverview />
      <MainSection />
      <Footer/>
    </div>
  );
}
