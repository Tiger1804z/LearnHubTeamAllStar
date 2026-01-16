import PageLayout from '../../components/layout/PageLayout';

export default function StudyGroup() {
  return (
    <PageLayout
      title="Groupes d’étude"
      subtitle="Apprenez ensemble et progressez plus vite"
    >
      <Group name="React Front-end" members={12} />
      <Group name="UX / UI Design" members={8} />
      <Group name="Data & IA" members={15} />
    </PageLayout>
  );
}

function Group({ name, members }: { name: string; members: number }) {
  return (
    <div style={cardStyle}>
      <h3>{name}</h3>
      <p style={{ color: '#4b5563' }}>{members} membres actifs</p>
      <button style={buttonStyle}>Rejoindre</button>
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
