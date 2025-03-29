import React from "react";
import { styled } from "@mui/material/styles";
import { Typography, IconButton } from "@mui/material";
import { Twitter, Facebook, Instagram, Mail } from "lucide-react";

const FooterContainer = styled("footer")({
  backgroundColor: "#3730a3",
  color: "white",
  padding: "20px",
  textAlign: "center",
  width: "100%",
  minHeight: "100px", // Height for content
  zIndex: "50"
});

const SocialContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  gap: "15px",
  marginTop: "10px",
});

function Footer({ sidebarExpanded }) {
  return (
    <FooterContainer
      style={{
        display: sidebarExpanded && window.innerWidth < 768 ? "none" : "block",
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Investor Platform. This app provides
        general information, not personalized financial advice. Consult a
        professional before investing.
      </Typography>
      <SocialContainer>
        <IconButton
          href="https://twitter.com"
          target="_blank"
          sx={{ color: "white", "&:hover": { color: "#c7d2fe" } }}
        >
          <Twitter size={20} />
        </IconButton>
        <IconButton
          href="https://facebook.com"
          target="_blank"
          sx={{ color: "white", "&:hover": { color: "#c7d2fe" } }}
        >
          <Facebook size={20} />
        </IconButton>
        <IconButton
          href="https://instagram.com"
          target="_blank"
          sx={{ color: "white", "&:hover": { color: "#c7d2fe" } }}
        >
          <Instagram size={20} />
        </IconButton>
        <IconButton
          href="mailto:support@investorplatform.com"
          sx={{ color: "white", "&:hover": { color: "#c7d2fe" } }}
        >
          <Mail size={20} />
        </IconButton>
      </SocialContainer>
      <Typography variant="body2" sx={{ marginTop: "10px" }}>
        Contact us: support@investorplatform.com
      </Typography>
    </FooterContainer>
  );
}

export default Footer;
