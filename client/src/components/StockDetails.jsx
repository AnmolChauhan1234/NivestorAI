import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Paper,
  useTheme,
  Divider,
  Chip,
} from "@mui/material";
import { keyframes } from "@mui/system";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const StockDetail = ({ stock, loading, onBack }) => {
  const theme = useTheme();

  // Generate dummy data based on stock values
  const dummyData = {
    name:
      stock.symbol === "AAPL"
        ? "Apple Inc."
        : stock.symbol === "MSFT"
        ? "Microsoft Corporation"
        : stock.symbol === "GOOGL"
        ? "Alphabet Inc."
        : `${stock.symbol} Company`,
    sector: ["Technology", "Finance", "Healthcare", "Energy"][
      Math.floor(Math.random() * 4)
    ],
    industry: ["Software", "Banking", "Pharmaceuticals", "Oil & Gas"][
      Math.floor(Math.random() * 4)
    ],
    description: `Leading provider of ${
      [
        "technology solutions",
        "financial services",
        "healthcare products",
        "energy resources",
      ][Math.floor(Math.random() * 4)]
    } worldwide.`,
    employees: Math.round(stock.market_cap / 1000000) * 10, // Rough estimate
    dividend_yield: stock.pe_ratio ? (stock.pe_ratio / 100).toFixed(2) : "1.25", // Derived from PE
    beta: (1 + Math.random()).toFixed(2), // Random beta between 1.0-2.0
    avg_volume: Math.round(stock.market_cap / 100000), // Derived from market cap
    website: `www.${stock.symbol.toLowerCase()}.com`,
    ceo: ["John Smith", "Sarah Johnson", "Michael Brown", "Lisa Chen"][
      Math.floor(Math.random() * 4)
    ],
    founded: 1950 + Math.floor(Math.random() * 70), // Random year between 1950-2020
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "300px",
        }}
      >
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  return (
    <Box sx={{ animation: `${fadeIn} 0.5s ease-out` }}>
      <Button
        onClick={onBack}
        sx={{
          mb: 2,
          color: theme.palette.text.primary,
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        }}
        startIcon={<span style={{ fontSize: "1.5rem" }}>←</span>}
      >
        Back to all stocks
      </Button>

      <Paper
        sx={{
          p: 3,
          borderRadius: 4,
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)"
              : "linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%)",
          boxShadow: theme.shadows[4],
        }}
      >
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 800 }}>
          {stock.symbol} - {dummyData.name}
        </Typography>

        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {dummyData.sector} • {dummyData.industry}
        </Typography>

        <Typography paragraph sx={{ mb: 3 }}>
          {dummyData.description} Founded in {dummyData.founded}. Current CEO:{" "}
          {dummyData.ceo}.
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: 2,
            mt: 3,
          }}
        >
          <Paper
            sx={{
              p: 2,
              borderRadius: 3,
              background: theme.palette.background.default,
            }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              Current Price
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              ₹{stock.current_price?.toLocaleString() || "1,500.00"}
            </Typography>
          </Paper>

          <Paper
            sx={{
              p: 2,
              borderRadius: 3,
              background: theme.palette.background.default,
            }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              Today's Change
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color:
                  stock.change >= 0
                    ? theme.palette.success.main
                    : theme.palette.error.main,
              }}
            >
              {stock.change >= 0 ? "+" : ""}
              {stock.change || "1.25"}%
            </Typography>
          </Paper>

          <Paper
            sx={{
              p: 2,
              borderRadius: 3,
              background: theme.palette.background.default,
            }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              Market Cap
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              ₹
              {(stock.market_cap
                ? stock.market_cap / 10000000
                : 125
              ).toLocaleString()}{" "}
              Cr
            </Typography>
          </Paper>

          <Paper
            sx={{
              p: 2,
              borderRadius: 3,
              background: theme.palette.background.default,
            }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              Avg Volume
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {dummyData.avg_volume.toLocaleString()}
            </Typography>
          </Paper>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Performance Metrics
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
            <Chip
              label={`52W High: ₹${stock.high_52w || "1,850.00"}`}
              color="success"
              variant="outlined"
            />
            <Chip
              label={`52W Low: ₹${stock.low_52w || "1,200.00"}`}
              color="error"
              variant="outlined"
            />
            <Chip
              label={`PE Ratio: ${stock.pe_ratio || "25.80"}`}
              color="info"
              variant="outlined"
            />
            <Chip
              label={`Dividend Yield: ${dummyData.dividend_yield}%`}
              color="warning"
              variant="outlined"
            />
            <Chip
              label={`Beta: ${dummyData.beta}`}
              color="secondary"
              variant="outlined"
            />
          </Box>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
            Company Information
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            <Chip label={`Sector: ${dummyData.sector}`} variant="outlined" />
            <Chip
              label={`Employees: ${dummyData.employees.toLocaleString()}`}
              variant="outlined"
            />
            <Chip
              label={`Website: ${dummyData.website}`}
              component="a"
              href={`https://${dummyData.website}`}
              target="_blank"
              clickable
              variant="outlined"
            />
            <Chip label={`Founded: ${dummyData.founded}`} variant="outlined" />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default StockDetail;
