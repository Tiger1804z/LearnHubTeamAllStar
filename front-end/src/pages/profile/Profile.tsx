import PageLayout from '../../components/layout/PageLayout';

export default function Profile() {
  return (
    <PageLayout
      title="Profil utilisateur"
      subtitle="Vos informations et réalisations"
    >
      <div style={cardStyle}>
        <h3>Jean Dupont</h3>
        <p style={{ color: '#4b5563' }}>Apprenant passionné</p>
        <p>🏆 Parcours complétés : 3</p>
        <p>📜 Certificats : 1</p>
        <button style={buttonStyle}>Modifier le profil</button>
      </div>
    </PageLayout>
  );
}

const cardStyle = {
  background: 'white',
  padding: '1.5rem',
  borderRadius: 14,
  boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
};

const buttonStyle = {
  padding: '0.6rem 1.2rem',
  background: '#2563eb',
  color: 'white',
  border: 'none',
  borderRadius: 8,
  fontWeight: 600,
};
