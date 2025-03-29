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
} from "@mui/material";

const MarketTrends = ({ trends, stocks, onStockSelect }) => {
  const [selectedSymbol, setSelectedSymbol] = useState("");

  const handleChange = (event) => {
    setSelectedSymbol(event.target.value);
    onStockSelect(event.target.value);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <Typography>Filter by stock:</Typography>
        <Select
          value={selectedSymbol}
          onChange={handleChange}
          displayEmpty
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="">All Stocks</MenuItem>
          {stocks.map((stock) => (
            <MenuItem key={stock.symbol} value={stock.symbol}>
              {stock.symbol}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Symbol</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Open</TableCell>
              <TableCell>Close</TableCell>
              <TableCell>High</TableCell>
              <TableCell>Low</TableCell>
              <TableCell>Volume</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trends.map((trend, index) => (
              <TableRow key={index}>
                <TableCell>{trend.symbol}</TableCell>
                <TableCell>
                  {new Date(trend.date).toLocaleDateString()}
                </TableCell>
                <TableCell>${trend.open_price}</TableCell>
                <TableCell>${trend.close_price}</TableCell>
                <TableCell>${trend.high_price}</TableCell>
                <TableCell>${trend.low_price}</TableCell>
                <TableCell>{trend.volume.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MarketTrends;
