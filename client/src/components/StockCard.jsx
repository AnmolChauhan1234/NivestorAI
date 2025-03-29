export default function StockCard({ stock }) {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg border border-gray-200">
      <h2 className="text-lg font-bold">{stock.symbol}</h2>
      <p className="text-gray-600">Price: ${stock.price}</p>
      <p
        className={`font-medium ${
          stock.change.startsWith("+") ? "text-green-500" : "text-red-500"
        }`}
      >
        Change: {stock.change}
      </p>
    </div>
  );
}
