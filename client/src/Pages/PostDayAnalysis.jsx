import TradeTable from "../components/TradeTable";
import AnalysisChart from "../components/AnalysisChart";
import { useTradeData } from "../hooks/useTradeData";

export default function PostDayAnalysis() {
  const { trades } = useTradeData();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">📉 Post-Day Analysis</h1>
      <p className="text-gray-600">Your trading performance and AI insights.</p>

      <div className="mt-6">
        <TradeTable trades={trades} />
      </div>

      <div className="mt-6">
        <AnalysisChart />
      </div>
    </div>
  );
}
