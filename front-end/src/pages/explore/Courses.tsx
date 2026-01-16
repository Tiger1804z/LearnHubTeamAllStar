import PageLayout from '../../components/layout/PageLayout';

export default function Courses() {
  return (
    <PageLayout
      title="Catalogue des parcours"
      subtitle="Explorez des parcours organisés par catégories et niveaux"
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2rem',
        }}
      >
        <CourseCard title="React Moderne" />
        <CourseCard title="UX / UI Design" />
        <CourseCard title="Python & Data" />
      </div>
    </PageLayout>
  );
}

function CourseCard({ title }: { title: string }) {
  return (
    <div
      style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: 14,
        boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
      }}
    >
      <h3>{title}</h3>
      <p style={{ color: '#4b5563', margin: '0.8rem 0' }}>
        Parcours structuré avec modules et exercices pratiques.
      </p>
      <button style={buttonStyle}>Voir le parcours</button>
    </div>
  );
}

const buttonStyle = {
  padding: '0.6rem 1.2rem',
  background: '#2563eb',
  color: 'white',
  borderRadius: 8,
  border: 'none',
  fontWeight: 600,
  cursor: 'pointer',
};
