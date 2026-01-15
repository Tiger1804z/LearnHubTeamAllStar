import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LearnerDashboard from "./pages/LearnerDashboard";



export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Accueil */}
        <Route path="/" element={<Home />} />

        {/* Catalogue des parcours */}
        <Route path="/courses" element={<Courses />} />

        {/* Détail d’un parcours */}
        <Route path="/courses/:id" element={<CourseDetail />} />

        {/* Authentification */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<div className="container">Catalogue</div>} />
        <Route path="/dashboard" element={<LearnerDashboard />} />
      </Routes>
    </>
  );
}
