import PageLayout from '../../components/layout/PageLayout';

export default function AdminDashboard() {
  return (
    <PageLayout
      title="Administration"
      subtitle="Gestion de la plateforme"
    >
      <AdminCard title="Utilisateurs" value="245" />
      <AdminCard title="Parcours actifs" value="32" />
      <AdminCard title="Signalements" value="4" />
    </PageLayout>
  );
}

function AdminCard({ title, value }: { title: string; value: string }) {
  return (
    <div style={cardStyle}>
      <h3>{title}</h3>
      <p style={{ fontSize: '2rem', fontWeight: 700 }}>{value}</p>
    </div>
  );
}

const cardStyle = {
  background: 'white',
  padding: '1.5rem',
  borderRadius: 14,
  boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
  marginBottom: '1.5rem',
};
