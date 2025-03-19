import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const API_URL = "https://anitakes-backend.onrender.com/api/reviews";

function UpdateReviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/${id}`)
      .then((response) => {
        setReviewText(response.data.reviewText);
        setRating(response.data.rating);
      })
      .catch((error) => console.error("Error fetching review:", error));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("reviewText", reviewText);
    formData.append("rating", rating);
    if (image) formData.append("image", image);

    try {
      await axios.put(`${API_URL}/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user?.token}`,
        },
      });
      navigate(`/review/${id}`);
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  return (
    <div className="p-6 text-white max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-center">Update Review</h1>
      <form onSubmit={handleUpdate} className="mt-4">
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          required
          className="w-full p-2 border-2 rounded-md bg-gray-700 text-white"
        />
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="1"
          max="5"
          required
          className="w-full p-2 border-2 rounded-md bg-gray-700 text-white mt-2"
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="p-2 mt-2"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-md mt-4"
        >
          Update Review
        </button>
      </form>
    </div>
  );
}

export default UpdateReviewPage;
