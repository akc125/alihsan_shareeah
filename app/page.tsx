"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";

import PosterSlider from "./components/poster";
import AboutSection from "./components/about";
import ChairmanMessage from "./components/message";
import VisionMissionWithIcons from "./components/ourMission";
import CampusMoments from "./components/news";
import Footer from "./components/footer";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import FeaturesSection from "./components/features";
import StatsSection from "./components/StatsSection";
import LocationMap from "./components/locationMap";

/* ---------------- NAV MENU ---------------- */

function NavMenu({ color }: { color: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Departments", path: "/departments" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* Desktop */}
      <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4 }}>
        {menuItems.map((item) => {
          const active = pathname === item.path;

          return (
            <Link key={item.label} href={item.path} style={{ textDecoration: "none" }}>
              <Typography
                sx={{
                  position: "relative",
                  fontWeight: active ? 700 : 500,
                  color: color,

                  "&::after": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    bottom: -4,
                    width: active ? "100%" : "0%",
                    height: "2px",
                    backgroundColor: "gold",
                    transition: "0.3s",
                  },

                  "&:hover::after": {
                    width: "100%",
                  },
                }}
              >
                {item.label}
              </Typography>
            </Link>
          );
        })}
      </Box>

      {/* Mobile Icon */}
      <IconButton
        onClick={() => setOpen(true)}
        sx={{
          display: { xs: "flex", md: "none" },
          color,
          background: "rgba(0,0,0,0.3)",
          backdropFilter: "blur(6px)",
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* Drawer */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: "80%",
            maxWidth: 320,
            background: "#05204a",
            color: "white",
          },
        }}
      >
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
            <Typography sx={{ fontWeight: 700 }}>Menu</Typography>
            <IconButton onClick={() => setOpen(false)} sx={{ color: "white" }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List>
            {menuItems.map((item) => {
              const active = pathname === item.path;

              return (
                <ListItem key={item.label} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      router.push(item.path);
                      setOpen(false);
                    }}
                    sx={{
                      background: active ? "rgba(255,215,0,0.1)" : "transparent",

                      "&::before": {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        top: 0,
                        height: "100%",
                        width: "4px",
                        background: active ? "gold" : "transparent",
                      },
                    }}
                  >
                    <ListItemText
                      primary={item.label}
                      sx={{
                        "& .MuiListItemText-primary": {
                          fontWeight: active ? 700 : 400,
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

/* ---------------- HOME PAGE ---------------- */

export default function Home() {
  const images = [
    "./campus/fullview/alihsan.jpg",
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    "https://images.unsplash.com/photo-1504052434569-70ad5836ab65",
  ];

  const [active, setActive] = useState(0);
  const [scrollHeader, setScrollHeader] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);

  /* Carousel */
  useEffect(() => {
    const timer = setInterval(
      () => setActive((p) => (p + 1) % images.length),
      3500
    );
    return () => clearInterval(timer);
  }, [images.length]);

  /* Scroll Fix */
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setScrollHeader(true);
      } else {
        setScrollHeader(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box sx={{ overflowX: "hidden" }}>
      {/* Header 1 */}
      <AppBar
        position="fixed"
        sx={{
          width: "100%",
          left: 0,
          background: "rgba(0, 0, 0, 0.45)",
          backdropFilter: "blur(10px)",
          color: "white",
          opacity: scrollHeader ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography sx={{ fontWeight: 700 }}>Al Ihsan</Typography>
          <NavMenu color="white" />
        </Toolbar>
      </AppBar>

      {/* Header 2 */}
      <AppBar
        position="fixed"
        sx={{
          width: "100%",
          left: 0,
          background: "white",
          color: "#05204a",
          transform: scrollHeader ? "translateY(0)" : "translateY(-100%)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography sx={{ fontWeight: 700 }}>Al Ihsan</Typography>
          <NavMenu color="#05204a" />
        </Toolbar>
      </AppBar>

      {/* HERO */}
      <Box sx={{ height: { xs: 300, md: "100dvh" }, position: "relative" }}>
        {images.map((src, i) => (
          <Box
            key={i}
            component="img"
            src={src}
            sx={{
              width: "100%",
              maxWidth: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              inset: 0,
              opacity: active === i ? 1 : 0,
              transition: "1s",
            }}
          />
        ))}
      </Box>

      {/* CONTENT */}
      <AboutSection />
      <PosterSlider />
      <FeaturesSection />
      <VisionMissionWithIcons />
      <ChairmanMessage />
      <StatsSection />
      <LocationMap />
      <CampusMoments />
      <Footer />
    </Box>
  );
}