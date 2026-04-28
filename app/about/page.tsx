"use client";

import React from "react";
import { Box, Typography, Paper } from "@mui/material";

export default function About() {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 4,
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      {/* LEFT SECTION */}
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 2,
          }}
        >
          About{" "}
          <span style={{ color: "#b68f1e" }}>
            Al Ihsan College of Islamic Shari'ah
          </span>
        </Typography>

        <Typography
          sx={{
            color: "#475569",
            lineHeight: 1.8,
            mb: 2,
          }}
        >
          Al Ihsan College is dedicated to providing high-quality Islamic and
          modern education, building students with strong moral values and
          academic excellence.
        </Typography>

        <Typography
          sx={{
            color: "#475569",
            lineHeight: 1.8,
          }}
        >
          We aim to create leaders who combine knowledge, ethics, and
          responsibility to serve society effectively.
        </Typography>
      </Box>

      {/* RIGHT CARD */}
      <Paper
        elevation={3}
        sx={{
          flex: 1,
          p: 3,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            mb: 2,
          }}
        >
          Our Vision
        </Typography>

        <Typography
          sx={{
            color: "#475569",
            lineHeight: 1.8,
          }}
        >
          To become a leading institution combining Islamic values with modern
          education, empowering students for the future.
        </Typography>
      </Paper>
    </Box>
  );
}