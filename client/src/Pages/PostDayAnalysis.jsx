import React, { useState, useEffect } from "react";
import { Typography, Paper, CircularProgress, Box } from "@mui/material";
import TradeTable from "../components/TradeTable";
import AnalysisChart from "../components/AnalysisChart";

const PostDayAnalysis = () => {
  const [analysisData, setAnalysisData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalysisData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/analysis/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          alert("Failed to fetch analysis data");
        }

        const data = await response.json();
        setAnalysisData(data.market_analysis);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysisData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 3, textAlign: "center" }}>
        <Typography color="error">Error: {error}</Typography>
      </Paper>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        📉 Post-Day Analysis
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Your trading performance and AI insights
      </Typography>

      {analysisData.length > 0 ? (
        <>
          <Paper sx={{ p: 3, mt: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Daily Summary
            </Typography>
            <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
              <Box>
                <Typography variant="subtitle2">Total Trades</Typography>
                <Typography variant="h4">
                  {analysisData[0].total_trades}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2">P&L</Typography>
                <Typography
                  variant="h4"
                  color={
                    analysisData[0].profit_or_loss >= 0
                      ? "success.main"
                      : "error.main"
                  }
                >
                  {analysisData[0].profit_or_loss >= 0 ? "+" : ""}
                  {analysisData[0].profit_or_loss}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2">Best Trade</Typography>
                <Typography variant="h4" color="success.main">
                  +{analysisData[0].best_trade}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2">Worst Trade</Typography>
                <Typography variant="h4" color="error.main">
                  {analysisData[0].worst_trade}
                </Typography>
              </Box>
            </Box>
          </Paper>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Historical Performance
            </Typography>
            <AnalysisChart data={analysisData} />
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Trade Details
            </Typography>
            <TradeTable data={analysisData} />
          </Paper>
        </>
      ) : (
        <Paper sx={{ p: 3, textAlign: "center" }}>
          <Typography>No analysis data available</Typography>
        </Paper>
      )}
    </Box>
  );
};

export default PostDayAnalysis;
