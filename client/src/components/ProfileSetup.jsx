import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const FormContainer = styled("div")(({ theme }) => ({
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

function ProfileSetup() {
  const [formData, setFormData] = useState({
    budget: 1900,
    risk_tolerance: "medium",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:8000/api/profile/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(formData),
    });
    setIsLoading(false);
    if (response.ok) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-background">
      <FormContainer as="form" onSubmit={handleSubmit}>
        <Typography variant="h5" align="center" color="text">
          Set Up Your Profile
        </Typography>

        <TextField
          label="Budget (INR)"
          type="number"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          placeholder="Enter your budget ..."
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

        <FormControl fullWidth variant="outlined" required>
          <InputLabel>Risk Tolerance</InputLabel>
          <Select
            name="risk_tolerance"
            value={formData.risk_tolerance}
            onChange={handleChange}
            label="Risk Tolerance"
            sx={{
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#FFB300",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#FFB300",
              },
            }}
          >
            <MenuItem value="low">Low Risk</MenuItem>
            <MenuItem value="medium">Medium Risk</MenuItem>
            <MenuItem value="high">High Risk</MenuItem>
          </Select>
        </FormControl>

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
          {isLoading ? "Saving..." : "Save Profile"}
        </Button>

        <Typography
          variant="body2"
          align="center"
          sx={{
            color: "#3730a3",
            cursor: "pointer",
            "&:hover": { color: "#c7d2fe" },
          }}
          onClick={() => navigate("/dashboard")}
        >
          Skip for now
        </Typography>
      </FormContainer>
    </div>
  );
}

export default ProfileSetup;
