import { useStockData } from "../hooks/useStockData";
import StockCard from "../components/StockCard";

export default function Dashboard() {
  const { stocks, loading } = useStockData();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">📊 Main Dashboard</h1>
      <p className="text-gray-600">Live stock data and AI insights.</p>

      {loading ? (
        <p>Loading stocks...</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stocks.map((stock, index) => (
            <StockCard key={index} stock={stock} />
          ))}
        </div>
      )}
    </div>
  );
}
