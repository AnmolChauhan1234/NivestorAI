import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Paper,
} from "@mui/material";

const StockDetail = ({ stock, loading, onBack }) => {
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Button onClick={onBack} sx={{ mb: 2 }}>
        ← Back to all stocks
      </Button>

      <Typography variant="h4" gutterBottom>
        {stock.symbol} - {stock.name}
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 2,
          mt: 2,
        }}
      >
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2">Current Price</Typography>
          <Typography variant="h5">${stock.current_price}</Typography>
        </Paper>

        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2">Last Updated</Typography>
          <Typography variant="body1">
            {new Date(stock.last_updated).toLocaleString()}
          </Typography>
        </Paper>
      </Box>
    </Paper>
  );
};

export default StockDetail;
