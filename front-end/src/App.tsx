import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import Home from "./pages/Home.tsx";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<div className="container">Catalogue</div>} />
        <Route path="/dashboard" element={<div className="container">Dashboard</div>} />
      </Routes>
    </>
  );
}
