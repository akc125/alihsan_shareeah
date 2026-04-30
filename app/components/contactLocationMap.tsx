"use client";

import React from "react";
import { Box, Typography, Container, Paper } from "@mui/material";
import MapIcon from '@mui/icons-material/Map';

export default function ContactLocationMap() {
  return (
    <Box sx={{ py: 8, position: 'relative', zIndex: 1 }}>
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            background: "rgba(255, 255, 255, 0.5)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.8)",
            borderRadius: 6,
            boxShadow: "0 10px 40px 0 rgba(76, 29, 149, 0.08)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
            <Box 
              sx={{ 
                background: "linear-gradient(135deg, #a855f7, #6366f1)",
                p: 1.5,
                borderRadius: "50%",
                color: "white",
                display: "flex",
                boxShadow: "0 8px 16px rgba(109, 40, 217, 0.3)"
              }}
            >
              <MapIcon />
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 800, color: "#1e1b4b", fontSize: { xs: '2rem', md: '2.5rem' } }}>
              Explore Our Campus
            </Typography>
          </Box>
          
          <Typography sx={{ color: "#4c1d95", mb: 4, textAlign: "center", maxWidth: "600px" }}>
            Experience our vibrant and disciplined educational environment in person. We are easily accessible and located in the heart of Vengara, Kuttaloor.
          </Typography>
          
          <Box 
            sx={{ 
              width: "100%", 
              height: { xs: "350px", md: "500px" }, 
              borderRadius: 4, 
              overflow: "hidden",
              border: "6px solid rgba(255, 255, 255, 0.8)",
              boxShadow: "0 20px 40px -10px rgba(109, 40, 217, 0.2)",
            }}
          >
            <iframe
              title="Al Ihsan Masjid Vengara Kuttaloor Location Map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=Al+Ihsan+Juma+Masjid+Vengara+Kuttaloor&output=embed"
            ></iframe>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
