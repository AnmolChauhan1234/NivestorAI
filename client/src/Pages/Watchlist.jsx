import React, { useState, useEffect } from "react";
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
  Grid2
} from "@mui/material";
import { Add, Delete, Star } from "@mui/icons-material";
import StockCard from "../components/StockCard";

const Watchlist = () => {


  const [watchlist, setWatchlist] = useState([]);
  const [allStocks, setAllStocks] = useState([]);
  const [loading, setLoading] = useState({
    watchlist: true,
    stocks: false,
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch watchlist of the user when we load the page.
  useEffect(() => {
    const fetchData = async () => {
      try {

        const token = sessionStorage.getItem("token");
        const watchlistRes = await fetch(
          `${import.meta.env.VITE_API_URL}/watchlist/`,
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          }
        );
        const watchlistData = await watchlistRes.json();
        setWatchlist(watchlistData.watchlist);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading({ ...prev , watchlist: false});
      }
    };

    fetchData();
  }, []);

  const handleAddToWatchlist = async () => {
    if (!selectedStock) return;

    try {
      setLoading({ ...loading, stocks: true });
      const token = sessionStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/watchlist/add/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ symbol: selectedStock.symbol }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error);
        return;
      }

      // Refresh watchlist
      const watchlistRes = await fetch(
        `${import.meta.env.VITE_API_URL}/watchlist/`,
        {
          headers: {
            "Authorization": `Token ${token}`,
          },
        }
      );
      const watchlistData = await watchlistRes.json();
      setWatchlist(watchlistData.watchlist);

      setSuccess(`${selectedStock.symbol} added to watchlist`);
      setOpenAddDialog(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading({ ...loading, stocks: false });
    }
  };

  //removing stock form watchlist.
  const handleRemoveFromWatchlist = async () => {
    if (!selectedStock) return;

    try {
      setLoading({ ...loading, stocks: true });
      const token = sessionStorage.getItem("token");

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

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Failed to remove from watchlist");
        return;
      }

      //Delete success Refresh watchlist
      const watchlistRes = await fetch(
        `${import.meta.env.VITE_API_URL}/api/watchlist/`,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      const watchlistData = await watchlistRes.json();
      setWatchlist(watchlistData.watchlist);

      setSuccess(`${selectedStock.symbol} removed from watchlist`);
      setOpenRemoveDialog(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading({ ...loading, stocks: false });
    }
  };


  //filtering the stocks
  const filteredStocks = allStocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        ⭐ Your Watchlist
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Track and manage your favorite stocks
      </Typography>

      {/* Error/Success notifications */}
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
      {loading.watchlist ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 3,
              mb: 2,
            }}
          >
            <Typography variant="h6">
              Your Watched Stocks ({watchlist.length})
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setOpenAddDialog(true)}
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
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Add Stocks to Watchlist</DialogTitle>
        <DialogContent sx={{ minWidth: "400px" }}>
          <TextField
            fullWidth
            label="Search stocks"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Box sx={{ maxHeight: "400px", overflowY: "auto" }}>
            {filteredStocks.length === 0 ? (
              <Typography color="text.secondary">No stocks found</Typography>
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
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                  onClick={() => setSelectedStock(stock)}
                >
                  <Box>
                    <Typography fontWeight="bold">{stock.symbol}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stock.name}
                    </Typography>
                  </Box>
                  {selectedStock?.symbol === stock.symbol ? (
                    <Star color="primary" />
                  ) : null}
                </Paper>
              ))
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setOpenAddDialog(false);
            setSelectedStock(null);
          }}>Cancel</Button>
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
