import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { useEffect, useRef } from "react";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function AnalysisChart() {
  const chartRef = useRef(null);

  // Sample data for 30 days
  const labels = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);
  const sampleData = Array.from(
    { length: 30 },
    () => Math.floor(Math.random() * 2000) - 1000
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Daily P&L ($)",
        data: sampleData,
        borderColor: "rgb(79, 70, 229)",
        backgroundColor: "rgba(79, 70, 229, 0.2)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: (context) => {
          const value = context.dataset.data[context.dataIndex];
          return value >= 0 ? "rgb(16, 185, 129)" : "rgb(239, 68, 68)";
        },
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
            family: "Inter, sans-serif",
          },
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleFont: {
          size: 16,
          weight: "bold",
        },
        bodyFont: {
          size: 14,
        },
        callbacks: {
          label: (context) => {
            const value = context.raw;
            return `${value >= 0 ? "Profit" : "Loss"}: $${Math.abs(
              value
            ).toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      y: {
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          callback: (value) => `$${value}`,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    animation: {
      y: {
        duration: 2000,
        from: 500,
      },
    },
    maintainAspectRatio: false,
  };

  // Animation effect
  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      chart.data.datasets.forEach((dataset) => {
        dataset.data = sampleData;
      });
      chart.update();
    }
  }, []);

  return (
    <div className="bg-white p-6 shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        📊 AI Insights & Performance
      </h2>
      <p className="text-gray-500 mb-6">
        30-day trading performance analysis with AI-powered insights
      </p>

      <div className="relative h-80 w-full">
        <Line ref={chartRef} data={data} options={options} />
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-indigo-50 p-4 rounded-lg">
          <h3 className="font-semibold text-indigo-800">Best Day</h3>
          <p className="text-2xl font-bold text-green-600">
            +${Math.max(...sampleData).toLocaleString()}
          </p>
        </div>
        <div className="bg-indigo-50 p-4 rounded-lg">
          <h3 className="font-semibold text-indigo-800">Worst Day</h3>
          <p className="text-2xl font-bold text-red-600">
            -${Math.abs(Math.min(...sampleData)).toLocaleString()}
          </p>
        </div>
        <div className="bg-indigo-50 p-4 rounded-lg">
          <h3 className="font-semibold text-indigo-800">Net Profit</h3>
          <p
            className={`text-2xl font-bold ${
              sampleData.reduce((a, b) => a + b, 0) >= 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {sampleData.reduce((a, b) => a + b, 0) >= 0 ? "+" : "-"}$
            {Math.abs(sampleData.reduce((a, b) => a + b, 0)).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
