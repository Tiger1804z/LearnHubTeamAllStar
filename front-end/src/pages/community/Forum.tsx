import PageLayout from '../../components/layout/PageLayout';

export default function Forum() {
  return (
    <PageLayout
      title="Forum communautaire"
      subtitle="Posez vos questions et échangez avec la communauté"
    >
      <ForumCard title="Comment bien débuter en React ?" />
      <ForumCard title="Bonnes pratiques UI/UX ?" />
      <ForumCard title="Ressources pour apprendre Python" />
    </PageLayout>
  );
}

function ForumCard({ title }: { title: string }) {
  return (
    <div style={cardStyle}>
      <h3>{title}</h3>
      <p style={{ color: '#4b5563' }}>
        Discussion ouverte par un membre de la communauté.
      </p>
      <button style={buttonStyle}>Voir la discussion</button>
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

const buttonStyle = {
  padding: '0.6rem 1.2rem',
  background: '#2563eb',
  color: 'white',
  border: 'none',
  borderRadius: 8,
  fontWeight: 600,
};
