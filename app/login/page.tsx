"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import HomeIcon from "@mui/icons-material/Home";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { API_URL } from "@/app/lib/api";
import toast, { Toaster } from "react-hot-toast";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

const lightTheme = {
  bg: "linear-gradient(135deg, #f0fdfa, #e0f2fe)", 
  paper: "rgba(255, 255, 255, 0.75)",
  text: "#0f172a",
  textSecondary: "#64748b",
  border: "rgba(255, 255, 255, 0.6)",
  primary: "linear-gradient(135deg, #0ea5e9, #6366f1)", 
  primaryHover: "linear-gradient(135deg, #0284c7, #4f46e5)",
  glassShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.1)",
};

const MotionPaper = motion(Paper);

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const theme = lightTheme;
  const muiTheme = createTheme({
    typography: { fontFamily: outfit.style.fontFamily },
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Please enter both username and password");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.user.username);
        toast.success("Logged in successfully!");
        router.push("/departments");
      } else {
        toast.error(data.error || "Login failed");
      }
    } catch (error) {
      toast.error("Network error. Could not reach server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <Box sx={{ minHeight: "100vh", position: "relative", background: theme.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <IconButton
          onClick={() => router.push("/")}
          sx={{ 
            position: "absolute", top: 24, left: 24, 
            background: theme.paper, backdropFilter: "blur(10px)", 
            border: `1px solid ${theme.border}`, boxShadow: theme.glassShadow, 
            color: theme.textSecondary, 
            '&:hover': { background: "white", color: theme.text } 
          }}
        >
          <HomeIcon />
        </IconButton>
        <Toaster position="top-right" />
        <Container maxWidth="xs">
          <MotionPaper
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            sx={{
              p: 4,
              background: theme.paper,
              backdropFilter: "blur(16px)",
              border: `1px solid ${theme.border}`,
              borderRadius: 4,
              boxShadow: theme.glassShadow,
              textAlign: "center",
            }}
          >
            <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
              <Box sx={{ p: 2, borderRadius: "50%", background: theme.primary, color: "white", boxShadow: "0 4px 15px rgba(14, 165, 233, 0.4)" }}>
                <LockOutlinedIcon sx={{ fontSize: 32 }} />
              </Box>
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: theme.text, mb: 1 }}>
              Welcome Back
            </Typography>
            <Typography variant="body2" sx={{ color: theme.textSecondary, mb: 4 }}>
              Sign in to manage your institution.
            </Typography>

            <Box component="form" onSubmit={handleLogin}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Username"
                  variant="outlined"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  sx={{ '& .MuiInputLabel-root': { fontWeight: 500 } }}
                />
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }
                  }}
                  sx={{ '& .MuiInputLabel-root': { fontWeight: 500 } }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  sx={{
                    background: theme.primary,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 700,
                    fontSize: "1rem",
                    transition: "all 0.3s",
                    "&:hover": {
                      background: theme.primaryHover,
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 20px rgba(99, 102, 241, 0.4)",
                    },
                  }}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </Button>
              </Stack>
            </Box>

            <Typography variant="body2" sx={{ mt: 4, color: theme.textSecondary, fontWeight: 500 }}>
              Don&apos;t have an account?{" "}
              <Link href="/register" passHref style={{ color: "#0ea5e9", textDecoration: "none", fontWeight: 700 }}>
                Register here
              </Link>
            </Typography>
          </MotionPaper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
