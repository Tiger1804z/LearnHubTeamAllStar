export default function Home() {
  return (
    <div className="container">
      {/* HERO */}
      <section className="hero">
        <h1>Apprenez mieux. Ensemble.</h1>
        <p>
          LearnHub est une plateforme d’apprentissage collaboratif où chaque
          apprenant progresse activement grâce à la pratique, aux échanges et au
          mentorat.
        </p>
        <a href="/courses" className="btn">
          Explorer les parcours
        </a>
      </section>

      {/* POUR QUI */}
      <section>
        <h2>Pour qui est LearnHub ?</h2>
        <p>
          Que vous soyez débutant, étudiant ou en reconversion, LearnHub vous
          permet d’apprendre à votre rythme tout en bénéficiant du soutien de la
          communauté.
        </p>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section>
        <h2>Comment ça fonctionne</h2>
        <ul className="steps">
          <li>
            <strong>Suivez des parcours structurés</strong><br />
            Des modules clairs, progressifs et orientés pratique.
          </li>
          <li>
            <strong>Pratiquez activement</strong><br />
            Exercices, quiz et projets pour ancrer les connaissances.
          </li>
          <li>
            <strong>Progressez avec les autres</strong><br />
            Groupes d’étude, mentorat et entraide communautaire.
          </li>
        </ul>
      </section>

      {/* VALEUR */}
      <section>
        <h2>Pourquoi LearnHub ?</h2>
        <p>
          Les études montrent que l’apprentissage actif est bien plus efficace
          que la simple consommation de contenu. LearnHub met cette approche au
          cœur de l’expérience.
        </p>
      </section>
    </div>
  );
}
