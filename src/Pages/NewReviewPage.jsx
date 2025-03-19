import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AnimeSearch from "../components/AnimeSearch";
import AuthContext from "../context/AuthContext"; // Import authentication context

const API_URL = "https://anitakes-backend.onrender.com/api/reviews";

function NewReviewPage() {
  const { user } = useContext(AuthContext); // Get user from context
  const navigate = useNavigate(); // Navigation hook
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (!user || !user.token) {
      setError("You must be logged in to submit a review.");
      return;
    }

    if (!selectedAnime || !reviewText || !rating) {
      setError("Please select an anime, write a review, and provide a rating.");
      return;
    }

    if (reviewText.length < 10) {
      setError("Review must be at least 10 characters long.");
      return;
    }

    if (rating < 1 || rating > 10) {
      setError("Rating must be between 1 and 10.");
      return;
    }

    setLoading(true); // Set loading to true

    console.log("Submitting review for:", selectedAnime);

    const formData = new FormData();
    formData.append("animeTitle", selectedAnime?.title || "");
    formData.append(
      "animeImage",
      selectedAnime?.images?.jpg?.large_image_url || ""
    );
    formData.append("reviewText", reviewText);
    formData.append("rating", rating);
    if (image) formData.append("image", image);

    try {
      const response = await axios.post(API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      });

      console.log("Review submitted successfully:", response.data);
      alert("Review submitted successfully!");
      navigate("/reviews");
    } catch (error) {
      console.error("Error submitting review:", error.response?.data || error);
      setError(
        error.response?.data?.message ||
          "Failed to submit review. Please try again."
      );
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-gray-900 text-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center">Submit a Review</h1>

      {/* Display error messages */}
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}

      {/* Anime Search component */}
      <AnimeSearch setSelectedAnime={setSelectedAnime} />

      {/* Show selected anime */}
      {selectedAnime && (
        <div className="mt-4 text-center">
          <h3 className="text-xl">{selectedAnime.title}</h3>
          <img
            src={selectedAnime.images.jpg.large_image_url}
            alt={selectedAnime.title}
            className="w-40 h-60 mx-auto rounded-lg"
          />
        </div>
      )}

      {/* Review Form */}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <textarea
            placeholder="Write your review here (min. 10 characters)"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
            minLength="10"
            className="w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-white"
          />
        </div>

        <div className="mb-4">
          <input
            type="number"
            placeholder="Rating (1-10)"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="10"
            required
            className="w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-white"
          />
        </div>

        <div className="mb-4">
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="p-2"
          />
        </div>

        <button
          type="submit"
          className={`w-full p-2 rounded-md text-white ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}

export default NewReviewPage;
