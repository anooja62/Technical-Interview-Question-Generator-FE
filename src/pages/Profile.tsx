import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { clearUser } from "../store/userSlice";
import { FaSignOutAlt } from "react-icons/fa";
export default function Profile() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      dispatch(clearUser());
      localStorage.removeItem("user");
      navigate("/");
    }
  };
  

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <p className="text-xl text-gray-500">
          Please log in to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-tr from-blue-50 via-white to-purple-100">
      {/* Sidebar */}
      <aside className="w-full sm:w-72 bg-white shadow-xl p-6 flex flex-col items-center">
        <img
          src={user.image}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-blue-500 mb-4 object-cover"
        />
        <h2 className="text-lg font-bold text-blue-700">{user.username}</h2>
        <p className="text-sm text-gray-600">{user.email}</p>
        <button
          onClick={handleLogout}
          className="mt-6 flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition font-semibold"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </aside>

      {/* Main Profile Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-purple-700 mb-4">
          Quiz Progress
        </h1>

        {/* Placeholder for quiz stats */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div className="bg-white rounded-xl p-4 shadow text-center">
            <h2 className="text-xl font-semibold text-blue-700">
              Total Quizzes
            </h2>
            <p className="mt-2 text-2xl font-bold text-gray-800">5</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow text-center">
            <h2 className="text-xl font-semibold text-green-700">Best Score</h2>
            <p className="mt-2 text-2xl font-bold text-gray-800">4 / 5</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow text-center">
            <h2 className="text-xl font-semibold text-purple-700">
              Average Score
            </h2>
            <p className="mt-2 text-2xl font-bold text-gray-800">3.6</p>
          </div>
        </div>
      </main>
    </div>
  );
}
