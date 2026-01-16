import { Link } from 'react-router-dom';

export default function Register() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Compte créé (simulation)');
  };

  return (
    <div className="container">
      {/* En-tête */}
      <section className="section-header">
        <span className="section-tag">Inscription</span>
        <h1>Créer un compte</h1>
        <p>
          Rejoignez LearnHub pour accéder aux parcours,
          échanger avec la communauté et progresser à votre rythme.
        </p>
      </section>

      {/* Formulaire */}
      <section>
        <form className="formulaire" onSubmit={handleSubmit}>
          <h2 style={{ marginBottom: '1.5rem' }}>Inscription</h2>

          {/* Nom */}
          <div style={{ marginBottom: '1.4rem' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem' }}>
              Nom complet
            </label>
            <input
              type="text"
              placeholder="Prénom Nom"
              required
            />
          </div>

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
              placeholder="Choisissez un mot de passe"
              required
            />
          </div>

          {/* Action */}
          <button className="btn" style={{ width: '100%' }}>
            Créer le compte
          </button>

          {/* Lien secondaire */}
          <p className="texte-aide" style={{ marginTop: '1.5rem' }}>
            Déjà inscrit ?{' '}
            <Link to="/login">Se connecter</Link>
          </p>
        </form>
      </section>
    </div>
  );
}
