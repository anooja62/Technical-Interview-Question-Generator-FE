import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);

      const user = result.user;
      const userData = {
        sso_id: user.uid,
        username: user.displayName ?? "",
        email: user.email ?? "",
        image: user.photoURL ?? "",
      };

      // Save user to backend
      const response = await axiosClient.post("/login", userData);

      if (response.status !== 200) {
        throw new Error(response.data.message || "Failed to save user");
      }

   
//localStorage.setItem("user", JSON.stringify(userData));

dispatch(setUser(userData));
navigate("/");
    
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-purple-100 flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-3xl shadow-xl max-w-md w-full text-center transition-all duration-300">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4 tracking-tight">
          CodeCrack
        </h1>
        <p className="text-gray-500 mb-8 text-sm">
          Crack your tech interviews with AI-powered question generation.
        </p>
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className={`bg-white border border-gray-300 hover:shadow-lg transition-all text-gray-700 font-medium py-2 px-4 rounded-lg w-full flex items-center justify-center gap-3 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          {loading ? "Signing in..." : "Sign in with Google"}
        </button>
        <p className="mt-6 text-xs text-gray-400">
          By continuing, you agree to CodeCrack's Terms and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
