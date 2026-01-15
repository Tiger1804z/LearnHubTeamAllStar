import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Lesson from "./pages/Lesson";
import CreateCourse from "./pages/CreateCourse";
import CreatorDashboard from "./pages/CreatorDashboard";
import Forum from "./pages/Forum";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Apprenant */}
        <Route path="/learn/:courseId/:lessonId" element={<Lesson />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Créateur */}
        <Route path="/create-course" element={<CreateCourse />} />
        <Route path="/creator-dashboard" element={<CreatorDashboard />} />

        {/* Communauté */}
        <Route path="/forum" element={<Forum />} />
      </Routes>
    </>
  );
}
