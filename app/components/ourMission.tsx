'use client';

import { Box, Container, Typography, Stack } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import FlagIcon from '@mui/icons-material/Flag';

export default function VisionMissionWithIcons() {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        py: { xs: 8, md: 12 },
        backgroundImage:
          "url('./dua.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
        }}
      />

      <Container sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 6,
          }}
        >
          {/* Vision */}
          <Box sx={{ flex: 1 }}>
            <Stack spacing={2}>
              <Stack direction="row" spacing={2} alignItems="center">
                <SchoolIcon sx={{ color: '#fff', fontSize: 34 }} />
                <Typography variant="h4" fontWeight={700} color="white">
                  Our Vision
                </Typography>
              </Stack>

              <Typography
                sx={{
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: 18,
                  lineHeight: 1.8,
                }}
              >
                To emerge as a leading educational institution committed to
                academic excellence, innovation, and ethical values, nurturing
                students to become knowledgeable, responsible, and confident
                individuals capable of contributing meaningfully to society.
              </Typography>
            </Stack>
          </Box>

          {/* Mission */}
          <Box sx={{ flex: 1 }}>
            <Stack spacing={2}>
              <Stack direction="row" spacing={2} alignItems="center">
                <FlagIcon sx={{ color: '#fff', fontSize: 34 }} />
                <Typography variant="h4" fontWeight={700} color="white">
                  Our Mission
                </Typography>
              </Stack>

              <Typography
                sx={{
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: 18,
                  lineHeight: 1.8,
                }}
              >
                Our mission is to provide high-quality education through
                experienced faculty, modern infrastructure, and a
                student-centered learning environment that encourages critical
                thinking, creativity, and lifelong learning while upholding
                strong moral and social values.
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
