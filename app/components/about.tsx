import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export default function AboutSection() {
  return (
    <Box sx={{ py: { xs: 8, md: 14 }, backgroundColor: "#fafafa", position: 'relative', overflow: 'hidden' }}>
      {/* Decorative background element */}
      <Box sx={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)', zIndex: 0 }} />

      <Container sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: { xs: 6, md: 10 },
          }}
        >
          {/* LEFT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            style={{ flex: 1, position: 'relative' }}
          >
            {/* Image backdrop accent */}
            <Box 
              sx={{ 
                position: 'absolute', top: 20, left: -20, bottom: -20, right: 20, 
                border: '2px solid rgba(212, 175, 55, 0.3)', borderRadius: 16, zIndex: 0 
              }} 
            />
            <Box
              component="img"
              src="./campus/fullview/alihsan.jpg"
              alt="Al Ihsan Campus"
              sx={{
                width: "100%",
                borderRadius: 4,
                boxShadow: "0 20px 40px -15px rgba(0,0,0,0.15)",
                objectFit: "cover",
                position: 'relative',
                zIndex: 1,
                display: 'block'
              }}
            />
          </motion.div>

          {/* RIGHT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            style={{ flex: 1 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <AutoAwesomeIcon sx={{ color: '#d4af37', fontSize: 20 }} />
              <Typography variant="overline" sx={{ color: '#d4af37', fontWeight: 700, letterSpacing: 2 }}>
                WELCOME TO AICIS
              </Typography>
            </Box>

            <Typography variant="h3" sx={{ fontWeight: 800, mb: 3, color: '#0f172a', lineHeight: 1.2, fontSize: { xs: '2rem', md: '2.75rem' } }}>
              About <span style={{ 
                background: 'linear-gradient(135deg, #d4af37 0%, #b68f1e 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Al Ihsan College
              </span>
            </Typography>

            <Typography sx={{ color: "#475569", mb: 3, fontSize: '1.1rem', lineHeight: 1.8 }}>
              Al Ihsan College of Islamic Shari'ah is a respected educational institution dedicated to providing quality religious education along with strong moral and ethical training. 
            </Typography>

            <Typography sx={{ color: "#475569", mb: 5, fontSize: '1.1rem', lineHeight: 1.8 }}>
              We focus on teaching Qur’an, Hadith, Fiqh, Aqeedah, and other essential Islamic sciences, aiming to nurture knowledgeable scholars and responsible community leaders equipped with deep faith and good character.
            </Typography>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} style={{ display: 'inline-block' }}>
              <Button
                component={Link}
                href="/about"
                variant="contained"
                sx={{
                  background: "linear-gradient(135deg, #d4af37 0%, #b68f1e 100%)",
                  px: 4,
                  py: 1.5,
                  borderRadius: 8,
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "1.05rem",
                  boxShadow: "0 10px 20px -10px rgba(212, 175, 55, 0.6)",
                  ":hover": { 
                    background: "linear-gradient(135deg, #b68f1e 0%, #9a7818 100%)",
                    boxShadow: "0 15px 25px -10px rgba(212, 175, 55, 0.8)",
                  },
                }}
              >
                Discover More
              </Button>
            </motion.div>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}
