import { useState, useEffect } from "react";

const API_BASE_URL = "http://localhost:8000/api";

export function useTradeData() {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    async function fetchTrades() {
      try {
        const res = await fetch(`${API_BASE_URL}/trades/history/`);
        const data = await res.json();
        setTrades(data.trades);
      } catch (error) {
        console.error("Error fetching trades:", error);
      }
    }

    fetchTrades();
  }, []);

  return { trades };
}
