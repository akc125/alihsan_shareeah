"use client";

import React from "react";
import { Box, Container, Typography, Card, Avatar } from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function ChairmanMessage() {
  return (
    <Box sx={{ backgroundColor: "#f8f9f8", py: 10 }}>
      <Container maxWidth="lg">
        {/* Title Animation */}
        <MotionBox
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          //   viewport={{ once: true }}
        >
          <Typography variant="h4" align="center" sx={{ fontWeight: "bold", mb: 6 }}>
            <span style={{ color: "#1b5e20" }}>Usthad&apos;s</span>{" "}
            <span style={{ color: "#c58b2d" }}>Message</span>
          </Typography>
        </MotionBox>

        {/* Content Animation */}
        <MotionBox
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          //   viewport={{ once: true }}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* Image */}
          <Avatar
            src="./campus/WhatsApp Image 2026-02-26 at 11.35.16 AM (1).jpeg"
            alt="TT Ahmad Kutty Saqafi"
            sx={{
              width: 220,
              height: 220,
              border: "4px solid #fff",
              boxShadow: 3,
              flexShrink: 0,
            }}
          />

          {/* Card */}
          <Card
            elevation={4}
            sx={{
              p: 4,
              borderRadius: 3,
              flex: 1,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "success.dark" }}>
             Usthad TT Ahmad Kutty Saqafi
            </Typography>

            <Typography variant="subtitle2" sx={{ color: "#c58b2d", mb: 2 }}>
              President, Al Ihsan
            </Typography>

            <Typography variant="body1" sx={{ color: "text.secondary", mb: 2 }}>
             Alihsan daras is an Islamic religious study center located in Vengara, Kerala.
              It focuses on providing Islamic education  to students,
              including Qur’an studies, Hadith, Fiqh, Aqeedah, and moral
              teachings. 
            </Typography>

            <Typography variant="body1" sx={{ color: "text.secondary", mb: 2 }}>
             The Daras aims to nurture students with strong Islamic
              values, good character, and community responsibility. Along with
              religious learning, it encourages discipline, spirituality, and
              service to society.
            </Typography>

           
          </Card>
        </MotionBox>
      </Container>
    </Box>
  );
}
