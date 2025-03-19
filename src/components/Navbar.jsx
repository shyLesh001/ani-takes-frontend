import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Hide Navbar if on Home Page
  if (location.pathname === "/") return null;

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center fixed top-0 left-0 w-full z-50">
      {/* Clicking AniTakes Logo navigates users correctly */}
      <Link
        to={user ? "/reviews" : "/"}
        className="text-2xl font-bold text-blue-400"
      >
        AniTakes
      </Link>

      <div className="space-x-4">
        <Link to="/reviews" className="hover:text-blue-400">
          Reviews
        </Link>

        {user ? (
          <>
            <Link to="/profile" className="hover:text-blue-400">
              Profile
            </Link>
            <Link to="/new-review" className="hover:text-blue-400">
              Submit Review
            </Link>
            <button
              onClick={logout}
              className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-500 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-blue-400">
              Login
            </Link>
            <Link to="/register" className="hover:text-blue-400">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
