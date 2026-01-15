export default function CourseDetail() {
  return (
    <div className="container">
      {/* En-tête du parcours */}
      <section className="section-header">
        <span className="section-tag">Parcours</span>
        <h1>Titre du parcours</h1>
        <p>
          Description détaillée du parcours. Elle expliquera clairement les
          objectifs, le contenu et à qui s’adresse ce parcours.
        </p>

        <div style={{ marginTop: "1.5rem" }}>
          <span className="badge">Débutant</span>
          <span className="badge">Programmation</span>
        </div>
      </section>

      {/* Informations clés */}
      <section>
        <h2>Informations générales</h2>
        <ul className="course-info">
          <li>
            <strong>Niveau :</strong> Débutant
          </li>
          <li>
            <strong>Durée estimée :</strong> 12 heures
          </li>
          <li>
            <strong>Modules :</strong> 5 modules
          </li>
        </ul>
      </section>

      {/* Structure du parcours */}
      <section>
        <h2>Structure du parcours</h2>

        <div className="module">
          <h3>Module 1 — Fondamentaux</h3>
          <p>Introduction aux concepts de base nécessaires pour démarrer.</p>
        </div>

        <div className="module">
          <h3>Module 2 — Concepts avancés</h3>
          <p>
            Approfondissement progressif avec des exemples pratiques et des
            exercices.
          </p>
        </div>

        <div className="module">
          <h3>Module 3 — Projet final</h3>
          <p>Mise en pratique des connaissances à travers un projet complet.</p>
        </div>
      </section>

      {/* Action */}
      <section style={{ textAlign: "center" }}>
        <h2>Prêt à commencer ?</h2>
        <p>
          Inscrivez-vous à ce parcours pour commencer votre apprentissage dès
          maintenant.
        </p>
        <a href="/login" className="btn">
          S’inscrire au parcours
        </a>
      </section>
    </div>
  );
}
