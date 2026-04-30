"use client";

import { Box, Container, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

const images = [
  "./campus/WhatsApp Image 2026-02-26 at 11.35.14 AM (1).jpeg",
  "./campus/WhatsApp Image 2026-02-26 at 11.35.14 AM (2).jpeg",
  "./campus/WhatsApp Image 2026-02-26 at 11.35.14 AM (3).jpeg",
  "./campus/WhatsApp Image 2026-02-26 at 11.35.16 AM.jpeg",
  "./campus/WhatsApp Image 2026-02-26 at 11.35.14 AM.jpeg",
  "./campus/WhatsApp Image 2026-02-26 at 11.35.15 AM (1).jpeg",
  "./campus/WhatsApp Image 2026-02-26 at 11.35.15 AM (2).jpeg",
  "./campus/WhatsApp Image 2026-02-26 at 11.35.15 AM.jpeg",
  "./campus/WhatsApp Image 2026-02-26 at 11.35.16 AM (1).jpeg",
  "./campus/WhatsApp Image 2026-02-26 at 11.35.13 AM.jpeg",
  "./campus/WhatsApp Image 2026-02-26 at 12.04.02 PM.jpeg",
];

export default function CampusMoments() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);

  // for mouse drag
  const startX = useRef(0);
  const scrollStart = useRef(0);

  // for touch
  const touchStartX = useRef(0);
  const touchScrollStart = useRef(0);

  const rafRef = useRef<number | null>(null);

  // 🔥 AUTO SCROLL (FINAL FIXED)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const SPEED = 1; // 🔥 adjust speed (2–4 best for mobile)

    const animate = () => {
      if (!isDragging) {
        el.scrollLeft += SPEED;

        const half = el.scrollWidth / 2;

        // ✅ seamless loop
        if (el.scrollLeft >= half) {
          el.scrollLeft -= half;
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isDragging]);

  // 🖱️ MOUSE DRAG
  const onMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    setIsDragging(true);
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollStart.current = containerRef.current.scrollLeft;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    containerRef.current.scrollLeft = scrollStart.current - walk;
  };

  const stopDragging = () => setIsDragging(false);

  // 📱 TOUCH SUPPORT
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const touchStart = (e: TouchEvent) => {
      setIsDragging(true);
      touchStartX.current = e.touches[0].pageX;
      touchScrollStart.current = el.scrollLeft;
    };

    const touchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const x = e.touches[0].pageX;
      const walk = (x - touchStartX.current) * 1.5;
      el.scrollLeft = touchScrollStart.current - walk;
    };

    const touchEnd = () => setIsDragging(false);

    el.addEventListener("touchstart", touchStart);
    el.addEventListener("touchmove", touchMove);
    el.addEventListener("touchend", touchEnd);

    return () => {
      el.removeEventListener("touchstart", touchStart);
      el.removeEventListener("touchmove", touchMove);
      el.removeEventListener("touchend", touchEnd);
    };
  }, [isDragging]);

  // 🖱️ WHEEL → HORIZONTAL
  const onWheel = (e: React.WheelEvent) => {
    if (!containerRef.current) return;
    e.preventDefault();
    containerRef.current.scrollLeft += e.deltaY;
  };

  return (
    <Box sx={{ py: 10, backgroundColor: "#fafafa" }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 800, 
            textAlign: "center", 
            mb: 5,
            fontSize: { xs: "2rem", md: "2.5rem" },
            color: "#0f172a"
          }}
        >
          Campus Moments
        </Typography>
      </Container>

      <Box
        ref={containerRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
        onWheel={onWheel}
        sx={{
          overflowX: "auto",
          overflowY: "hidden",
          display: "flex",
          gap: 3,
          px: 2,
          cursor: isDragging ? "grabbing" : "grab",
          userSelect: "none",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {[...images, ...images].map((src, index) => (
          <Box
            key={index}
            component="img"
            src={src}
            draggable={false}
            alt="Campus"
            sx={{
              width: 300,
              height: 190,
              objectFit: "cover",
              borderRadius: 2,
              flexShrink: 0,
            }}
          />
        ))}
      </Box>
    </Box>
  );
}