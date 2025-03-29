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

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-background">
      <FormContainer onSubmit={handleSubmit}>
        <Typography variant="h5" align="center" color="text">
          Sign Up
        </Typography>

        <TextField
          label="Username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="username ..."
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
          {isLoading ? "Signing up..." : "Sign Up"}
        </Button>

        <Typography
          variant="body2"
          align="center"
          sx={{
            color: "#3730a3",
            cursor: "pointer",
            "&:hover": { color: "#c7d2fe" },
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
