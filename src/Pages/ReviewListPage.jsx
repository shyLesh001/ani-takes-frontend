import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "https://anitakes-backend.onrender.com/api/reviews";

function ReviewListPage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => setReviews(response.data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Anime Reviews</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-gray-800 text-white p-4 rounded-lg shadow-lg"
          >
            {/* Display Anime Poster - Reduced Size */}
            {review.animeImage && (
              <img
                src={review.animeImage}
                alt={review.animeTitle}
                className="w-full h-40 object-cover rounded-md"
              />
            )}

            <h2 className="text-lg font-semibold mt-2">{review.animeTitle}</h2>
            <p className="text-gray-300 text-sm mt-1">⭐ {review.rating} / 5</p>
            <p className="mt-2 text-gray-200 text-sm">
              {review.reviewText.slice(0, 80)}...
            </p>

            {/* Read More Button */}
            <Link
              to={`/review/${review._id}`}
              className="block mt-3 text-blue-400 hover:underline text-sm"
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewListPage;
