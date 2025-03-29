import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    backgroundColor: "#4CAF50",
    color: "white",
  },
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#4CAF50",
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: "Dashboard", path: "/dashboard" },
    {
      text: "Logout",
      path: "/",
      onClick: () => localStorage.removeItem("token"),
    },
  ];

  const drawerContent = (
    <List>
      {menuItems.map((item) => (
        <ListItem
          button={true} // Explicitly set as boolean
          key={item.text}
          onClick={() => {
            if (item.onClick) item.onClick();
            navigate(item.path);
          }}
          sx={{ "&:hover": { backgroundColor: "#45A049" } }}
        >
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <>
      {/* Mobile Top Navbar */}
      <StyledAppBar position="fixed" sx={{ display: { md: "none" } }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Investor Platform
          </Typography>
        </Toolbar>
      </StyledAppBar>

      {/* Sidebar for Desktop */}
      <StyledDrawer
        variant="permanent"
        sx={{ display: { xs: "none", md: "block" } }}
        open
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            Investor Platform
          </Typography>
        </Toolbar>
        {drawerContent}
      </StyledDrawer>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: "#4CAF50",
            color: "white",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}

export default Navbar;
