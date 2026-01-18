import PageLayout from "../../components/layout/PageLayout";
import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { user, isLoading, logout } = useAuth();

  if (isLoading) {
    return (
      <PageLayout title="Profil utilisateur" subtitle="Chargement...">
        <div>Loading...</div>
      </PageLayout>
    );
  }

  if (!user) {
    return (
      <PageLayout title="Profil utilisateur" subtitle="Non connecté">
        <div style={cardStyle}>
          <h3>Vous n'êtes pas connecté</h3>
          <p>Retournez à la page login.</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Profil utilisateur" subtitle="Vos informations et réalisations">
      <div style={cardStyle}>
        <h3>{user.email}</h3>
        <p style={{ color: "#4b5563" }}>Rôle : {user.role}</p>

        <button style={buttonStyle} onClick={logout}>
          Déconnexion
        </button>
      </div>
    </PageLayout>
  );
}

const cardStyle = {
  background: "white",
  padding: "1.5rem",
  borderRadius: 14,
  boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
};

const buttonStyle = {
  padding: "0.6rem 1.2rem",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: 8,
  fontWeight: 600,
};
