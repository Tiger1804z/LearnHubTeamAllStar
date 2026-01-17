import PageLayout from '../../components/layout/PageLayout';

export default function Mentorship() {
  return (
    <PageLayout
      title="Mentorat"
      subtitle="Trouvez un mentor ou accompagnez des apprenants"
    >
      <Mentor name="Alice Martin" domain="Front-end" />
      <Mentor name="Lucas Tremblay" domain="Data" />
    </PageLayout>
  );
}

function Mentor({ name, domain }: { name: string; domain: string }) {
  return (
    <div style={cardStyle}>
      <h3>{name}</h3>
      <p style={{ color: '#4b5563' }}>Expert en {domain}</p>
      <button style={buttonStyle}>Contacter</button>
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
