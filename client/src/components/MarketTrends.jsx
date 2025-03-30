import React, { useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  Skeleton,
  Fade,
  Zoom,
  Slide,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  ArrowUpward,
  ArrowDownward,
  Equalizer,
  FilterAlt,
  Refresh,
  Info,
} from "@mui/icons-material";
import { keyframes } from "@mui/system";

// Animation for price changes
const pulse = (color) => keyframes`
  0% { background-color: inherit; }
  50% { background-color: ${color}; }
  100% { background-color: inherit; }
`;

const MarketTrends = ({ trends, stocks, onStockSelect, loading }) => {
  const theme = useTheme();
  const [selectedSymbol, setSelectedSymbol] = useState("");
  const [hoveredRow, setHoveredRow] = useState(null);

  const handleChange = (event) => {
    setSelectedSymbol(event.target.value);
    if (event.target.value) {
      onStockSelect(event.target.value);
    }
  };

  const filteredTrends = selectedSymbol
    ? trends.filter((trend) => trend.symbol === selectedSymbol)
    : trends;

  const getChangePercentage = (open, close) => {
    return (((close - open) / open) * 100).toFixed(2);
  };

  const handleRefresh = () => {
    onStockSelect(selectedSymbol || null); // Pass null to refresh all
  };

  return (
    <Fade in timeout={500}>
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Equalizer fontSize="large" color="primary" />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Market Trends Analysis
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Tooltip title="Filter by stock symbol">
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <FilterAlt color="action" />
                <Select
                  value={selectedSymbol}
                  onChange={handleChange}
                  displayEmpty
                  sx={{
                    minWidth: 150,
                    borderRadius: 2,
                    backgroundColor: theme.palette.background.paper,
                  }}
                  size="small"
                >
                  <MenuItem value="">
                    <Typography variant="body2">All Stocks</Typography>
                  </MenuItem>
                  {stocks.map((stock) => (
                    <MenuItem key={stock.symbol} value={stock.symbol}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Typography variant="body2">{stock.symbol}</Typography>
                        <Chip
                          label={stock.name}
                          size="small"
                          sx={{ height: 20, fontSize: "0.6rem" }}
                        />
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Tooltip>

            <Tooltip title="Refresh data">
              <IconButton
                onClick={handleRefresh}
                sx={{
                  backgroundColor: theme.palette.action.hover,
                  "&:hover": {
                    backgroundColor: theme.palette.action.selected,
                  },
                }}
              >
                <Refresh fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {[...Array(5)].map((_, index) => (
              <Slide direction="up" in timeout={100 * index} key={index}>
                <Skeleton
                  variant="rectangular"
                  height={60}
                  sx={{
                    borderRadius: 2,
                    mb: 1,
                  }}
                />
              </Slide>
            ))}
          </Box>
        ) : (
          <Zoom in timeout={500}>
            <TableContainer
              component={Paper}
              sx={{
                borderRadius: 3,
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: theme.shadows[3],
                overflow: "hidden",
              }}
            >
              <Table sx={{ minWidth: 650 }}>
                <TableHead
                  sx={{
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? theme.palette.grey[800]
                        : theme.palette.grey[100],
                  }}
                >
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Symbol</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Open</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Close</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Change</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>High</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Low</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Volume</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredTrends.length > 0 ? (
                    filteredTrends.map((trend, index) => {
                      const change = getChangePercentage(
                        trend.open_price,
                        trend.close_price
                      );
                      const isPositive = parseFloat(change) >= 0;

                      return (
                        <TableRow
                          key={index}
                          hover
                          onMouseEnter={() => setHoveredRow(index)}
                          onMouseLeave={() => setHoveredRow(null)}
                          sx={{
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            "&:hover": {
                              backgroundColor: theme.palette.action.hover,
                            },
                            animation:
                              hoveredRow === index
                                ? `${pulse(
                                    theme.palette.action.selected
                                  )} 2s infinite`
                                : "none",
                          }}
                          onClick={() => onStockSelect(trend.symbol)}
                        >
                          <TableCell>
                            <Typography fontWeight={500}>
                              {trend.symbol}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            {new Date(trend.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </TableCell>
                          <TableCell>${trend.open_price.toFixed(2)}</TableCell>
                          <TableCell>${trend.close_price.toFixed(2)}</TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                color: isPositive
                                  ? theme.palette.success.main
                                  : theme.palette.error.main,
                              }}
                            >
                              {isPositive ? (
                                <ArrowUpward
                                  fontSize="small"
                                  sx={{ mr: 0.5 }}
                                />
                              ) : (
                                <ArrowDownward
                                  fontSize="small"
                                  sx={{ mr: 0.5 }}
                                />
                              )}
                              {Math.abs(change)}%
                            </Box>
                          </TableCell>
                          <TableCell>${trend.high_price.toFixed(2)}</TableCell>
                          <TableCell>${trend.low_price.toFixed(2)}</TableCell>
                          <TableCell>
                            <Tooltip
                              title={`${trend.volume.toLocaleString()} shares`}
                            >
                              <Chip
                                label={
                                  trend.volume >= 1000000
                                    ? `${(trend.volume / 1000000).toFixed(1)}M`
                                    : trend.volume >= 1000
                                    ? `${(trend.volume / 1000).toFixed(1)}K`
                                    : trend.volume
                                }
                                size="small"
                                sx={{
                                  backgroundColor: theme.palette.grey[200],
                                  fontSize: "0.75rem",
                                }}
                              />
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        sx={{ textAlign: "center", py: 4 }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Info color="action" sx={{ fontSize: 40, mb: 1 }} />
                          <Typography variant="body1" color="text.secondary">
                            No market trends data available
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {selectedSymbol ? `for ${selectedSymbol}` : ""}
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Zoom>
        )}
      </Box>
    </Fade>
  );
};

export default MarketTrends;
