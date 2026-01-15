import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login";
import Register from "./pages/Register";


export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<div className="container">Catalogue</div>} />
        <Route path="/dashboard" element={<div className="container">Dashboard</div>} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<div className="container">Catalogue</div>} />
        <Route path="/dashboard" element={<div className="container">Dashboard</div>} />
      </Routes>
    </>
  );
}
