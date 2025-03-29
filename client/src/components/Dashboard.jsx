import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Typography, Paper, TextField, Button } from "@mui/material";

const DashboardContainer = styled("div")(({ theme }) => ({
  padding: "20px",
  width: "100%",
  maxWidth: "800px",
  margin: "20px auto",
  minHeight: "calc(100vh - 80px)",
  backgroundColor: "#F5F7FA",
}));

const SuggestionsCard = styled(Paper)({
  padding: "20px",
  marginBottom: "20px",
  backgroundColor: "white",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
});

const ChatCard = styled(Paper)({
  padding: "20px",
  backgroundColor: "white",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
});

function Dashboard() {
  const [suggestions, setSuggestions] = useState([]);
  const [message, setMessage] = useState("");
  const [chatResponse, setChatResponse] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8000/api/suggestions/", {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setSuggestions(data.suggestions));
  }, []);

  const handleChat = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8000/api/chat/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    setChatResponse(data.response);
    setMessage("");
  };

  return (
    <DashboardContainer>
      <Typography variant="h4" color="text" gutterBottom>
        Welcome to Your Dashboard
      </Typography>

      <SuggestionsCard>
        <Typography variant="h6" color="text">
          Your Investment Suggestions
        </Typography>
        <ul className="list-disc pl-5 mt-2">
          {suggestions.map((item, index) => (
            <li key={index} className="text-text">
              {item}
            </li>
          ))}
        </ul>
      </SuggestionsCard>

      <ChatCard>
        <Typography variant="h6" color="text" gutterBottom>
          Ask a Question
        </Typography>
        <TextField
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your question ..."
          variant="outlined"
          sx={{
            marginBottom: "16px",
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": { borderColor: "#FFB300" },
              "&.Mui-focused fieldset": { borderColor: "#FFB300" },
            },
          }}
        />
        <Button
          variant="contained"
          onClick={handleChat}
          sx={{
            backgroundColor: "#3730a3",
            "&:hover": { backgroundColor: "#c7d2fe", color: "#3730a3" },
          }}
        >
          Send
        </Button>
        {chatResponse && (
          <Typography variant="body1" color="text" sx={{ marginTop: "16px" }}>
            {chatResponse}
          </Typography>
        )}
      </ChatCard>
    </DashboardContainer>
  );
}

export default Dashboard;
