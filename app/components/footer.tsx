"use client";

import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  Divider,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(135deg, #1a1747, #00090f)",
        color: "#fff",
        pt: 6,
        pb: 2,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 4,
            flexWrap: { xs: "wrap", md: "nowrap" },
          }}
        >
          {/* SECTION 1 */}
          <Box sx={{ flex: 2, minWidth: 260 }}>
            <Typography variant="h6" fontWeight={700} mb={2}>
              Al Ihsan College of Islamic Shareeah
            </Typography>

            <Typography variant="body2" lineHeight={1.8}>
              Al Ihsan College of Islamic Shareeah is a premier institution
              dedicated to providing authentic Islamic education combined with
              strong moral values and academic excellence. The college nurtures
              students to become knowledgeable scholars and responsible members
              of society.
            </Typography>
          </Box>

          {/* SECTION 2 */}
          <Box sx={{ flex: 1, minWidth: 180 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Quick Links
            </Typography>

            {["Home", "About", "Departments", "Programs", "Contact"].map(
              (item) => (
                <Typography key={item} mb={1}>
                  <Link href="#" underline="hover" color="inherit">
                    {item}
                  </Link>
                </Typography>
              )
            )}
          </Box>

          {/* SECTION 3 */}
          <Box sx={{ flex: 1, minWidth: 180 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Resources
            </Typography>

            {["Admissions", "Campus Life", "Gallery", "News", "Alumni"].map(
              (item) => (
                <Typography key={item} mb={1}>
                  <Link href="#" underline="hover" color="inherit">
                    {item}
                  </Link>
                </Typography>
              )
            )}
          </Box>

          {/* SECTION 4 */}
          <Box sx={{ flex: 2, minWidth: 260 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Get In Touch
            </Typography>

            <Box display="flex" mb={1}>
              <LocationOnIcon sx={{ mr: 1 }} />
              <Typography variant="body2">
                Vengara, Malappuram, Kerala, India
              </Typography>
            </Box>

            <Box display="flex" mb={1}>
              <PhoneIcon sx={{ mr: 1 }} />
              <Typography variant="body2">+91 9XXXXXXXXX</Typography>
            </Box>

            <Box display="flex" mb={1}>
              <EmailIcon sx={{ mr: 1 }} />
              <Typography variant="body2">
                info@alihsancollege.edu
              </Typography>
            </Box>

   

            <Typography fontWeight={600} mb={1}>
              Connect With Us
            </Typography>

            <Box>
              <IconButton sx={{ color: "#fff" }}>
                <FacebookIcon />
              </IconButton>
              <IconButton sx={{ color: "#fff" }}>
                <InstagramIcon />
              </IconButton>
              <IconButton sx={{ color: "#fff" }}>
                <YouTubeIcon />
              </IconButton>
              <IconButton sx={{ color: "#fff" }}>
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 4, bgcolor: "rgba(255,255,255,0.2)" }} />

        <Typography
          align="center"
          variant="body2"
          sx={{ color: "rgba(255,255,255,0.7)" }}
        >
          © {new Date().getFullYear()} Al Ihsan College of Islamic Shareeah. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
}