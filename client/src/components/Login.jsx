import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const FormContainer = styled("form")(({ theme }) => ({
  border: "1px solid #E0E0E0",
  width: "80vw",
  maxWidth: "400px",
  padding: "20px",
  margin: "20px auto",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  backgroundColor: "white",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
}));

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await fetch("http://localhost:8000/auth/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    setIsLoading(false);
    if (data.key) {
      localStorage.setItem("token", data.key);
      navigate("/profile");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-background">
      <FormContainer onSubmit={handleSubmit}>
        <Typography variant="h5" align="center" color="text">
          Login
        </Typography>

        <TextField
          label="Email Id"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="email here ..."
          variant="outlined"
          fullWidth
          required
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": { borderColor: "#FFB300" },
              "&.Mui-focused fieldset": { borderColor: "#FFB300" },
            },
          }}
        />

        <TextField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="password ..."
          variant="outlined"
          fullWidth
          required
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": { borderColor: "#FFB300" },
              "&.Mui-focused fieldset": { borderColor: "#FFB300" },
            },
          }}
        />

        <Typography
          variant="body2"
          align="right"
          sx={{
            color: "#3730a3",
            cursor: "pointer",
            "&:hover": { color: "#c7d2fe" },
          }}
        >
          Forget Password?
        </Typography>

        <Button
          type="submit"
          variant="contained"
          disabled={isLoading}
          sx={{
            backgroundColor: isLoading ? "#FFB300" : "#3730a3",
            "&:hover": { backgroundColor: "#c7d2fe", color: "#3730a3" },
            width: "80%",
            margin: "0 auto",
          }}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>

        <Typography
          variant="body2"
          align="center"
          sx={{
            color: "#3730a3",
            cursor: "pointer",
            "&:hover": { color: "#c7d2fe" },
          }}
          onClick={() => navigate("/signup")}
        >
          Don’t have an account? Sign Up
        </Typography>
      </FormContainer>
    </div>
  );
}

export default Login;
