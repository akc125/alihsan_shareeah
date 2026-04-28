"use client";

import React from "react";
import { Box, Container, Typography } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function LocationMap() {
  return (
    <Box sx={{ py: { xs: 6, md: 10 }, backgroundColor: "#ffffff" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Box 
            sx={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              backgroundColor: 'rgba(212, 175, 55, 0.1)',
              color: '#d4af37',
              borderRadius: '50%',
              p: 2,
              mb: 2
            }}
          >
            <LocationOnIcon sx={{ fontSize: 36 }} />
          </Box>
          <Typography variant="h3" sx={{ fontWeight: 800, color: "#0f172a", mb: 2 }}>
            Find Us Here
          </Typography>
          <Typography variant="h6" sx={{ color: "#64748b", fontWeight: 400, maxWidth: "600px", mx: "auto" }}>
            Visit our campus at Al Ihsan Juma Masjid, Vengara, Kuttaloor. We welcome you to experience our vibrant educational community.
          </Typography>
        </Box>

        <Box 
          sx={{ 
            width: "100%", 
            height: { xs: "350px", md: "500px" }, 
            borderRadius: 6, 
            overflow: "hidden",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.1)",
            border: "1px solid rgba(226, 232, 240, 0.8)",
            position: "relative"
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
      </Container>
    </Box>
  );
}
