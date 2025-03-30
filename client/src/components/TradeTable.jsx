export default function TradeTable({ trades }) {
  if (!trades || trades.length === 0) {
    return (
      <div className="bg-white p-4 shadow-md rounded-lg">
        <h2 className="text-xl font-semibold">📜 Trade History</h2>
        <p className="mt-4">No trades to display</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold">📜 Trade History</h2>
      <table className="w-full mt-4">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Stock</th>
            <th className="text-left p-2">Action</th>
            <th className="text-left p-2">Profit/Loss</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade, index) => (
            <tr key={index} className="border-b">
              <td className="p-2">{trade.symbol}</td>
              <td className="p-2">{trade.action}</td>
              <td
                className={`p-2 ${
                  trade.profit.startsWith("+")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {trade.profit}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
