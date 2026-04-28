"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Stack,
  IconButton
} from "@mui/material";
import { motion } from "framer-motion";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Outfit } from "next/font/google";
import HomeIcon from "@mui/icons-material/Home";
import { useRouter } from "next/navigation";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

const themeDetails = {
  bg: "linear-gradient(135deg, #f0fdfa, #e0f2fe)", 
  paper: "rgba(255, 255, 255, 0.75)",
  text: "#0f172a",
  textSecondary: "#475569",
  border: "rgba(255, 255, 255, 0.6)",
  primary: "linear-gradient(135deg, #0ea5e9, #6366f1)", 
  glassShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.1)",
};

const muiTheme = createTheme({
  typography: { fontFamily: outfit.style.fontFamily },
});

const MotionPaper = motion(Paper);

export default function AboutPage() {
  const router = useRouter();

  return (
    <ThemeProvider theme={muiTheme}>
      <Box sx={{ minHeight: "100vh", position: "relative", background: themeDetails.bg, pt: { xs: 8, md: 4 }, pb: 4 }}>
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

        <Container maxWidth="lg" sx={{ pt: 2, pb: 2 }}>
          <Box textAlign="center" mb={4} component={motion.div} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Typography variant="h2" fontWeight={900} color={themeDetails.text} gutterBottom sx={{ letterSpacing: "-1px" }}>
              Our Story
            </Typography>
            <Typography variant="h6" color={themeDetails.textSecondary} sx={{ maxWidth: 700, mx: "auto", fontWeight: 400 }}>
              Discover the history, vision, and mission that shape Al Ihsan Shareeath College into a premier institution of learning and character development.
            </Typography>
          </Box>

          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <MotionPaper
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                sx={{
                  height: 400,
                  borderRadius: 6,
                  overflow: "hidden",
                  boxShadow: themeDetails.glassShadow,
                  background: `url('https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=1500&auto=format&fit=crop') center/cover`,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box component={motion.div} initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <Typography variant="h4" fontWeight={800} color={themeDetails.text} mb={3}>
                  Empowering the Next Generation
                </Typography>
                <Typography variant="body1" color={themeDetails.textSecondary} paragraph sx={{ lineHeight: 1.8, fontSize: "1.1rem" }}>
                  Founded on principles of holistic education, our college aims to nurture minds capable of traversing traditional wisdom and modern innovation equally.
                </Typography>
                <Typography variant="body1" color={themeDetails.textSecondary} sx={{ lineHeight: 1.8, fontSize: "1.1rem" }}>
                  We believe in cultivating an environment that serves as an intellectual, moral, and cultural nexus for our students, producing leaders who shape society with empathy, intellectual rigor, and unfaltering ethics.
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Box mt={4} component={motion.div} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Grid container spacing={4}>
              {[
                { icon: <SchoolIcon />, title: "Academic Excellence", text: "Rigorous curriculum ensuring deep comprehension and practical skills." },
                { icon: <GroupsIcon />, title: "Community First", text: "We prepare structural pillars for communities, capable of inclusive leadership." },
                { icon: <AutoGraphIcon />, title: "Continuous Growth", text: "Endless avenues for personal, professional, and ethical betterment." }
              ].map((item, i) => (
                <Grid item xs={12} md={4} key={i}>
                  <MotionPaper
                    whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                    sx={{
                      p: 4,
                      display: "flex",
                      flexDirection: "column",
                      background: themeDetails.paper,
                      backdropFilter: "blur(16px)",
                      border: `1px solid ${themeDetails.border}`,
                      borderRadius: 4,
                      textAlign: "center"
                    }}
                  >
                    <Box sx={{ width: 64, height: 64, mx: "auto", mb: 3, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", background: themeDetails.primary, color: "white", boxShadow: "0 8px 20px rgba(14, 165, 233, 0.4)" }}>
                      {React.cloneElement(item.icon, { sx: { fontSize: 32 } })}
                    </Box>
                    <Typography variant="h6" fontWeight={800} color={themeDetails.text} mb={1}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color={themeDetails.textSecondary} sx={{ lineHeight: 1.6 }}>
                      {item.text}
                    </Typography>
                  </MotionPaper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
