import {Link,useNavigate} from "react-router-dom";
import {useState} from "react";
import {useAuth} from "../../context/AuthContext";

export default function Login() {
  const {login} = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate("/profile");
    } catch (err: any) {
      setError(err?.message ?? "LOGIN_FAILED"); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <section className="section-header">
        <span className="section-tag">Espace membre</span>
        <h1>Connexion</h1>
        <p>Accédez à votre espace personnel pour suivre vos parcours.</p>
      </section>

      <section>
        <form className="formulaire" onSubmit={handleSubmit}>
          <h2 style={{ marginBottom: "1.5rem" }}>Se connecter</h2>

          {error && (
            <p style={{ color: "crimson", marginBottom: "1rem" }}>
              {error}
            </p>
          )}

          <div style={{ marginBottom: "1.4rem" }}>
            <label style={{ display: "block", marginBottom: "0.4rem" }}>
              Adresse courriel
            </label>
            <input
              type="email"
              placeholder="exemple@courriel.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <label style={{ display: "block", marginBottom: "0.4rem" }}>
              Mot de passe
            </label>
            <input
              type="password"
              placeholder="Votre mot de passe"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="btn" style={{ width: "100%" }} disabled={loading}>
            {loading ? "Connexion..." : "Connexion"}
          </button>

          <p className="texte-aide" style={{ marginTop: "1.5rem" }}>
            Pas encore de compte ? <Link to="/register">Créer un compte</Link>
          </p>
        </form>
      </section>
    </div>
  );
}