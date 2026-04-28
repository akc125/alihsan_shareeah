import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
    >
      <Box sx={{ py: { xs: 6, md: 10 }, backgroundColor: "#fff" }}>
        <Container>
          {/* ★ FLEX WRAPPER – THIS FIXES THE ISSUE */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              gap: 6,
            }}
          >
            {/* LEFT IMAGE */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              style={{ flex: 1 }}
            >
              <Box
                component="img"
                src="./campus/fullview/alihsan.jpg"
                alt="alihsan"
                sx={{
                  width: "100%",
                  borderRadius: 4,
                  boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
                  objectFit: "cover",
                }}
              />
            </motion.div>

            {/* RIGHT CONTENT */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              style={{ flex: 1 }}
            >
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                About <span style={{ color: "#b68f1e" }}>Al Ihsan College of Islamic Shari'ah</span>
              </Typography>

              <Typography sx={{ color: "text.secondary", mb: 2 }}>
                AICIS (Al Ihsan College of Islamic Shariah) is a respected Islamic
                educational institution dedicated to providing quality religious
                education along with strong moral and ethical training. The
                college focuses on teaching Qur’an, Hadith, Fiqh, Aqeedah, and
                other essential Islamic sciences
              </Typography>

              <Typography sx={{ color: "text.secondary", mb: 2 }}>
               aiming to nurture
                knowledgeable scholars and responsible community leaders. With a
                disciplined learning environment and commitment to spiritual
                growth, ASC strives to shape students with deep faith, good
                character, and a strong sense of social responsibility
              </Typography>

             

              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#14452f",
                    px: 4,
                    py: 1.2,
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "1rem",
                    ":hover": { backgroundColor: "#0d2e1f" },
                  }}
                >
                  Know More
                </Button>
              </motion.div>
            </motion.div>
          </Box>
        </Container>
      </Box>
    </motion.div>
  );
}
