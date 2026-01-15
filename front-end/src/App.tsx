import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";

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

        {/* Tableau de bord (UI seulement pour l’instant) */}
        <Route
          path="/dashboard"
          element={<div className="container">Dashboard</div>}
        />
      </Routes>
    </>
  );
}
