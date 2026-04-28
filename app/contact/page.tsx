"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Stack,
  IconButton,
  TextField,
  Button
} from "@mui/material";
import { motion } from "framer-motion";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Outfit } from "next/font/google";
import HomeIcon from "@mui/icons-material/Home";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import SendIcon from "@mui/icons-material/Send";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

const themeDetails = {
  bg: "linear-gradient(135deg, #faf5ff, #f3e8ff)", 
  paper: "rgba(255, 255, 255, 0.8)",
  text: "#1e1b4b",
  textSecondary: "#4c1d95",
  border: "rgba(255, 255, 255, 0.7)",
  primary: "linear-gradient(135deg, #a855f7, #6366f1)", 
  primaryHover: "linear-gradient(135deg, #9333ea, #4f46e5)",
  glassShadow: "0 10px 40px 0 rgba(76, 29, 149, 0.1)",
};

const muiTheme = createTheme({
  typography: { fontFamily: outfit.style.fontFamily },
});

const MotionPaper = motion(Paper);

export default function ContactPage() {
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const payload = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        message: formData.get("message"),
      };
      
      const res = await fetch("http://localhost:5000/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        toast.success("Message sent successfully! We'll reach out soon.");
        e.currentTarget.reset();
      } else {
        toast.error("Failed to send message.");
      }
    } catch (err) {
      toast.error("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <Box sx={{ minHeight: "100vh", position: "relative", background: themeDetails.bg, display: "flex", alignItems: "center" }}>
        <Toaster position="top-right" />
        <IconButton
          onClick={() => router.push("/")}
          sx={{ 
            position: "absolute", top: 24, left: 24, 
            background: themeDetails.paper, backdropFilter: "blur(10px)", 
            border: `1px solid ${themeDetails.border}`, boxShadow: themeDetails.glassShadow, 
            color: themeDetails.textSecondary, 
            '&:hover': { background: "white", color: themeDetails.text } 
          }}
        >
          <HomeIcon />
        </IconButton>

        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Box textAlign="center" mb={6} component={motion.div} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Typography variant="h2" fontWeight={900} color={themeDetails.text} gutterBottom sx={{ letterSpacing: "-1px" }}>
              Get in Touch
            </Typography>
            <Typography variant="h6" color={themeDetails.textSecondary} sx={{ maxWidth: 600, mx: "auto", fontWeight: 400 }}>
              Have questions or want to collaborate? We would love to hear from you. Reach out through the form or using our contact details.
            </Typography>
          </Box>

          <Grid container spacing={6} alignItems="stretch">
            {/* Contact Info */}
            <Grid item xs={12} md={5}>
              <MotionPaper
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                sx={{
                  p: 6,
                  height: "100%",
                  background: themeDetails.primary,
                  color: "white",
                  borderRadius: 6,
                  boxShadow: "0 20px 40px rgba(109, 40, 217, 0.3)",
                  position: "relative",
                  overflow: "hidden"
                }}
              >
                {/* Decorative blob */}
                <Box sx={{ position: "absolute", right: -50, top: -50, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.1)", filter: "blur(20px)" }} />
                
                <Typography variant="h4" fontWeight={800} mb={6} sx={{ position: "relative", zIndex: 1 }}>
                  Contact Information
                </Typography>

                <Stack spacing={4} sx={{ position: "relative", zIndex: 1 }}>
                  <Stack direction="row" spacing={3} alignItems="center">
                    <LocationOnIcon sx={{ fontSize: 32, opacity: 0.9 }} />
                    <Box>
                      <Typography variant="caption" sx={{ opacity: 0.8, textTransform: "uppercase", letterSpacing: 1 }}>Location</Typography>
                      <Typography variant="h6" fontWeight={600}>Al Ihsan Campus, Kerala</Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={3} alignItems="center">
                    <PhoneIcon sx={{ fontSize: 32, opacity: 0.9 }} />
                    <Box>
                      <Typography variant="caption" sx={{ opacity: 0.8, textTransform: "uppercase", letterSpacing: 1 }}>Phone Number</Typography>
                      <Typography variant="h6" fontWeight={600}>+91 98765 43210</Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={3} alignItems="center">
                    <EmailIcon sx={{ fontSize: 32, opacity: 0.9 }} />
                    <Box>
                      <Typography variant="caption" sx={{ opacity: 0.8, textTransform: "uppercase", letterSpacing: 1 }}>Email Address</Typography>
                      <Typography variant="h6" fontWeight={600}>info@alihsan.edu</Typography>
                    </Box>
                  </Stack>
                </Stack>
              </MotionPaper>
            </Grid>

            {/* Contact Form */}
            <Grid item xs={12} md={7}>
              <MotionPaper
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                sx={{
                  p: 6,
                  background: themeDetails.paper,
                  backdropFilter: "blur(16px)",
                  border: `1px solid ${themeDetails.border}`,
                  borderRadius: 6,
                  boxShadow: themeDetails.glassShadow,
                }}
              >
                <form onSubmit={handleSendMessage}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth name="firstName" label="First Name" variant="filled" sx={{ background: "rgba(255,255,255,0.6)", borderRadius: 1 }} InputProps={{ disableUnderline: true }} required />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth name="lastName" label="Last Name" variant="filled" sx={{ background: "rgba(255,255,255,0.6)", borderRadius: 1 }} InputProps={{ disableUnderline: true }} required />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth name="email" label="Email Address" type="email" variant="filled" sx={{ background: "rgba(255,255,255,0.6)", borderRadius: 1 }} InputProps={{ disableUnderline: true }} required />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth name="message" label="Your Message" multiline rows={4} variant="filled" sx={{ background: "rgba(255,255,255,0.6)", borderRadius: 1 }} InputProps={{ disableUnderline: true }} required />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        endIcon={<SendIcon />}
                        disabled={loading}
                        sx={{
                          py: 2,
                          background: themeDetails.primary,
                          fontSize: "1.1rem",
                          fontWeight: 700,
                          borderRadius: 2,
                          transition: "0.3s",
                          '&:hover': {
                            background: themeDetails.primaryHover,
                            transform: "translateY(-2px)",
                            boxShadow: "0 8px 25px rgba(109, 40, 217, 0.4)"
                          }
                        }}
                      >
                        {loading ? "Sending..." : "Send Message"}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </MotionPaper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
