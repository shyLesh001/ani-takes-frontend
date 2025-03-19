import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          "https://anitakes-backend.onrender.com/api/reviews"
        );

        console.log("User ID:", user._id);
        console.log("Fetched Reviews:", response.data);

        // Ensure `review.user` is a string
        const userReviews = response.data.filter((review) => {
          console.log("Review User ID:", review.user);
          return review.user?._id === user._id || review.user === user._id;
        });

        setReviews(userReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [user]);

  return (
    <div className="p-6 max-w-3xl mx-auto bg-gray-900 text-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center">Profile</h1>
      <p className="text-center text-gray-400">Welcome, {user?.username}</p>

      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
      >
        Logout
      </button>

      {/* User Reviews Section */}
      <div className="mt-6">
        <h2 className="text-xl font-bold">Your Reviews</h2>
        {loading ? (
          <p className="text-gray-400">Loading your reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="text-gray-500">You haven't posted any reviews yet.</p>
        ) : (
          <ul className="mt-4">
            {reviews.map((review) => (
              <li key={review._id} className="border-b border-gray-800 py-2">
                <h3 className="text-lg font-bold">{review.animeTitle}</h3>
                <p className="text-gray-400">Rating: {review.rating} / 10</p>
                <p>{review.reviewText}</p>
                <button
                  onClick={() => navigate(`/review/${review._id}`)}
                  className="text-blue-400"
                >
                  View Review
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
