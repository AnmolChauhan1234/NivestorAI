import React, { useState, useEffect, useMemo } from "react";
import {
  Typography,
  Paper,
  Box,
  CircularProgress,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  useTheme,
  Grid2
} from "@mui/material";
import { Add, Delete, Star } from "@mui/icons-material";
import StockCard from "../components/StockCard";

const Watchlist = () => {
  const theme = useTheme(); // Get the theme object
  const [watchlist, setWatchlist] = useState([]);
  const [allStocks, setAllStocks] = useState([]);
  const [loading, setLoading] = useState({
    watchlist: true,
    stocks: false,
    initialLoad: true
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch watchlist and all available stocks on initial load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        
        // Fetch watchlist
        const watchlistRes = await fetch(
          `${import.meta.env.VITE_API_URL}/watchlist/`,
          {
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          }
        );
        const watchlistData = await watchlistRes.json();
        setWatchlist(watchlistData.watchlist || []);

        // Fetch all stocks
        const stocksRes = await fetch(
          `${import.meta.env.VITE_API_URL}/market/stocks/`
        );
        const stocksData = await stocksRes.json();
        setAllStocks(stocksData.results || []);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(prev => ({...prev, watchlist: false, initialLoad: false}));
      }
    };

    fetchData();
  }, []);

  // Memoized filtered stocks for better performance
  const filteredStocks = useMemo(() => {
    if (!searchTerm) return allStocks;
    const term = searchTerm.toLowerCase();
    return allStocks.filter(stock => 
      stock.symbol.toLowerCase().includes(term) || 
      stock.name.toLowerCase().includes(term))
  }, [allStocks, searchTerm]);

  const sendNotification = async (message, type="info") => {
    try {
      const token = sessionStorage.getItem("token");
      await fetch(
        `${import.meta.env.VITE_API_URL}/notifications/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({
            message,
            type
          }),
        }
      );
    } catch (err) {
      console.error("Failed to send notification:", err);
    }
  };

  const handleAddToWatchlist = async () => {
    if (!selectedStock) return;

    try {
      setLoading({ ...loading, stocks: true });
      const token = sessionStorage.getItem("token");

      // Add to watchlist
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/watchlist/add/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ symbol: selectedStock.symbol }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to add to watchlist");
      }

      // Send notification
      await sendNotification(
        `Added ${selectedStock.symbol} to your watchlist`,
        "success"
      );

      // Refresh watchlist
      const watchlistRes = await fetch(
        `${import.meta.env.VITE_API_URL}/watchlist/`,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      const watchlistData = await watchlistRes.json();
      setWatchlist(watchlistData.watchlist || []);

      setSuccess(`${selectedStock.symbol} added to watchlist`);
      setOpenAddDialog(false);
      setSelectedStock(null);
      setSearchTerm("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading({ ...loading, stocks: false });
    }
  };

  const handleRemoveFromWatchlist = async () => {
    if (!selectedStock) return;

    try {
      setLoading({ ...loading, stocks: true });
      const token = sessionStorage.getItem("token");

      // Remove from watchlist
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/watchlist/remove/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ symbol: selectedStock.symbol }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to remove from watchlist");
      }

      // Send notification
      await sendNotification(
        `Removed ${selectedStock.symbol} from your watchlist`,
        "warning"
      );

      // Refresh watchlist
      const watchlistRes = await fetch(
        `${import.meta.env.VITE_API_URL}/watchlist/`,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      const watchlistData = await watchlistRes.json();
      setWatchlist(watchlistData.watchlist || []);

      setSuccess(`${selectedStock.symbol} removed from watchlist`);
      setOpenRemoveDialog(false);
      setSelectedStock(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading({ ...loading, stocks: false });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        ⭐ Your Watchlist
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Track and manage your favorite stocks
      </Typography>

      {/* Notifications */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!success}
        autoHideDuration={3000}
        onClose={() => setSuccess(null)}
      >
        <Alert severity="success" onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      </Snackbar>

      {/* Watchlist content */}
      {loading.initialLoad ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3, mb: 2 }}>
            <Typography variant="h6">
              Your Watched Stocks ({watchlist.length})
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setOpenAddDialog(true)}
              disabled={loading.watchlist}
            >
              Add Stocks
            </Button>
          </Box>

          {watchlist.length === 0 ? (
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography color="text.secondary">
                Your watchlist is empty. Add stocks to track them.
              </Typography>
            </Paper>
          ) : (
            <Grid2 container spacing={3}>
              {watchlist.map((item) => (
                <Grid2 item xs={12} sm={6} md={4} key={item.symbol}>
                  <StockCard
                    stock={item}
                    actions={
                      <IconButton
                        color="error"
                        onClick={() => {
                          setSelectedStock(item);
                          setOpenRemoveDialog(true);
                        }}
                        disabled={loading.stocks}
                      >
                        <Delete />
                      </IconButton>
                    }
                  />
                </Grid2>
              ))}
            </Grid2>
          )}
        </>
      )}

      {/* Add to Watchlist Dialog */}
      <Dialog 
        open={openAddDialog} 
        onClose={() => {
          setOpenAddDialog(false);
          setSearchTerm("");
          setSelectedStock(null);
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add Stocks to Watchlist</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Search stocks"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 2 }}
            autoFocus
          />
          
          <Box sx={{ 
            maxHeight: "400px", 
            overflowY: "auto",
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
            p: 1
          }}>
            {filteredStocks.length === 0 ? (
              <Typography color="text.secondary" textAlign="center" py={2}>
                {loading.initialLoad ? "Loading stocks..." : "No matching stocks found"}
              </Typography>
            ) : (
              filteredStocks.map((stock) => (
                <Paper
                  key={stock.symbol}
                  sx={{
                    p: 2,
                    mb: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    backgroundColor: selectedStock?.symbol === stock.symbol 
                      ? theme.palette.action.selected 
                      : "inherit",
                    "&:hover": { 
                      backgroundColor: theme.palette.action.hover 
                    },
                  }}
                  onClick={() => setSelectedStock(stock)}
                >
                  <Box>
                    <Typography fontWeight="bold">{stock.symbol}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stock.name}
                    </Typography>
                  </Box>
                  {selectedStock?.symbol === stock.symbol && (
                    <Star color="primary" />
                  )}
                </Paper>
              ))
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => {
              setOpenAddDialog(false);
              setSearchTerm("");
              setSelectedStock(null);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddToWatchlist}
            disabled={!selectedStock || loading.stocks}
            variant="contained"
            startIcon={<Add />}
          >
            {loading.stocks ? (
              <CircularProgress size={24} />
            ) : (
              "Add to Watchlist"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Remove from Watchlist Dialog */}
      <Dialog
        open={openRemoveDialog}
        onClose={() => setOpenRemoveDialog(false)}
      >
        <DialogTitle>Remove from Watchlist</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to remove {selectedStock?.symbol} from your
            watchlist?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRemoveDialog(false)}>Cancel</Button>
          <Button
            onClick={handleRemoveFromWatchlist}
            disabled={loading.stocks}
            color="error"
            variant="contained"
            startIcon={<Delete />}
          >
            {loading.stocks ? <CircularProgress size={24} /> : "Remove"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Watchlist;