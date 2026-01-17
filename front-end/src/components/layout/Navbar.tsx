import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">LearnHub</Link>

      <div>
        <Link to="/courses">Parcours</Link>
        <Link to="/forum">Forum</Link>
        <Link to="/groups">Groupes</Link>

        {user && <Link to="/profile">Profil</Link>}
        {user && <Link to="/mentorship">Mentorat</Link>}

        {!user && <Link to="/login">Connexion</Link>}
        {!user && <Link to="/register">Inscription</Link>}

        {user && <button onClick={logout}>Déconnexion</button>}
      </div>
    </nav>
  );
}
