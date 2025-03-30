import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Typography,
  Paper,
  TextField,
  Button,
  Avatar,
  Box,
  CircularProgress,
  Divider,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";

const ChatContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "calc(100vh - 120px)",
  maxWidth: "900px",
  margin: "20px auto",
  backgroundColor: "#F5F7FA",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
}));

const ChatHeader = styled(Paper)({
  padding: "20px",
  backgroundColor: "#3730a3",
  color: "white",
  borderRadius: "0",
  display: "flex",
  alignItems: "center",
  gap: "12px",
});

const MessagesContainer = styled("div")({
  flex: 1,
  padding: "20px",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

const InputContainer = styled("div")({
  padding: "16px 20px",
  backgroundColor: "white",
  borderTop: "1px solid #e5e7eb",
  display: "flex",
  gap: "12px",
});

const UserMessage = styled("div")({
  alignSelf: "flex-end",
  backgroundColor: "#3730a3",
  color: "white",
  padding: "12px 16px",
  borderRadius: "18px 18px 0 18px",
  maxWidth: "70%",
});

const AIMessage = styled("div")({
  alignSelf: "flex-start",
  backgroundColor: "#e5e7eb",
  color: "#111827",
  padding: "12px 16px",
  borderRadius: "18px 18px 18px 0",
  maxWidth: "70%",
});

function AIChatDashboard() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [stockSuggestions, setStockSuggestions] = useState([]);

  useEffect(() => {
    // Fetch initial stock suggestions
    const token = sessionStorage.getItem("token");
    fetch(`${import.meta.env.VITE_API_URL}/market/stocks/`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setStockSuggestions(data.results.slice(0, 5));
        addAIMessage(
          `Here are some stocks you might find interesting: ${data.results
            .slice(0, 5)
            .map((stock) => stock.symbol)
            .join(", ")}`
        );
      });
  }, []);

  const addAIMessage = (text) => {
    setMessages((prev) => [
      ...prev,
      { sender: "ai", text, timestamp: new Date() },
    ]);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage;
    setInputMessage("");
    setIsLoading(true);

    // Add user message to chat
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userMessage, timestamp: new Date() },
    ]);

    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/ai/ai-advice/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ message: userMessage }),
        }
      );

      const data = await response.json();
      addAIMessage(
        data.ai_advice[0]?.advice ||
          "I couldn't process your request. Please try again."
      );
    } catch (error) {
      addAIMessage("Sorry, I'm having trouble connecting to the server.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <ChatContainer>
      <ChatHeader elevation={0}>
        <SmartToyIcon fontSize="large" />
        <Typography variant="h5" fontWeight="bold">
          Investment AI Assistant
        </Typography>
      </ChatHeader>

      <MessagesContainer>
        <AIMessage>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <Avatar sx={{ bgcolor: "#4f46e5", width: 24, height: 24 }}>
              <SmartToyIcon fontSize="small" />
            </Avatar>
            <Typography variant="subtitle2">AI Assistant</Typography>
          </Box>
          Welcome to your investment assistant! How can I help you today?
          <Divider sx={{ my: 1 }} />
          <Typography variant="body2" color="text.secondary">
            Try asking about:
            <ul style={{ paddingLeft: "20px", marginTop: "8px" }}>
              <li>"What stocks should I consider today?"</li>
              <li>"Explain market trends"</li>
              <li>"Analyze AAPL stock"</li>
            </ul>
          </Typography>
        </AIMessage>

        {stockSuggestions.length > 0 && (
          <AIMessage>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <Avatar sx={{ bgcolor: "#4f46e5", width: 24, height: 24 }}>
                <SmartToyIcon fontSize="small" />
              </Avatar>
              <Typography variant="subtitle2">AI Assistant</Typography>
            </Box>
            <Typography variant="body1" mb={1}>
              Here are some trending stocks:
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {stockSuggestions.map((stock) => (
                <Button
                  key={stock.symbol}
                  variant="outlined"
                  size="small"
                  onClick={() =>
                    setInputMessage(`Tell me about ${stock.symbol}`)
                  }
                  sx={{
                    textTransform: "none",
                    borderColor: "#c7d2fe",
                    color: "#3730a3",
                    "&:hover": {
                      backgroundColor: "#eef2ff",
                      borderColor: "#a5b4fc",
                    },
                  }}
                >
                  {stock.symbol}
                </Button>
              ))}
            </Box>
          </AIMessage>
        )}

        {messages.map((message, index) =>
          message.sender === "user" ? (
            <UserMessage key={index}>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Avatar sx={{ bgcolor: "#c7d2fe", width: 24, height: 24 }}>
                  <PersonIcon fontSize="small" />
                </Avatar>
                <Typography variant="subtitle2" color="inherit">
                  You
                </Typography>
              </Box>
              {message.text}
            </UserMessage>
          ) : (
            <AIMessage key={index}>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Avatar sx={{ bgcolor: "#4f46e5", width: 24, height: 24 }}>
                  <SmartToyIcon fontSize="small" />
                </Avatar>
                <Typography variant="subtitle2">AI Assistant</Typography>
              </Box>
              {message.text}
            </AIMessage>
          )
        )}

        {isLoading && (
          <AIMessage>
            <Box display="flex" alignItems="center" gap={2}>
              <CircularProgress size={20} />
              <Typography>Thinking...</Typography>
            </Box>
          </AIMessage>
        )}
      </MessagesContainer>

      <InputContainer>
        <TextField
          fullWidth
          multiline
          maxRows={4}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about stocks, trends, or investments..."
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": { borderColor: "#a5b4fc" },
              "&.Mui-focused fieldset": { borderColor: "#4f46e5" },
              borderRadius: "24px",
              paddingRight: "60px",
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
          disabled={!inputMessage.trim() || isLoading}
          sx={{
            minWidth: "48px",
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            backgroundColor: "#4f46e5",
            "&:hover": { backgroundColor: "#4338ca" },
            position: "absolute",
            right: "32px",
            bottom: "24px",
          }}
        >
          <SendIcon />
        </Button>
      </InputContainer>
    </ChatContainer>
  );
}

export default AIChatDashboard;
