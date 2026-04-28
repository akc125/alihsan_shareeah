"use client";

import React from "react";
import { Box, Typography, Container, Grid, Card, IconButton, useTheme } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.8, ease: "easeOut" } 
  },
};

export default function About() {
  const router = useRouter();

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#fcfdfd', pb: 12, position: 'relative', overflow: 'hidden' }}>
      {/* Dynamic Background Elements */}
      <Box 
        sx={{ 
          position: 'absolute', top: 0, left: 0, right: 0, height: '800px',
          background: 'radial-gradient(circle at 20% 30%, rgba(212, 175, 55, 0.08) 0%, rgba(255,255,255,0) 50%), radial-gradient(circle at 80% 80%, rgba(30, 41, 59, 0.04) 0%, rgba(255,255,255,0) 50%)',
          zIndex: 0, pointerEvents: 'none'
        }} 
      />

      <Container maxWidth="xl" sx={{ pt: 6, position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <IconButton 
            onClick={() => router.push('/')}
            sx={{ 
              color: '#d4af37', 
              backgroundColor: 'rgba(212, 175, 55, 0.05)',
              backdropFilter: 'blur(12px)',
              mb: 8,
              width: 56, height: 56,
              border: '1px solid rgba(212, 175, 55, 0.2)',
              boxShadow: '0 8px 32px rgba(212, 175, 55, 0.1)',
              '&:hover': { backgroundColor: 'rgba(212, 175, 55, 0.15)', transform: 'translateY(-3px)' },
              transition: 'all 0.3s ease'
            }}
            aria-label="back to home"
          >
            <ArrowBackIcon sx={{ fontSize: 28 }} />
          </IconButton>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          {/* Hero Section */}
          <Box sx={{ textAlign: 'center', maxWidth: '1000px', mx: 'auto', mb: 12 }}>
            <motion.div variants={fadeInUp}>
              <Typography 
                variant="overline" 
                sx={{ 
                  color: '#d4af37', letterSpacing: 4, fontWeight: 700, mb: 2, display: 'block', fontSize: '1rem' 
                }}
              >
                DISCOVER OUR LEGACY
              </Typography>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: "3.5rem", md: "5.5rem" },
                  lineHeight: 1.1,
                  mb: 4,
                  color: '#0f172a',
                  letterSpacing: '-0.03em',
                }}
              >
                Excellence in <br />
                <span style={{ 
                  background: 'linear-gradient(135deg, #d4af37 0%, #b68f1e 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  Islamic Education
                </span>
              </Typography>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Typography
                variant="h5"
                sx={{
                  color: "#64748b",
                  lineHeight: 1.8,
                  fontWeight: 400,
                  fontSize: { xs: '1.1rem', md: '1.4rem' },
                  maxWidth: '800px',
                  mx: 'auto'
                }}
              >
                Al Ihsan College is a premier institution of Islamic Shari'ah dedicated to nurturing the next generation of scholars, leaders, and upright individuals through a harmonious blend of traditional and modern knowledge.
              </Typography>
            </motion.div>
          </Box>

          {/* Cards Section */}
          <Grid container spacing={4} sx={{ mb: 14 }}>
            {[
              {
                title: "Our Mission",
                desc: "To provide high-quality Islamic and modern education, building students with strong moral values and academic excellence.",
                icon: <MenuBookIcon sx={{ fontSize: 44, color: '#d4af37' }} />,
                bg: "linear-gradient(145deg, #ffffff, #f8fafc)",
              },
              {
                title: "Our Vision",
                desc: "To become a globally recognized leading institution combining authentic Islamic values with modern education, empowering students for the future.",
                icon: <AutoAwesomeIcon sx={{ fontSize: 44, color: '#d4af37' }} />,
                bg: "linear-gradient(145deg, #ffffff, #f8fafc)",
              },
              {
                title: "Core Values",
                desc: "We foster an environment of integrity, compassion, continuous learning, and social responsibility deeply rooted in our faith.",
                icon: <AccountBalanceIcon sx={{ fontSize: 44, color: '#d4af37' }} />,
                bg: "linear-gradient(145deg, #ffffff, #f8fafc)",
              }
            ].map((item, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div variants={scaleUp} whileHover={{ y: -12 }} transition={{ duration: 0.3 }}>
                  <Card 
                    elevation={0}
                    sx={{ 
                      height: '100%',
                      background: item.bg,
                      borderRadius: 5,
                      border: '1px solid rgba(226, 232, 240, 0.6)',
                      padding: 5,
                      position: 'relative',
                      overflow: 'visible',
                      boxShadow: '0 25px 50px -12px rgba(0,0,0,0.05)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      '&::before': {
                        content: '""', position: 'absolute', top: 0, left: 0, width: '100%', height: '5px',
                        background: 'linear-gradient(90deg, #d4af37, #fcd34d)',
                        borderTopLeftRadius: 20, borderTopRightRadius: 20,
                        opacity: 0, transition: 'opacity 0.4s ease'
                      },
                      '&:hover::before': { opacity: 1 },
                      '&:hover .icon-box': { 
                        transform: 'scale(1.1)',
                        backgroundColor: 'rgba(212, 175, 55, 0.15)'
                      }
                    }}
                  >
                    <Box 
                      className="icon-box"
                      sx={{ 
                        backgroundColor: 'rgba(212, 175, 55, 0.08)', 
                        p: 2.5, borderRadius: 4, mb: 4,
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Typography variant="h3" sx={{ fontWeight: 800, color: '#0f172a', mb: 2, fontSize: '1.75rem' }}>
                      {item.title}
                    </Typography>
                    <Typography sx={{ color: '#475569', lineHeight: 1.8, fontSize: '1.1rem' }}>
                      {item.desc}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Bottom Statement */}
          <motion.div variants={fadeInUp} whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
            <Box 
              component={Link}
              href="/contact"
              sx={{ 
                display: 'block',
                textDecoration: 'none',
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                borderRadius: 6,
                p: { xs: 5, md: 10 },
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 30px 60px -15px rgba(15, 23, 42, 0.4)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 40px 70px -15px rgba(15, 23, 42, 0.6)',
                }
              }}
            >
              {/* Decorative background elements inside the dark box */}
              <Box sx={{ position: 'absolute', top: '-50%', left: '-10%', width: '50%', height: '200%', background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.1) 0%, transparent 70%)', transform: 'rotate(-45deg)' }} />
              <Box sx={{ position: 'absolute', bottom: '-50%', right: '-10%', width: '50%', height: '200%', background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.05) 0%, transparent 70%)', transform: 'rotate(45deg)' }} />
              
              <SchoolIcon sx={{ fontSize: 140, color: 'rgba(255,255,255,0.03)', position: 'absolute', right: -20, bottom: -40, transform: 'rotate(-10deg)' }} />
              
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography variant="h2" sx={{ color: '#fff', fontWeight: 800, mb: 3, fontSize: { xs: '2.5rem', md: '3.5rem' }, letterSpacing: '-0.02em' }}>
                  Ready to Join Our Journey?
                </Typography>
                <Typography sx={{ color: '#94a3b8', fontSize: '1.25rem', maxWidth: '600px', mx: 'auto', mb: 0, lineHeight: 1.8 }}>
                  Be part of a vibrant community that values knowledge, spirituality, and continuous personal growth.
                </Typography>
              </Box>
            </Box>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
}