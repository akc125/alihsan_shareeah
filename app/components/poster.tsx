"use client";

import { Box } from "@mui/material";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const GAP = 16;
const PAUSE = 2500;

export default function PosterSlider() {
  const posters = [
    "/accadamic add.jpeg",
    "/WhatsApp Image 2026-02-09 at 11.23.15 AM.jpeg",
    "/WhatsApp Image 2026-02-09 at 11.23.15 AM (1).jpeg",
    "/WhatsApp Image 2026-02-09 at 11.23.15 AM (2).jpeg",
    "/WhatsApp Image 2026-02-09 at 11.23.15 AM.jpeg",
    "/azhar student.jpeg",
  ];

  const trackRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [itemWidth, setItemWidth] = useState(250);
  const [visible, setVisible] = useState(4);
  const [index, setIndex] = useState(0);

  // ✅ Responsive
  useLayoutEffect(() => {
    const resize = () => {
      const w = window.innerWidth;
      const track = trackRef.current;

      if (track) {
        track.style.transition = "none"; // prevent jump
      }

      if (w < 600) {
        setVisible(1);
        setItemWidth(280);
      } else if (w < 900) {
        setVisible(2);
        setItemWidth(260);
      } else {
        setVisible(4);
        setItemWidth(250);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const STEP = itemWidth + GAP;

  // ✅ Infinite clone
  const extended = [
    ...posters.slice(-visible),
    ...posters,
    ...posters.slice(0, visible),
  ];

  // ✅ Initial positioning
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    requestAnimationFrame(() => {
      track.style.transition = "none";
      track.style.transform = `translateX(-${visible * STEP}px)`;
      setIndex(visible);
    });
  }, [visible, STEP]);

  // ✅ Timer controls
  const start = () => {
    if (timerRef.current) return;

    timerRef.current = setInterval(() => {
      setIndex((i) => i + 1);
    }, PAUSE);
  };

  const stop = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // ✅ Autoplay + visibility handling
  useEffect(() => {
    const handleVisibility = () => {
      const track = trackRef.current;
      if (!track) return;

      if (document.visibilityState === "visible") {
        // reset safely
        track.style.transition = "none";
        track.style.transform = `translateX(-${visible * STEP}px)`;
        setIndex(visible);

        setTimeout(start, 100); // prevent flicker
      } else {
        stop();
      }
    };

    start();
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [visible, STEP]);

  // ✅ Animate movement
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    track.style.transition = "transform 0.6s ease";
    track.style.transform = `translateX(-${index * STEP}px)`;
  }, [index, STEP]);

  // ✅ Seamless loop reset (robust)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleEnd = () => {
      if (index >= posters.length + visible) {
        track.style.transition = "none";
        track.style.transform = `translateX(-${visible * STEP}px)`;
        setIndex(visible);
      }
    };

    track.addEventListener("transitionend", handleEnd);
    return () => track.removeEventListener("transitionend", handleEnd);
  }, [index, posters.length, visible, STEP]);

  return (
    <Box
      key={visible}
      sx={{
        overflow: "hidden",
        width: "100%",
        maxWidth: STEP * visible,
        mx: "auto",
        py: 3,
      }}
    >
      <Box ref={trackRef} sx={{ display: "flex", gap: `${GAP}px` }}>
        {extended.map((src, i) => (
          <Box
            key={i}
            sx={{
              position: "relative",
              width: itemWidth,
              height: 360,
              flexShrink: 0,
            }}
          >
            <Image
              src={src}
              alt="poster"
              fill
              sizes="(max-width: 600px) 90vw, 250px"
              style={{
                objectFit: "cover",
                borderRadius: 12,
              }}
              priority={i < visible + 2}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}