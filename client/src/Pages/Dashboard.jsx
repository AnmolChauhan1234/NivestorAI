import React, { useState, useEffect } from "react";
import {
  Typography,
  Paper,
  Button,
  CircularProgress,
  Box,
  Tabs,
  Tab,
  Grow,
  Zoom,
  Fade,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { keyframes } from "@mui/system";
import StockCard from "../components/StockCard";
import StockDetail from "../components/StockDetails";
import MarketTrends from "../components/MarketTrends";

// Animation for price changes
const pulse = (color) => keyframes`
  0% { background-color: inherit; }
  50% { background-color: ${color}; }
  100% { background-color: inherit; }
`;

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [activeTab, setActiveTab] = useState(0);
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [marketTrends, setMarketTrends] = useState([]);
  const [loading, setLoading] = useState({
    stocks: true,
    trends: true,
    detail: false,
  });
  const [priceUpdates, setPriceUpdates] = useState({});

  // Fetch all stocks only once when component mounts
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/market/stocks/`
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
  }, []); // Empty dependency array means this runs only once on mount

  // Fetch market trends when tab changes
  useEffect(() => {
    if (activeTab === 1 && marketTrends.length === 0) {
      const fetchMarketTrends = async () => {
        setLoading((prev) => ({ ...prev, trends: true }));
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/market/market-trends/`
          );
          const data = await response.json();
          setMarketTrends(data.results);
        } catch (error) {
          console.error("Error fetching market trends:", error);
        } finally {
          setLoading((prev) => ({ ...prev, trends: false }));
        }
      };

      fetchMarketTrends();
    }
  }, [activeTab]);

  const fetchStockDetail = async (symbol) => {
    setLoading((prev) => ({ ...prev, detail: true }));
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/market/stocks/${symbol}/`
      );
      const data = await response.json();
      setSelectedStock(data);
    } catch (error) {
      console.error("Error fetching stock detail:", error);
    } finally {
      setLoading((prev) => ({ ...prev, detail: false }));
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setSelectedStock(null);
  };

  return (
    <Fade in timeout={500}>
      <Paper
        sx={{
          p: isMobile ? 2 : 3,
          borderRadius: 4,
          boxShadow: theme.shadows[10],
          background: theme.palette.background.paper,
          minHeight: "80vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            📊 Live Market Dashboard
          </Typography>

          <Typography variant="caption" color="text.secondary">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Typography>
        </Box>

        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            mb: 3,
            "& .MuiTabs-indicator": {
              height: 4,
              borderRadius: 2,
              backgroundColor: theme.palette.secondary.main,
            },
          }}
          variant={isMobile ? "scrollable" : "standard"}
        >
          <Tab label="Stocks" sx={{ fontSize: isMobile ? "0.8rem" : "1rem" }} />
          <Tab
            label="Market Trends"
            sx={{ fontSize: isMobile ? "0.8rem" : "1rem" }}
          />
          {selectedStock && (
            <Tab
              label="Stock Details"
              sx={{ fontSize: isMobile ? "0.8rem" : "1rem" }}
            />
          )}
        </Tabs>

        {activeTab === 0 && (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Available Stocks
            </Typography>

            {loading.stocks ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress size={60} thickness={4} />
              </Box>
            ) : (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: isMobile
                    ? "1fr"
                    : "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: 3,
                  mt: 2,
                }}
              >
                {stocks.map((stock, index) => (
                  <Grow in timeout={500 + index * 100} key={stock.symbol}>
                    <Box>
                      <StockCard
                        stock={stock}
                        onClick={() => {
                          fetchStockDetail(stock.symbol);
                          setActiveTab(2);
                        }}
                      />
                    </Box>
                  </Grow>
                ))}
              </Box>
            )}
          </Box>
        )}

        {activeTab === 1 && (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Market Trends
            </Typography>

            {loading.trends ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress size={60} thickness={4} />
              </Box>
            ) : (
              <Zoom in timeout={500}>
                <Box>
                  <MarketTrends
                    trends={marketTrends}
                    stocks={stocks}
                    onStockSelect={(symbol) => {
                      fetchStockDetail(symbol);
                      setActiveTab(2);
                    }}
                  />
                </Box>
              </Zoom>
            )}
          </Box>
        )}

        {activeTab === 2 && selectedStock && (
          <StockDetail
            stock={selectedStock}
            loading={loading.detail}
            onBack={() => setActiveTab(0)}
          />
        )}
      </Paper>
    </Fade>
  );
};

export default Dashboard;