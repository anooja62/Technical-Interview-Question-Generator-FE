import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { clearUser } from "../store/userSlice";

export default function Profile() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <p className="text-xl text-gray-500">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-purple-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-4 tracking-tight">
          Your Profile
        </h1>

        <img
          src={user.image}
          alt="Profile"
          className="w-28 h-28 rounded-full border-4 border-blue-600 object-cover mx-auto mb-4 shadow-md"
        />

        <div className="space-y-3 text-gray-700 text-left">
          <div className="flex justify-between border-b pb-2">
       
            <span className="font-semibold">{user.username || "—"}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
  
            <span className="font-semibold">{user.email || "—"}</span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
