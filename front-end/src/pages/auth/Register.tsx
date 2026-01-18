import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { apiFetch } from "../../api";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const splitName = (value: string) => {
    const parts = value.trim().split(/\s+/).filter(Boolean);
    const first_name = parts[0] ?? "";
    const last_name = parts.slice(1).join(" ") || parts[0] || ""; // si 1 seul mot, on duplique
    return { first_name, last_name };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { first_name, last_name } = splitName(fullName);

      await apiFetch<{ ok: boolean }>("/users/signup", {
        method: "POST",
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          password,
          role: "learner", // optionnel mais safe
        }),
      });

      // Auto-login après signup
      await login(email, password);
      navigate("/profile");
    } catch (err: any) {
      setError(err?.message ?? "SIGNUP_FAILED");
    } finally {
      setLoading(false);
    }
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
          <h2 style={{ marginBottom: "1.5rem" }}>Inscription</h2>

          {error && (
            <p style={{ color: "crimson", marginBottom: "1rem" }}>
              {error}
            </p>
          )}

          {/* Nom */}
          <div style={{ marginBottom: "1.4rem" }}>
            <label style={{ display: "block", marginBottom: "0.4rem" }}>
              Nom complet
            </label>
            <input
              type="text"
              placeholder="Prénom Nom"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          {/* Email */}
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

          {/* Mot de passe */}
          <div style={{ marginBottom: "2rem" }}>
            <label style={{ display: "block", marginBottom: "0.4rem" }}>
              Mot de passe
            </label>
            <input
              type="password"
              placeholder="Choisissez un mot de passe"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Action */}
          <button className="btn" style={{ width: "100%" }} disabled={loading}>
            {loading ? "Création..." : "Créer le compte"}
          </button>

          {/* Lien secondaire */}
          <p className="texte-aide" style={{ marginTop: "1.5rem" }}>
            Déjà inscrit ? <Link to="/login">Se connecter</Link>
          </p>
        </form>
      </section>
    </div>
  );
}