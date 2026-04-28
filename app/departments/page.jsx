"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Stack,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  Chip,
  Paper,
  Grid,
  Avatar,
  IconButton,
  Switch,
  FormControlLabel,
  InputAdornment,
  Divider,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DateRangeIcon from "@mui/icons-material/DateRange";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WcIcon from "@mui/icons-material/Wc";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import InboxIcon from "@mui/icons-material/Inbox";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Outfit } from "next/font/google";
import { useRouter } from "next/navigation";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

const STATUS = ["In Progress", "Dropped", "Completed"];
const API_URL = "http://localhost:5000/api";

const lightTheme = {
  bg: "linear-gradient(135deg, #f0fdfa, #e0f2fe)", 
  paper: "rgba(255, 255, 255, 0.75)",
  text: "#0f172a",
  textSecondary: "#64748b",
  card: "rgba(255, 255, 255, 0.45)",
  border: "rgba(255, 255, 255, 0.6)",
  primary: "linear-gradient(135deg, #0ea5e9, #6366f1)", 
  primaryHover: "linear-gradient(135deg, #0284c7, #4f46e5)",
  glassShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.1)",
};

const darkTheme = {
  bg: "linear-gradient(135deg, #020617, #0f172a)",
  paper: "rgba(15, 23, 42, 0.65)",
  text: "#f8fafc",
  textSecondary: "#94a3b8",
  card: "rgba(30, 41, 59, 0.5)",
  border: "rgba(255, 255, 255, 0.05)",
  primary: "linear-gradient(135deg, #3b82f6, #8b5cf6)", 
  primaryHover: "linear-gradient(135deg, #2563eb, #7c3aed)",
  glassShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.5)",
};

const MotionPaper = motion(Paper);
const MotionGrid = motion(Grid);

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300 } },
};

export default function BatchStudentDashboard() {
  const [batches, setBatches] = useState([]);
  const [activeBatchId, setActiveBatchId] = useState(null);
  const [students, setStudents] = useState([]);
  const [messages, setMessages] = useState([]);
  const [inboxOpen, setInboxOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [openBatch, setOpenBatch] = useState(false);
  const [openStudent, setOpenStudent] = useState(false);
  const [statusFilter, setStatusFilter] = useState(new Set());
  const [darkMode, setDarkMode] = useState(false);
  const [statusValue, setStatusValue] = useState("In Progress");
  const [studentImage, setStudentImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [editingBatch, setEditingBatch] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [viewingStudent, setViewingStudent] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const theme = darkMode ? darkTheme : lightTheme;

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return {};
    }
    return { Authorization: `Bearer ${token}` };
  };

  const fetchData = async () => {
    try {
      const headers = getAuthHeaders();
      if (!headers.Authorization) return;
      
      const [batchesRes, studentsRes, messagesRes] = await Promise.all([
        fetch(`${API_URL}/batches`, { headers }),
        fetch(`${API_URL}/students`, { headers }),
        fetch(`${API_URL}/messages`, { headers })
      ]);
      if (batchesRes.ok && studentsRes.ok) {
        const batchesData = await batchesRes.json();
        const studentsData = await studentsRes.json();
        const messagesData = messagesRes.ok ? await messagesRes.json() : [];
        setBatches(batchesData);
        setStudents(studentsData);
        setMessages(messagesData);
      } else if (batchesRes.status === 401 || batchesRes.status === 403) {
        localStorage.removeItem("token");
        router.push("/login");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchData();
  }, []);

  useEffect(() => {
    if (!activeBatchId) {
      setActiveBatchId("ALL");
    }
  }, [batches, activeBatchId]);

  const activeBatch = batches.find((b) => b.id === activeBatchId) || null;
  const studentsForActive = activeBatchId === "ALL" ? students : students.filter((s) => s.batchId === activeBatchId);
  const filteredStudents = studentsForActive.filter((s) =>
    statusFilter.size === 0 ? true : statusFilter.has(s.status)
  );

  const statusCount = (status) =>
    studentsForActive.filter((s) => s.status === status).length;

  const toggleStatusFilter = (status) => {
    const next = new Set(statusFilter);
    next.has(status) ? next.delete(status) : next.add(status);
    setStatusFilter(next);
  };

  const handleSaveBatch = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = fd.get("batchName")?.trim() || "";
    const date = fd.get("batchDate")?.trim() || "";

    const newErrors = {};
    if (!name) newErrors.batchName = "Batch Name is required";
    if (!date) newErrors.batchDate = "Date is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please resolve highlighted errors");
      return;
    }
    setErrors({});

    const batchData = { name, date };

    try {
      if (editingBatch) {
        const res = await fetch(`${API_URL}/batches/${editingBatch.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", ...getAuthHeaders() },
          body: JSON.stringify(batchData),
        });
        if (res.ok) {
          const updated = await res.json();
          setBatches((p) => p.map((b) => (b.id === updated.id ? updated : b)));
          setOpenBatch(false);
          setEditingBatch(null);
          toast.success("Batch updated successfully!");
        } else {
          const errorData = await res.json();
          toast.error(errorData.error || "Failed to update batch");
        }
      } else {
        batchData.id = Date.now().toString();
        const res = await fetch(`${API_URL}/batches`, {
          method: "POST",
          headers: { "Content-Type": "application/json", ...getAuthHeaders() },
          body: JSON.stringify(batchData),
        });
        if (res.ok) {
          const added = await res.json();
          setBatches((p) => [added, ...p]);
          setActiveBatchId(added.id);
          setOpenBatch(false);
          toast.success("Batch created successfully!");
        } else {
          const errorData = await res.json();
          toast.error(errorData.error || "Failed to create batch");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error saving batch");
    }
  };

  const handleDeleteBatch = (id) => {
    setDeleteTarget({ id, type: "batch" });
  };

  const handleDeleteStudent = (id) => {
    setDeleteTarget({ id, type: "student" });
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const { id, type } = deleteTarget;
    setDeleteTarget(null);

    try {
      if (type === "batch") {
        const res = await fetch(`${API_URL}/batches/${id}`, { method: "DELETE", headers: getAuthHeaders() });
        if (res.ok) {
          setBatches((p) => p.filter((b) => b.id !== id));
          setStudents((s) => s.filter((st) => st.batchId !== id));
          if (activeBatchId === id) setActiveBatchId(null);
          toast.success("Batch deleted");
        } else {
          toast.error("Failed to delete batch");
        }
      } else if (type === "student") {
        const res = await fetch(`${API_URL}/students/${id}`, { method: "DELETE", headers: getAuthHeaders() });
        if (res.ok) {
          setStudents((p) => p.filter((s) => s.id !== id));
          toast.success("Student deleted");
        } else {
          toast.error("Failed to delete student");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error(`Network error deleting ${type}`);
    }
  };

  const handleSaveStudent = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const nameStr = fd.get("name")?.trim() || "";
    const admStr = fd.get("admission")?.trim() || "";

    const newErrors = {};
    if (!nameStr) newErrors.name = "Required field";
    if (!admStr) newErrors.admission = "Required field";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill the required student fields");
      return;
    }
    setErrors({});

    const submitData = new FormData();

    submitData.append("admission", admStr);
    submitData.append("name", nameStr);
    submitData.append("initial", fd.get("initial") || "");
    submitData.append("father", fd.get("father") || "");
    submitData.append("district", fd.get("district") || "");
    submitData.append("place", fd.get("place") || "");
    submitData.append("phone", fd.get("phone") || "");
    submitData.append("whatsapp", fd.get("whatsapp") || "");
    submitData.append("guardian", fd.get("guardian") || "");
    submitData.append("status", statusValue);
    submitData.append(
      "year",
      (statusValue === "Completed" || statusValue === "Dropped") ? (fd.get("year") || "") : ""
    );
    submitData.append("batchId", editingStudent ? editingStudent.batchId : activeBatchId);

    if (studentImage) {
      submitData.append("image", studentImage);
    }

    try {
      if (editingStudent) {
        const res = await fetch(`${API_URL}/students/${editingStudent.id}`, {
          method: "PUT",
          headers: getAuthHeaders(),
          body: submitData,
        });
        if (res.ok) {
          const updated = await res.json();
          setStudents((p) => p.map((s) => (s.id === updated.id ? updated : s)));
          setOpenStudent(false);
          setEditingStudent(null);
          toast.success("Student details updated!");
          setStudentImage(null);
          setPreviewImage(null);
        } else {
          const errorData = await res.json();
          toast.error(errorData.error || "Failed to update student");
        }
      } else {
        submitData.append("id", Date.now().toString());
        const res = await fetch(`${API_URL}/students`, {
          method: "POST",
          headers: getAuthHeaders(),
          body: submitData,
        });
        if (res.ok) {
          const added = await res.json();
          setStudents((p) => [added, ...p]);
          setOpenStudent(false);
          toast.success("Student added successfully!");
          setStudentImage(null);
          setPreviewImage(null);
        } else {
          const errorData = await res.json();
          toast.error(errorData.error || "Failed to add student");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error saving student");
    }
  };



  const openCreateBatch = () => {
    setEditingBatch(null);
    setErrors({});
    setOpenBatch(true);
  };

  const openCreateStudent = () => {
    setEditingStudent(null);
    setStatusValue("In Progress");
    setStudentImage(null);
    setPreviewImage(null);
    setErrors({});
    setOpenStudent(true);
  };

  const openEditBatch = (b, e) => {
    e.stopPropagation();
    setEditingBatch(b);
    setErrors({});
    setOpenBatch(true);
  };

  const openEditStudent = (st, e) => {
    e.stopPropagation();
    setEditingStudent(st);
    setStatusValue(st.status || "In Progress");
    setStudentImage(null);
    setPreviewImage(st.image ? `${API_URL.replace('/api', '')}${st.image}` : null);
    setErrors({});
    setOpenStudent(true);
  };

  const DISTRICTS = [
    "Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam",
    "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram",
    "Thrissur", "Wayanad",
  ];

  const currentYear = new Date().getFullYear();
  const YEARS = Array.from({ length: 50 }, (_, i) => currentYear - i);

  const getStatusColor = (status) => {
    switch(status) {
      case "Completed": return "#10b981"; // Emerald
      case "Dropped": return "#ef4444"; // Red
      default: return "#3b82f6"; // Blue
    }
  };

  if (!mounted) return null;

  const glassStyle = {
    background: theme.paper,
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: `1px solid ${theme.border}`,
    boxShadow: theme.glassShadow,
    borderRadius: 4,
  };

  const muiTheme = createTheme({
    palette: { mode: darkMode ? "dark" : "light" },
    typography: { fontFamily: outfit.style.fontFamily },
  });

  const handleDeleteMessage = async (id) => {
    try {
      const headers = getAuthHeaders();
      const res = await fetch(`${API_URL}/messages/${id}`, { method: "DELETE", headers });
      if (res.ok) {
        setMessages(messages.filter((m) => m.id !== id));
        toast.success("Message archived");
      }
    } catch (err) {
      toast.error("Failed to delete message");
    }
  };

  return (
    <ThemeProvider theme={muiTheme}>
    <Box sx={{ minHeight: "100vh", background: theme.bg, color: theme.text, py: 6, transition: "background 0.4s ease" }}>
      <Toaster position="top-right" toastOptions={{ style: { background: theme.paper, color: theme.text, backdropFilter: 'blur(10px)', border: `1px solid ${theme.border}` } }} />
      <Container maxWidth="xl">
        <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "center" }} mb={4} spacing={3}>
          <Typography variant="h4" fontWeight={900} letterSpacing="-0.5px">
            Institution Hub
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" useFlexGap sx={{ width: { xs: "100%", md: "auto" } }}>
            <Button
              variant="outlined"
              startIcon={<HomeIcon />}
              onClick={() => router.push("/")}
              sx={{ color: theme.text, borderColor: theme.border, '&:hover': { borderColor: theme.text, background: 'rgba(255,255,255,0.05)' } }}
            >
              Home
            </Button>
            <IconButton 
              onClick={() => setInboxOpen(true)}
              sx={{ color: theme.text, border: `1px solid ${theme.border}`, borderRadius: 2 }}
            >
              <Badge badgeContent={messages.length} color="error">
                <InboxIcon />
              </Badge>
            </IconButton>
            <Button
              variant="outlined"
              startIcon={<LogoutIcon />}
              onClick={() => { localStorage.removeItem("token"); router.push("/login"); }}
              sx={{ color: "#ef4444", borderColor: "#ef4444", '&:hover': { background: "rgba(239, 68, 68, 0.1)" } }}
            >
              Logout
            </Button>
            <FormControlLabel
              control={<Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} color="primary" />}
              label="Dark Mode"
              sx={{ m: 0, fontWeight: 600 }}
            />
          </Stack>
        </Stack>
        
        <Stack direction={{ xs: "column", lg: "row" }} spacing={4}>
          
          {/* SIDEBAR: BATCHES */}
          <Box sx={{ width: { xs: "100%", lg: 340 } }}>
            <MotionPaper sx={{ p: 3, ...glassStyle }} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h6" fontWeight={800} color={theme.text}>
                  Batches
                </Typography>
                <Button 
                  onClick={openCreateBatch}
                  variant="contained" 
                  size="small"
                  sx={{ background: theme.primary, borderRadius: 2, '&:hover': { background: theme.primaryHover } }}
                >
                  <AddIcon fontSize="small" /> New
                </Button>
              </Stack>

              <Stack spacing={2}>
                <MotionPaper
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveBatchId("ALL")}
                  sx={{
                    p: 2.5,
                    cursor: "pointer",
                    background: activeBatchId === "ALL" ? theme.primary : theme.card,
                    border: `1px solid ${activeBatchId === "ALL" ? 'transparent' : theme.border}`,
                    borderRadius: 3,
                    display: "flex",
                    alignItems: "center",
                    color: activeBatchId === "ALL" ? "#fff" : theme.text,
                    boxShadow: activeBatchId === "ALL" ? "0 4px 20px rgba(59,130,246,0.4)" : "none",
                    transition: "background 0.3s ease, border 0.3s ease",
                  }}
                >
                  <Typography fontWeight={800} fontSize={16}>🌐 All Students Overview</Typography>
                </MotionPaper>

                {batches.length === 0 && (
                  <Typography fontSize={13} color={theme.textSecondary} textAlign="center" py={2}>
                    No batches created yet.
                  </Typography>
                )}
                {batches.map((b) => (
                  <MotionPaper
                    key={b.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveBatchId(b.id)}
                    sx={{
                      p: 2.5,
                      cursor: "pointer",
                      background: b.id === activeBatchId ? theme.primary : theme.card,
                      border: `1px solid ${b.id === activeBatchId ? 'transparent' : theme.border}`,
                      borderRadius: 3,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      color: b.id === activeBatchId ? "#fff" : theme.text,
                      boxShadow: b.id === activeBatchId ? "0 4px 20px rgba(59,130,246,0.4)" : "none",
                      transition: "background 0.3s ease, border 0.3s ease",
                    }}
                  >
                    <Box>
                      <Typography fontWeight={800} fontSize={16}>
                        {b.name}
                      </Typography>
                      <Stack direction="row" spacing={0.5} alignItems="center" mt={0.5} sx={{ opacity: 0.8 }}>
                        <DateRangeIcon sx={{ fontSize: 13 }} />
                        <Typography fontSize={12} fontWeight={500}>
                          {b.date}
                        </Typography>
                      </Stack>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      <IconButton 
                        size="small" 
                        onClick={(e) => openEditBatch(b, e)} 
                        sx={{ color: 'inherit', opacity: 0.7, '&:hover': { opacity: 1, bgcolor: 'rgba(255,255,255,0.1)' } }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={(e) => { e.stopPropagation(); handleDeleteBatch(b.id); }} 
                        sx={{ color: '#ef4444', opacity: 0.8, '&:hover': { opacity: 1, bgcolor: 'rgba(239, 68, 68, 0.1)' } }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </MotionPaper>
                ))}
              </Stack>
            </MotionPaper>
          </Box>

          {/* MAIN DASHBOARD: STUDENTS */}
          <Box sx={{ flex: 1 }}>
            <MotionPaper sx={{ p: { xs: 2, md: 4 }, minHeight: '80vh', ...glassStyle }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Stack spacing={4}>
                <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} spacing={2}>
                  <Box>
                    <Typography variant="h4" fontWeight={900} letterSpacing="-1px">
                      {activeBatchId === "ALL" ? "All Enrolled Students" : activeBatch?.name || "Select a Batch"}
                    </Typography>
                    {activeBatch && (
                      <Typography variant="body2" color={theme.textSecondary} fontWeight={500} mt={0.5}>
                        Managing students for this session.
                      </Typography>
                    )}
                  </Box>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    disabled={!activeBatch}
                    onClick={openCreateStudent}
                    sx={{ background: theme.primary, px: 3, py: 1, borderRadius: 2, '&:hover': { background: theme.primaryHover } }}
                  >
                    Add Student
                  </Button>
                </Stack>

                {/* FILTERS */}
                {(activeBatch || activeBatchId === "ALL") && (
                  <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap sx={{ mt: 2 }}>
                    <Chip
                      label={`All (${studentsForActive.length})`}
                      onClick={() => setStatusFilter(new Set())}
                      sx={{ 
                        fontWeight: 600, 
                        background: statusFilter.size === 0 ? theme.primary : theme.card, 
                        color: statusFilter.size === 0 ? "#fff" : theme.text,
                        border: `1px solid ${theme.border}`,
                        '&:hover': { background: statusFilter.size === 0 ? theme.primaryHover : 'rgba(255,255,255,0.2)' }
                      }}
                    />
                    {STATUS.map((s) => (
                      <Chip
                        key={s}
                        label={`${s} (${statusCount(s)})`}
                        clickable
                        onClick={() => toggleStatusFilter(s)}
                        sx={{
                          fontWeight: 600,
                          background: statusFilter.has(s) ? theme.primary : theme.card,
                          color: statusFilter.has(s) ? "#fff" : theme.text,
                          border: `1px solid ${theme.border}`,
                          '&:hover': { background: statusFilter.has(s) ? theme.primaryHover : 'rgba(255,255,255,0.2)' }
                        }}
                      />
                    ))}
                  </Stack>
                )}

                {/* STUDENT GRID */}
                <motion.div variants={containerVariants} initial="hidden" animate="show">
                  <Grid container spacing={3}>
                    {(activeBatch || activeBatchId === "ALL") && filteredStudents.length === 0 && (
                      <Grid item xs={12}>
                        <Box py={8} textAlign="center" sx={{ opacity: 0.5 }}>
                          <WcIcon sx={{ fontSize: 60, mb: 2 }} />
                          <Typography variant="h6">No students found matching your filters.</Typography>
                        </Box>
                      </Grid>
                    )}
                    {filteredStudents.map((st) => (
                      <MotionGrid item xs={12} sm={6} xl={4} key={st.id} variants={itemVariants}>
                        <Paper 
                          sx={{ 
                            p: 3, 
                            cursor: "pointer", 
                            background: theme.card,
                            border: `1px solid ${theme.border}`,
                            borderRadius: 4,
                            backdropFilter: "blur(10px)",
                            transition: "all 0.3s ease",
                            position: "relative",
                            overflow: "hidden",
                            "&:hover": { 
                              transform: "translateY(-4px)", 
                              boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
                              borderColor: "rgba(139, 92, 246, 0.5)"
                            } 
                          }}
                          onClick={() => setViewingStudent(st)}
                        >
                          {/* Accent line indicating status */}
                          <Box sx={{ position: "absolute", top: 0, left: 0, w: '100%', height: 4, width: '100%', bgcolor: getStatusColor(st.status) }} />
                          
                          <Stack direction="row" spacing={2.5} alignItems="center">
                            <Avatar
                              src={st.image ? `${API_URL.replace('/api', '')}${st.image}` : undefined}
                              alt={st.name}
                              sx={{ 
                                width: 70, height: 70, 
                                border: `2px solid ${getStatusColor(st.status)}`,
                                boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                              }}
                            >
                              <Typography fontWeight={800} fontSize={24}>{st.name ? st.name[0] : "S"}</Typography>
                            </Avatar>

                            <Box sx={{ flex: 1, minWidth: 0 }}>
                              <Typography fontWeight={800} color={theme.text} noWrap sx={{ fontSize: '1.1rem' }}>
                                {st.name} <span style={{ opacity: 0.7, fontWeight: 500 }}>{st.initial}</span>
                              </Typography>
                              <Typography fontSize={13} color={theme.textSecondary} fontWeight={600} mt={0.5}>
                                # {st.admission}
                              </Typography>
                              {st.year && (
                                <Typography fontSize={12} color={theme.textSecondary} mt={0.2}>
                                  Class of {st.year}
                                </Typography>
                              )}
                            </Box>
                          </Stack>

                          <Divider sx={{ my: 2, borderColor: theme.border, opacity: 0.5 }} />

                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Chip 
                              label={st.status} 
                              size="small" 
                              sx={{ 
                                fontWeight: 700, 
                                fontSize: '0.75rem',
                                color: "#fff",
                                bgcolor: getStatusColor(st.status)
                              }} 
                            />
                            <Stack direction="row" spacing={0.5}>
                              <IconButton 
                                size="small" 
                                sx={{ color: theme.textSecondary, '&:hover': { color: theme.text, bgcolor: 'rgba(255,255,255,0.1)' } }}
                                onClick={(e) => openEditStudent(st, e)}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                              <IconButton 
                                size="small" 
                                sx={{ color: "#ef4444", '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.1)' } }}
                                onClick={(e) => { e.stopPropagation(); handleDeleteStudent(st.id); }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Stack>
                          </Stack>
                        </Paper>
                      </MotionGrid>
                    ))}
                  </Grid>
                </motion.div>
              </Stack>
            </MotionPaper>
          </Box>
        </Stack>
      </Container>


      {/* CREATION DIALOGS WITH BLURRED BACKDROPS */}
      
      <Dialog 
        open={openBatch} 
        onClose={() => setOpenBatch(false)}
        PaperProps={{ sx: { background: theme.paper, backdropFilter: "blur(20px)", color: theme.text, borderRadius: 4, border: `1px solid ${theme.border}`, boxShadow: theme.glassShadow } }}
        slotProps={{ backdrop: { sx: { backdropFilter: 'blur(5px)' } } }}
      >
        <DialogTitle sx={{ fontWeight: 800 }}>{editingBatch ? "Edit Batch Details" : "Create New Batch"}</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSaveBatch} sx={{ mt: 1 }} key={editingBatch ? editingBatch.id : "new_batch"}>
            <TextField
              name="batchName" label="Batch Name" fullWidth
              defaultValue={editingBatch ? editingBatch.name : ""}
              error={!!errors.batchName} helperText={errors.batchName}
              InputLabelProps={{ style: { color: theme.textSecondary } }}
              InputProps={{ style: { color: theme.text } }}
              sx={{ mb: 3 }}
            />
            <TextField
              name="batchDate" type="date" fullWidth
              defaultValue={editingBatch ? editingBatch.date : new Date().toISOString().split("T")[0]}
              error={!!errors.batchDate} helperText={errors.batchDate}
              InputLabelProps={{ style: { color: theme.textSecondary } }}
              InputProps={{ style: { color: theme.text } }}
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, py: 1.5, borderRadius: 2, background: theme.primary, fontWeight: 700 }}>
              {editingBatch ? "Save Changes" : "Create Batch"}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openStudent} onClose={() => setOpenStudent(false)} maxWidth="md" fullWidth
        PaperProps={{ sx: { background: theme.paper, backdropFilter: "blur(20px)", color: theme.text, borderRadius: 4, border: `1px solid ${theme.border}`, boxShadow: theme.glassShadow } }}
        slotProps={{ backdrop: { sx: { backdropFilter: 'blur(5px)' } } }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: '1.5rem', pb: 1 }}>
          {editingStudent ? "Edit Student Profile" : "Enroll New Student"}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSaveStudent} sx={{ mt: 1 }} key={editingStudent ? editingStudent.id : "new_student"}>
            <Stack spacing={3}>
              
              <Paper sx={{ p: 3, background: theme.card, backdropFilter: "blur(10px)", border: `1px solid ${theme.border}`, borderRadius: 3 }}>
                <Typography fontWeight={800} color={theme.text} mb={2} variant="subtitle1">Personal Information</Typography>
                <Grid container spacing={2.5}>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField name="admission" label="Admission Number" fullWidth defaultValue={editingStudent?.admission || ""} error={!!errors.admission} helperText={errors.admission} InputLabelProps={{ style: { color: theme.textSecondary } }} InputProps={{ style: { color: theme.text } }} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField name="name" label="First Name" fullWidth defaultValue={editingStudent?.name || ""} error={!!errors.name} helperText={errors.name} InputLabelProps={{ style: { color: theme.textSecondary } }} InputProps={{ style: { color: theme.text } }} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField name="initial" label="Last Name / Initial" fullWidth defaultValue={editingStudent?.initial || ""} InputLabelProps={{ style: { color: theme.textSecondary } }} InputProps={{ style: { color: theme.text } }} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField name="father" label="Father's Name" fullWidth defaultValue={editingStudent?.father || ""} InputLabelProps={{ style: { color: theme.textSecondary } }} InputProps={{ style: { color: theme.text } }} />
                  </Grid>
                </Grid>
              </Paper>

              <Paper sx={{ p: 3, background: theme.card, backdropFilter: "blur(10px)", border: `1px solid ${theme.border}`, borderRadius: 3 }}>
                <Typography fontWeight={800} color={theme.text} mb={2} variant="subtitle1">Contact & Address</Typography>
                <Grid container spacing={2.5}>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      name="district" select label="District" fullWidth
                      defaultValue={editingStudent?.district || ""}
                      InputLabelProps={{ style: { color: theme.textSecondary }, shrink: true }}
                      SelectProps={{ displayEmpty: true, sx: { color: theme.text, ".MuiSelect-icon": { color: theme.textSecondary } } }}
                    >
                      <MenuItem value="" disabled>Select District</MenuItem>
                      {DISTRICTS.map((d) => (<MenuItem key={d} value={d}>{d}</MenuItem>))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6} md={8}>
                    <TextField name="place" label="City / Place / Address Details" fullWidth defaultValue={editingStudent?.place || ""} InputLabelProps={{ style: { color: theme.textSecondary } }} InputProps={{ style: { color: theme.text } }} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField name="phone" label="Primary Phone" fullWidth defaultValue={editingStudent?.phone || ""} InputProps={{ startAdornment: <InputAdornment position="start"><PhoneIcon sx={{ color: theme.textSecondary, fontSize: 18 }} /></InputAdornment>, style: { color: theme.text } }} InputLabelProps={{ style: { color: theme.textSecondary } }} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField name="whatsapp" label="WhatsApp" fullWidth defaultValue={editingStudent?.whatsapp || ""} InputLabelProps={{ style: { color: theme.textSecondary } }} InputProps={{ style: { color: theme.text } }} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField name="guardian" label="Guardian Phone" fullWidth defaultValue={editingStudent?.guardian || ""} InputLabelProps={{ style: { color: theme.textSecondary } }} InputProps={{ style: { color: theme.text } }} />
                  </Grid>
                </Grid>
              </Paper>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3, height: '100%', background: theme.card, backdropFilter: "blur(10px)", border: `1px solid ${theme.border}`, borderRadius: 3 }}>
                    <Typography fontWeight={800} color={theme.text} mb={2} variant="subtitle1">Academic Status</Typography>
                    <Stack spacing={2.5}>
                      <TextField
                        name="status" select fullWidth value={statusValue}
                        onChange={(e) => setStatusValue(e.target.value)}
                        InputLabelProps={{ style: { color: theme.textSecondary } }}
                        SelectProps={{ sx: { color: theme.text, ".MuiSelect-icon": { color: theme.textSecondary } } }}
                      >
                        {STATUS.map((s) => (<MenuItem key={s} value={s}>{s}</MenuItem>))}
                      </TextField>
                      {(statusValue === "Completed" || statusValue === "Dropped") && (
                        <TextField
                          name="year" select defaultValue={editingStudent?.year || ""} fullWidth
                          label={statusValue === "Completed" ? "Year of Completion" : "Year Dropped"}
                          InputLabelProps={{ style: { color: theme.textSecondary } }}
                          SelectProps={{ sx: { color: theme.text, ".MuiSelect-icon": { color: theme.textSecondary } } }}
                        >
                          <MenuItem value="" disabled>Select Year</MenuItem>
                          {YEARS.map((y) => (<MenuItem key={y} value={y}>{y}</MenuItem>))}
                        </TextField>
                      )}
                    </Stack>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3, height: '100%', background: theme.card, backdropFilter: "blur(10px)", border: `1px solid ${theme.border}`, borderRadius: 3 }}>
                    <Typography fontWeight={800} color={theme.text} mb={2} variant="subtitle1">Profile Picture</Typography>
                    <Stack spacing={3} direction="row" alignItems="center">
                      <Button variant="outlined" component="label" sx={{ color: theme.text, borderColor: theme.border, py: 1.5, px: 3, borderRadius: 2, '&:hover': { borderColor: theme.text, bgcolor: 'rgba(255,255,255,0.05)' } }}>
                        Choose File
                        <input
                          type="file" accept="image/*" hidden
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              setStudentImage(file);
                              setPreviewImage(URL.createObjectURL(file));
                            }
                          }}
                        />
                      </Button>
                      {previewImage ? (
                        <Avatar src={previewImage} sx={{ width: 80, height: 80, boxShadow: theme.glassShadow }} />
                      ) : (
                        <Avatar sx={{ width: 80, height: 80, bgcolor: 'rgba(255,255,255,0.1)' }}>Photo</Avatar>
                      )}
                    </Stack>
                  </Paper>
                </Grid>
              </Grid>

              <Button type="submit" variant="contained" fullWidth sx={{ py: 1.5, borderRadius: 3, fontSize: '1.1rem', fontWeight: 800, background: theme.primary, '&:hover': { background: theme.primaryHover }}}>
                {editingStudent ? "Save Student Details" : "Enroll Student"}
              </Button>
            </Stack>
          </Box>
        </DialogContent>
      </Dialog>
      
      {/* PROFESSIONAL DETAILS POPUP VIEW */}
      <Dialog 
        open={Boolean(viewingStudent)} 
        onClose={() => setViewingStudent(null)}
        maxWidth="sm" fullWidth
        PaperProps={{ sx: { background: theme.paper, backdropFilter: "blur(25px)", color: theme.text, borderRadius: 4, border: `1px solid ${theme.border}`, boxShadow: theme.glassShadow } }}
        slotProps={{ backdrop: { sx: { backdropFilter: 'blur(8px)' } } }}
      >
        {viewingStudent && (
          <>
            <Box sx={{ position: 'relative', height: 120, background: theme.primary, borderTopLeftRadius: 16, borderTopRightRadius: 16, overflow: 'hidden' }}>
              <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5))' }} />
              <Chip 
                label={viewingStudent.status} 
                sx={{ position: 'absolute', top: 16, right: 16, fontWeight: 700, bgcolor: getStatusColor(viewingStudent.status), color: '#fff' }} 
              />
            </Box>
            
            <DialogContent sx={{ px: 4, pb: 4, pt: 0, mt: '-50px' }}>
              <Stack direction="row" spacing={3} alignItems="flex-end" mb={4}>
                <Avatar 
                  src={viewingStudent.image ? `${API_URL.replace('/api', '')}${viewingStudent.image}` : undefined}
                  sx={{ width: 110, height: 110, border: `4px solid ${theme.paper}`, boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}
                >
                  <Typography variant="h3" fontWeight={800}>{viewingStudent.name ? viewingStudent.name[0] : "S"}</Typography>
                </Avatar>
                <Box mb={1}>
                  <Typography variant="h4" fontWeight={900} letterSpacing="-1px">
                    {viewingStudent.name} <span style={{ opacity: 0.7, fontWeight: 500 }}>{viewingStudent.initial}</span>
                  </Typography>
                  <Typography variant="subtitle1" fontWeight={600} color={theme.textSecondary}>
                    Admission #{viewingStudent.admission || "N/A"}
                  </Typography>
                </Box>
              </Stack>
              
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="overline" color={theme.textSecondary} fontWeight={800} letterSpacing="1px">Contact Details</Typography>
                  <Divider sx={{ mb: 2, borderColor: theme.border }} />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <PhoneIcon sx={{ color: theme.textSecondary, fontSize: 18 }} />
                    <Box>
                      <Typography variant="caption" color={theme.textSecondary} display="block">Phone</Typography>
                      <Typography fontWeight={600}>{viewingStudent.phone || "N/A"}</Typography>
                    </Box>
                  </Stack>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Box>
                    <Typography variant="caption" color={theme.textSecondary} display="block">WhatsApp</Typography>
                    <Typography fontWeight={600}>{viewingStudent.whatsapp || "N/A"}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box>
                    <Typography variant="caption" color={theme.textSecondary} display="block">Guardian Phone</Typography>
                    <Typography fontWeight={600}>{viewingStudent.guardian || "N/A"}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Stack direction="row" spacing={1} alignItems="flex-start" mt={1}>
                    <LocationOnIcon sx={{ color: theme.textSecondary, fontSize: 18, mt: 0.2 }} />
                    <Box>
                      <Typography variant="caption" color={theme.textSecondary} display="block">Address</Typography>
                      <Typography fontWeight={600}>{viewingStudent.place || "N/A"}, {viewingStudent.district || "N/A"}</Typography>
                    </Box>
                  </Stack>
                </Grid>

                <Grid item xs={12} mt={1}>
                  <Typography variant="overline" color={theme.textSecondary} fontWeight={800} letterSpacing="1px">Background Info</Typography>
                  <Divider sx={{ mb: 2, borderColor: theme.border }} />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color={theme.textSecondary} display="block">Father's Name</Typography>
                  <Typography fontWeight={600}>{viewingStudent.father || "N/A"}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color={theme.textSecondary} display="block">
                    {viewingStudent.status === "Completed" ? "Year Completed" : 
                     viewingStudent.status === "Dropped" ? "Year Dropped" : "Progress"}
                  </Typography>
                  <Typography fontWeight={600}>{viewingStudent.year || "Ongoing"}</Typography>
                </Grid>
              </Grid>
            </DialogContent>

            <Box p={3} pt={0} display="flex" justifyContent="flex-end" gap={2}>
               <Button variant="outlined" sx={{ borderColor: theme.border, color: theme.text, borderRadius: 2, '&:hover': { borderColor: theme.text } }} onClick={() => {
                 setViewingStudent(null);
                 openEditStudent(viewingStudent, {stopPropagation: ()=>{}});
               }}>
                 Edit Student
               </Button>
               <Button variant="contained" sx={{ background: theme.primary, borderRadius: 2 }} onClick={() => setViewingStudent(null)}>
                 Close Profile
               </Button>
            </Box>
          </>
        )}
      </Dialog>

      {/* DELETE CONFIRMATION DIALOG */}
      <Dialog 
        open={Boolean(deleteTarget)} 
        onClose={() => setDeleteTarget(null)}
        PaperProps={{ sx: { background: theme.paper, backdropFilter: "blur(25px)", color: theme.text, borderRadius: 4, border: `1px solid ${theme.border}`, boxShadow: theme.glassShadow } }}
        slotProps={{ backdrop: { sx: { backdropFilter: 'blur(8px)' } } }}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 800 }}>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography color={theme.textSecondary} sx={{ mt: 1 }}>
            {deleteTarget?.type === "batch" 
              ? "Are you sure you want to delete this batch? All students enrolled in this batch will also be permanently deleted." 
              : "Are you sure you want to delete this student's profile permanently?"}
          </Typography>
        </DialogContent>
        <Box p={3} pt={0} display="flex" justifyContent="flex-end" gap={2}>
           <Button variant="outlined" sx={{ borderColor: theme.border, color: theme.text, borderRadius: 2 }} onClick={() => setDeleteTarget(null)}>
             Cancel
           </Button>
           <Button variant="contained" color="error" sx={{ borderRadius: 2 }} onClick={confirmDelete}>
             Yes, Delete
           </Button>
        </Box>
      </Dialog>

      {/* INBOX DRAWER */}
      <Drawer
        anchor="right"
        open={inboxOpen}
        onClose={() => setInboxOpen(false)}
        PaperProps={{
          sx: { width: { xs: "100%", sm: 400 }, background: theme.paper, color: theme.text, backdropFilter: 'blur(20px)' }
        }}
        slotProps={{ backdrop: { sx: { backdropFilter: 'blur(5px)' } } }}
      >
        <Box p={3} borderBottom={`1px solid ${theme.border}`} display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight={700}>Inquiries ({messages.length})</Typography>
          <IconButton onClick={() => setInboxOpen(false)} sx={{ color: theme.text }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List sx={{ p: 2, height: "100%", overflowY: "auto" }}>
          {messages.length === 0 ? (
            <Typography p={2} textAlign="center" color={theme.textSecondary}>No new messages.</Typography>
          ) : (
            messages.map((msg) => (
              <MotionPaper key={msg.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} sx={{ p: 2, mb: 2, background: theme.paper, border: `1px solid ${theme.border}`, borderRadius: 3, boxShadow: theme.glassShadow }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1}>
                  <Typography variant="subtitle2" fontWeight={800} fontSize="1rem">
                    {msg.firstName} {msg.lastName}
                  </Typography>
                  <Typography variant="caption" color={theme.textSecondary} sx={{ whiteSpace: "nowrap", ml: 2, mt: 0.5 }}>
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                  <EmailIcon sx={{ fontSize: 16, color: theme.textSecondary }} />
                  <Typography variant="caption" color={theme.textSecondary} sx={{ opacity: 0.9 }}>{msg.email}</Typography>
                </Stack>
                <Typography variant="body2" sx={{ background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)', p: 2, borderRadius: 2, mb: 2, lineHeight: 1.6 }}>
                  {msg.message}
                </Typography>
                <Button size="small" variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => handleDeleteMessage(msg.id)} sx={{ borderRadius: 2, width: '100%', textTransform: "none", py: 1 }}>
                  Archive Message
                </Button>
              </MotionPaper>
            ))
          )}
        </List>
      </Drawer>
    </Box>
    </ThemeProvider>
  );
}
