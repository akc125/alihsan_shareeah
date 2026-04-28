"use client";

import { Box, Grid, Typography } from "@mui/material";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

// Icons
import GroupsIcon from "@mui/icons-material/Groups";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import TimelineIcon from "@mui/icons-material/Timeline";

const stats = [
  { value: 50, label: "Students", icon: <GroupsIcon sx={{ fontSize: 36 }} /> },
  { value: 5, label: "Programs", icon: <MenuBookIcon sx={{ fontSize: 36 }} /> },
  { value: 200, label: "Scholars", icon: <SchoolIcon sx={{ fontSize: 36 }} /> },
  {
    value: 4,
    label: "Qualified Teachers",
    icon: <PersonIcon sx={{ fontSize: 36 }} />,
  },
  {
    value: 20,
    label: "Years of Service",
    icon: <TimelineIcon sx={{ fontSize: 36 }} />,
  },
];

function StatItem({ item }: any) {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.4,
  });

  return (
    <Box ref={ref} sx={{ textAlign: "center", p: 3 }}>
      {/* Icon */}
      <Box
        sx={{
          width: 70,
          height: 70,
          mx: "auto",
          mb: 2,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(255,255,255,0.2)",
        }}
      >
        {item.icon}
      </Box>

      {/* Number */}
      <Typography variant="h3" sx={{ fontWeight: 700 }}>
        {inView ? <CountUp end={item.value} duration={2} /> : 0}+
      </Typography>

      {/* Label */}
      <Typography sx={{ mt: 1, fontSize: 15, opacity: 0.9 }}>
        {item.label}
      </Typography>
    </Box>
  );
}

export default function StatsSection() {
  return (
    <Box
      sx={{
        py: 12,
        color: "#fff",

        // ✅ Free Unsplash Image (Education theme)
        backgroundImage:
          "url('https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg')",

        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",

        // ✅ Fixed background (parallax effect)
        backgroundAttachment: { xs: "scroll", md: "fixed" },

        position: "relative",
        zIndex: 1,

        // ✅ Dark overlay for readability
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.6)",
          zIndex: -1,
        },
      }}
    >
      <Grid
        container
        spacing={6}
        sx={{ maxWidth: "1100px", mx: "auto", justifyContent: "center" }}
      >
        {stats.map((item, index) => (
          <Grid size={{ xs: 6, sm: 4, md: 2.4 }} key={index}>
            <StatItem item={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
