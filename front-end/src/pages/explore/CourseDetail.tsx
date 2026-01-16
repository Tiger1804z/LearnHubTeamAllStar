import PageLayout from '../../components/layout/PageLayout';

export default function CourseDetail() {
  return (
    <PageLayout
      title="React Moderne"
      subtitle="Un parcours complet pour maîtriser React de A à Z"
    >
      <h3>Description</h3>
      <p style={{ color: '#4b5563', marginBottom: '2rem' }}>
        Ce parcours vous accompagne dans l’apprentissage progressif
        de React avec des projets concrets.
      </p>

      <h3>Modules</h3>
      <ul>
        <li>⚛️ Bases de React</li>
        <li>🧠 Hooks & State</li>
        <li>🌐 Routing & API</li>
      </ul>

      <button style={{ ...buttonStyle, marginTop: '2rem' }}>
        S’inscrire au parcours
      </button>
    </PageLayout>
  );
}

const buttonStyle = {
  padding: '0.8rem 1.6rem',
  background: '#2563eb',
  color: 'white',
  borderRadius: 10,
  border: 'none',
  fontWeight: 600,
  cursor: 'pointer',
};
