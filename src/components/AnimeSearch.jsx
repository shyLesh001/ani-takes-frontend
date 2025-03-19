import { useState } from "react";
import axios from "axios";

const AnimeSearch = ({ setSelectedAnime }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.jikan.moe/v4/anime?q=${query}&limit=5`
      );
      setResults(response.data.data);
    } catch (error) {
      console.error("Error fetching anime data:", error);
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search Anime..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-gray-500 mt-2">Loading...</p>}

      {results.length > 0 && (
        <ul className="mt-4 border rounded-md p-2 bg-gray-800">
          {results.map((anime) => (
            <li
              key={anime.mal_id}
              className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-700 rounded-md"
              onClick={() => setSelectedAnime(anime)}
            >
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                className="w-12 h-16 object-cover rounded"
              />
              <span className="text-white">{anime.title}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AnimeSearch;
