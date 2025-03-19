import { Routes, Route } from "react-router-dom"; // ❌ Removed BrowserRouter here
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ReviewListPage from "./pages/ReviewListPage";
import ReviewPage from "./pages/ReviewPage";
import NewReviewPage from "./pages/NewReviewPage";
import UpdateReviewPage from "./pages/UpdateReviewPage";
import ProfilePage from "./pages/ProfilePage";
import "./index.css";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reviews" element={<ReviewListPage />} />
          <Route path="/review/:id" element={<ReviewPage />} />
          <Route
            path="/new-review"
            element={
              <ProtectedRoute>
                <NewReviewPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-review/:id"
            element={
              <ProtectedRoute>
                <UpdateReviewPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
