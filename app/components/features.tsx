"use client";

import { Box, Typography, Paper } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import TranslateOutlinedIcon from "@mui/icons-material/TranslateOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import TrackChangesOutlinedIcon from "@mui/icons-material/TrackChangesOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";

const features = [
  {
    icon: <ChatBubbleOutlineIcon sx={{ fontSize: 40 }} />,
    title: "Interactive Learning",
    text: "Discussion-based sessions that make learning simple and engaging.",
  },
  {
    icon: <SchoolOutlinedIcon sx={{ fontSize: 40 }} />,
    title: "Structured Syllabus",
    text: "Jamia-integrated curriculum designed for strong academic foundation.",
  },
  {
    icon: <TranslateOutlinedIcon sx={{ fontSize: 40 }} />,
    title: "Language Training",
    text: "Arabic, English & Urdu to enhance communication skills.",
  },
  {
    icon: <VerifiedUserOutlinedIcon sx={{ fontSize: 40 }} />,
    title: "Moral Development",
    text: "Focus on Islamic values, ethics, and character building.",
  },
  {
    icon: <TrackChangesOutlinedIcon sx={{ fontSize: 40 }} />,
    title: "Goal-Oriented Learning",
    text: "Practical and result-driven approach to education.",
  },
  {
    icon: <MenuBookOutlinedIcon sx={{ fontSize: 40 }} />,
    title: "Balanced Education",
    text: "Combination of academic excellence and religious studies.",
  },
];

export default function FeaturesSection() {
  return (
    <Box sx={{ py: 12, background: "#f7fbff" }}>
      
      {/* Heading */}
      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: 700, mb: 2, color: "#05204a" }}
      >
        Why Choose Us
      </Typography>

      <Typography
        align="center"
        sx={{ maxWidth: 600, mx: "auto", mb: 8, color: "text.secondary" }}
      >
        We provide a holistic educational experience that blends knowledge,
        values, and practical skills for a better future.
      </Typography>

      {/* 🔥 CSS GRID (FORCED 3 COLUMNS) */}
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",           // mobile
            sm: "1fr 1fr",       // tablet
            md: "1fr 1fr 1fr",   // ✅ ALWAYS 3 on desktop
          },
          gap: 4,
        }}
      >
        {features.map((item, index) => (
          <Paper
            key={index}
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 4,
              textAlign: "center",
              minHeight: 230,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: "1px solid #e6eef7",
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
              },
            }}
          >
            <Box>
              {/* Icon */}
              <Box
                sx={{
                  width: 70,
                  height: 70,
                  mx: "auto",
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #0a5c8f, #0d3c61)",
                  color: "#fff",
                }}
              >
                {item.icon}
              </Box>

              {/* Title */}
              <Typography sx={{ fontWeight: 600, mb: 1 }}>
                {item.title}
              </Typography>

              {/* Description */}
              <Typography sx={{ fontSize: 14, color: "text.secondary" }}>
                {item.text}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}