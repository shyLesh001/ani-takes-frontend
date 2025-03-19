import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ReviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [review, setReview] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReview();
    fetchComments();
  }, [id]);

  const fetchReview = async () => {
    try {
      const response = await axios.get(
        `https://anitakes-backend.onrender.com/api/reviews/${id}`
      );
      setReview(response.data);
    } catch (error) {
      console.error("Error fetching review:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `https://anitakes-backend.onrender.com/api/reviews/${id}/comments`
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await axios.post(
        `https://anitakes-backend.onrender.com/api/reviews/${id}/comments`,
        { text: newComment },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setComments([...comments, response.data.comment]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?"))
      return;

    try {
      await axios.delete(
        `https://anitakes-backend.onrender.com/api/reviews/comment/${commentId}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setComments(comments.filter((comment) => comment._id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleDeleteReview = async () => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await axios.delete(
        `https://anitakes-backend.onrender.com/api/reviews/${id}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      navigate("/reviews"); // Redirect after deletion
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-gray-900 text-white rounded-lg shadow-lg">
      {loading ? (
        <p className="text-center text-gray-400">Loading review...</p>
      ) : review ? (
        <>
          <h3 className="text-2xl font-bold">{review.animeTitle}</h3>
          <img
            src={review.animeImage}
            alt={review.animeTitle}
            className="w-40 h-60 rounded-lg my-4"
          />
          <p className="mt-2 text-lg">{review.reviewText}</p>
          <p className="text-gray-400">Rating: {review.rating} / 10</p>

          {/* Show Edit & Delete buttons if the user is the review owner */}
          {user &&
            review.user &&
            (review.user === user._id || review.user?._id === user._id) && (
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => navigate(`/update-review/${id}`)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={handleDeleteReview}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            )}

          {/* Comments Section */}
          <div className="mt-6 border-t border-gray-700 pt-4">
            <h4 className="text-lg font-bold">Comments</h4>
            {comments.length === 0 ? (
              <p className="text-gray-500">No comments yet.</p>
            ) : (
              <ul>
                {comments.map((comment) => (
                  <li
                    key={comment._id}
                    className="border-b border-gray-800 py-2 flex justify-between items-center"
                  >
                    <span>
                      <strong>{comment.user?.username || "Unknown"}:</strong>{" "}
                      {comment.text}
                    </span>
                    {user && comment.user && user._id === comment.user._id && (
                      <button
                        onClick={() => handleDeleteComment(comment._id)}
                        className="text-red-400 hover:text-red-600"
                      >
                        Delete
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}

            {/* Add Comment */}
            {user && (
              <div className="mt-4">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white"
                  placeholder="Add a comment..."
                ></textarea>
                <button
                  onClick={handleAddComment}
                  className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-blue-600"
                >
                  Submit Comment
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <p className="text-center text-red-400">Review not found.</p>
      )}
    </div>
  );
};

export default ReviewPage;
