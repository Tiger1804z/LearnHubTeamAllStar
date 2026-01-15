export default function CreatorDashboard() {
  return (
    <div className="container">
      <section className="section-header">
        <span className="section-tag">Créateur</span>
        <h1>Tableau de bord créateur</h1>
        <p>Suivez les performances de vos parcours.</p>
      </section>

      <section className="stats">
        <div className="stat-card">
          <h3>Parcours créés</h3>
          <p>3</p>
        </div>

        <div className="stat-card">
          <h3>Apprenants inscrits</h3>
          <p>124</p>
        </div>
      </section>
    </div>
  );
}
