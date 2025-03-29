import { Card, CardContent, Typography, Button } from "@mui/material";

const StockCard = ({ stock, onClick }) => {
  return (
    <Card
      sx={{ cursor: "pointer", "&:hover": { boxShadow: 3 } }}
      onClick={onClick}
    >
      <CardContent>
        <Typography variant="h6" component="div">
          {stock.symbol}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {stock.name}
        </Typography>
        <Typography variant="h5">${stock.current_price}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Last updated: {new Date(stock.last_updated).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StockCard;
