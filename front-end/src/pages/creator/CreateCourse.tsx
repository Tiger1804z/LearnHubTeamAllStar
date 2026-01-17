import PageLayout from '../../components/layout/PageLayout';

export default function CreateCourse() {
  return (
    <PageLayout
      title="Créer un parcours"
      subtitle="Concevez un parcours structuré et engageant"
    >
      <div style={cardStyle}>
        <input placeholder="Titre du parcours" style={inputStyle} />
        <textarea
          placeholder="Description"
          style={{ ...inputStyle, height: 100 }}
        />
        <button style={buttonStyle}>Créer le parcours</button>
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

const inputStyle = {
  width: '100%',
  padding: '0.7rem',
  marginBottom: '1rem',
  borderRadius: 8,
  border: '1px solid #d1d5db',
};

const buttonStyle = {
  padding: '0.7rem 1.4rem',
  background: '#2563eb',
  color: 'white',
  border: 'none',
  borderRadius: 8,
  fontWeight: 600,
};
