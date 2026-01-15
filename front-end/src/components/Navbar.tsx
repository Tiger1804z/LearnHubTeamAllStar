import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="logo">
        LearnHub
      </Link>

      {/* Navigation principale */}
      <ul className="nav-links">
        <li>
          <Link to="/courses">Parcours</Link>
        </li>
        <li>
          <Link to="/forum">Forum</Link>
        </li>
        <li>
          <Link to="/create-course">Créer</Link>
        </li>
        <li>
          <Link to="/dashboard">Mon apprentissage</Link>
        </li>
      </ul>

      {/* Actions utilisateur */}
      <div className="nav-actions">
        <Link to="/login" className="nav-link">
          Connexion
        </Link>

        <Link to="/register" className="btn btn-small">
          Inscription
        </Link>
      </div>
    </nav>
  );
}
