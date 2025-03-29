import { useState, useEffect } from "react";
import StockCard from "../components/StockCard";

const API_BASE_URL = "http://localhost:8000/api";

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWatchlist() {
      try {
        const res = await fetch(`${API_BASE_URL}/watchlist/`);
        const data = await res.json();
        setWatchlist(data.stocks);
      } catch (error) {
        console.error("Error fetching watchlist:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchWatchlist();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">⭐ Your Watchlist</h1>
      <p className="text-gray-600">Saved stocks for quick tracking.</p>

      {loading ? (
        <p>Loading watchlist...</p>
      ) : watchlist.length === 0 ? (
        <p className="text-gray-500 mt-4">No stocks in your watchlist yet.</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {watchlist.map((stock, index) => (
            <StockCard key={index} stock={stock} />
          ))}
        </div>
      )}
    </div>
  );
}
