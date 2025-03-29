import { useState, useEffect } from "react";

const API_BASE_URL = "http://localhost:8000/api";

export function useStockData() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStocks() {
      try {
        const res = await fetch(`${API_BASE_URL}/stocks/`);
        const data = await res.json();
        setStocks(data.stocks);
      } catch (error) {
        console.error("Error fetching stocks:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStocks();
  }, []);

  return { stocks, loading };
}
