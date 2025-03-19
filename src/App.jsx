import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import ReviewListPage from "./Pages/ReviewListPage";
import ReviewPage from "./Pages/ReviewPage";
import NewReviewPage from "./Pages/NewReviewPage";
import UpdateReviewPage from "./Pages/UpdateReviewPage";
import ProfilePage from "./Pages/ProfilePage";
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
