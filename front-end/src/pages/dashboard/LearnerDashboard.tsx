import PageLayout from '../../components/layout/PageLayout';

export default function LearnerDashboard() {
  return (
    <PageLayout
      title="Tableau de bord apprenant"
      subtitle="Suivez votre progression et reprenez vos parcours"
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2rem',
        }}
      >
        <DashboardCard title="Progression" value="65 %" />
        <DashboardCard title="Parcours actifs" value="3" />
        <DashboardCard title="Certificats" value="1" />
      </div>
    </PageLayout>
  );
}

function DashboardCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div
      style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: 14,
        boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
      }}
    >
      <h4>{title}</h4>
      <p style={{ fontSize: '2rem', fontWeight: 700 }}>{value}</p>
    </div>
  );
}
