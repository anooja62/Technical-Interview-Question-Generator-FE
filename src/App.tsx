// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Questions from "./pages/Questions";
import Navbar from "./components/Navbar";

import Profile from "./pages/Profile";
import Quiz from "./pages/Quiz";

function App() {
  return (
    <BrowserRouter>
    
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/profile" element={<Profile />} />   
         <Route path="/quiz" element={<Quiz />} />
      </Routes>

   
     
    </BrowserRouter>
  );
}

export default App;
