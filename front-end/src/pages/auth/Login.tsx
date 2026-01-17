import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulation backend
    login('token-demo', { id: 1, role: 'student' });
  };

  return (
    <div className="container">
      {/* En-tête */}
      <section className="section-header">
        <span className="section-tag">Espace membre</span>
        <h1>Connexion</h1>
        <p>
          Accédez à votre espace personnel pour suivre vos parcours
          et continuer votre apprentissage.
        </p>
      </section>

      {/* Formulaire */}
      <section>
        <form className="formulaire" onSubmit={handleSubmit}>
          <h2 style={{ marginBottom: '1.5rem' }}>Se connecter</h2>

          {/* Email */}
          <div style={{ marginBottom: '1.4rem' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem' }}>
              Adresse courriel
            </label>
            <input
              type="email"
              placeholder="exemple@courriel.com"
              required
            />
          </div>

          {/* Mot de passe */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem' }}>
              Mot de passe
            </label>
            <input
              type="password"
              placeholder="Votre mot de passe"
              required
            />
          </div>

          {/* Action */}
          <button className="btn" style={{ width: '100%' }}>
            Connexion
          </button>

          {/* Lien secondaire */}
          <p className="texte-aide" style={{ marginTop: '1.5rem' }}>
            Pas encore de compte ?{' '}
            <Link to="/register">Créer un compte</Link>
          </p>
        </form>
      </section>
    </div>
  );
}

