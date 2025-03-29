import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { TextField, Button, Typography, Alert } from "@mui/material";
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

function Signup() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8000/api/auth/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: formData.full_name,
          email: formData.email,
          phone_number: formData.phone_number,
          password: formData.password,
          
        }),
        credentials: "include", // Important for cookies
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.email?.[0] ||
            data.password?.[0] ||
            "Registration failed"
        );
      }

      setSuccess(true);
      // Redirect after 2 seconds
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-background">
      <FormContainer onSubmit={handleSubmit}>
        <Typography variant="h5" align="center" color="text">
          Sign Up
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Registration successful! Redirecting...
          </Alert>
        )}

        <TextField
          label="Full Name"
          type="text"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
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
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
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
          label="Phone Number"
          type="tel"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
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

        <Button
          type="submit"
          variant="contained"
          disabled={isLoading}
          sx={{
            backgroundColor: isLoading ? "#FFB300" : "#3730a3",
            "&:hover": { backgroundColor: "#4f46e5" },
            width: "80%",
            margin: "0 auto",
            py: 1.5,
          }}
        >
          {isLoading ? "Signing up..." : "Sign Up"}
        </Button>

        <Typography
          variant="body2"
          align="center"
          sx={{
            color: "#3730a3",
            cursor: "pointer",
            "&:hover": { color: "#5b5fc7" },
          }}
          onClick={() => navigate("/")}
        >
          Already have an account? Login
        </Typography>
      </FormContainer>
    </div>
  );
}

export default Signup;
