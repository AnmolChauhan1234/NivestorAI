import React, { useState, useEffect } from "react";
import {
  Typography,
  Paper,
  Button,
  CircularProgress,
  Box,
  Tabs,
  Tab,
} from "@mui/material";

import React, { useState, useEffect } from "react";
import {
  Typography,
  Paper,
  Button,
  CircularProgress,
  Box,
  Tabs,
  Tab,
} from "@mui/material";

import StockCard from "../components/StockCard";
import StockDetail from "../components/StockDetails";
import MarketTrends from "../components/MarketTrends";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [marketTrends, setMarketTrends] = useState([]);
  const [loading, setLoading] = useState({
    stocks: true,
    trends: true,
    detail: false,
  });

  // Fetch all stocks on initial load
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/stocks/`
        );
        const data = await response.json();
        setStocks(data.results);
      } catch (error) {
        console.error("Error fetching stocks:", error);
      } finally {
        setLoading((prev) => ({ ...prev, stocks: false }));
      }
    };

    fetchStocks();
  }, []);

  // Fetch market trends when tab changes to trends
  useEffect(() => {
    if (activeTab === 1 && marketTrends.length === 0) {
      fetchMarketTrends();
    }
  }, [activeTab]);

  const fetchStockDetail = async (symbol) => {
    setLoading((prev) => ({ ...prev, detail: true }));
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/stocks/${symbol}/`
      );
      const data = await response.json();
      setSelectedStock(data);
    } catch (error) {
      console.error("Error fetching stock detail:", error);
    } finally {
      setLoading((prev) => ({ ...prev, detail: false }));
    }
  };

  const fetchMarketTrends = async (symbol = null) => {
    setLoading((prev) => ({ ...prev, trends: true }));
    try {
      const url = symbol
        ? `${import.meta.env.VITE_API_URL}/market-trends/?symbol=${symbol}`
        : `${import.meta.env.VITE_API_URL}/market-trends/`;

      const response = await fetch(url);
      const data = await response.json();
      setMarketTrends(data.results);
    } catch (error) {
      console.error("Error fetching market trends:", error);
    } finally {
      setLoading((prev) => ({ ...prev, trends: false }));
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setSelectedStock(null); // Reset selected stock when changing tabs
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>
        📊 Stock Market Dashboard
      </Typography>

      <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Stocks" />
        <Tab label="Market Trends" />
        {selectedStock && <Tab label="Stock Details" />}
      </Tabs>

      {activeTab === 0 && (
        <div>
          <Typography variant="h6" gutterBottom>
            Available Stocks
          </Typography>

          {loading.stocks ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "16px",
              }}
            >
              {stocks.map((stock) => (
                <StockCard
                  key={stock.symbol}
                  stock={stock}
                  onClick={() => {
                    setSelectedStock(null);
                    fetchStockDetail(stock.symbol);
                    setActiveTab(2);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 1 && (
        <div>
          <Typography variant="h6" gutterBottom>
            Market Trends
          </Typography>

          {loading.trends ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <MarketTrends
              trends={marketTrends}
              stocks={stocks}
              onStockSelect={(symbol) => {
                fetchMarketTrends(symbol);
              }}
            />
          )}
        </div>
      )}

      {activeTab === 2 && selectedStock && (
        <StockDetail
          stock={selectedStock}
          loading={loading.detail}
          onBack={() => setActiveTab(0)}
        />
      )}
    </Paper>
  );
};

export default Dashboard;
