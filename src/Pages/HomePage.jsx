import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "https://api.jikan.moe/v4/top/anime";

const HomePage = () => {
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const response = await axios.get(API_URL);
        setAnimeList(response.data.data.slice(0, 30)); // Show 30 top animes
      } catch (error) {
        console.error("Error fetching anime:", error);
      }
    };
    fetchAnime();
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center">
      {/* Background Grid */}
      <div className="anime-background">
        {animeList.map((anime) => (
          <img
            key={anime.mal_id}
            src={anime.images.jpg.large_image_url}
            alt={anime.title}
            className="w-full h-full object-cover"
          />
        ))}
      </div>

      {/* Dark Overlay */}
      <div className="anime-overlay"></div>

      {/* Main Content */}
      <div className="container">
        <h1>Welcome to AniTakes</h1>
        <p>Discover, review, and discuss your favorite anime.</p>
        <div className="buttons">
          <Link to="/login">
            <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-md">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-green-500 hover:bg-green-600 text-white rounded-md">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
