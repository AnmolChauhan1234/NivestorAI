import { Card, CardContent, Typography, Box, useTheme } from "@mui/material";
import { keyframes } from "@mui/system";

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.03); }
  100% { transform: scale(1); }
`;

const StockCard = ({ stock, onClick }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        cursor: "pointer",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: theme.shadows[6],
          animation: `${pulse} 1.5s infinite ease-in-out`,
        },
        borderRadius: 3,
        height: "100%",
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(135deg, #2C3E50 0%, #4CA1AF 100%)"
            : "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
      onClick={onClick}
    >
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
            {stock.symbol}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              color:
                stock.change >= 0
                  ? theme.palette.success.main
                  : theme.palette.error.main,
            }}
          >
            {stock.change >= 0 ? "+" : ""}
            {stock.change}%
          </Typography>
        </Box>

        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {stock.name}
        </Typography>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            mb: 1,
            color:
              theme.palette.mode === "dark"
                ? "#fff"
                : theme.palette.primary.dark,
          }}
        >
          ₹{stock.current_price}
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            display: "block",
            fontStyle: "italic",
          }}
        >
          Updated: {new Date(stock.last_updated).toLocaleTimeString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StockCard;
