export default function Forum() {
  return (
    <div className="container">
      <section className="section-header">
        <span className="section-tag">Forum</span>
        <h1>Questions & discussions</h1>
        <p>Échangez avec la communauté LearnHub.</p>
      </section>

      <section>
        <input type="text" placeholder="Rechercher une question…" />

        <div className="forum-post">
          <h3>Quelle est la différence entre une variable et une constante ?</h3>
          <p>Posté par Julie • 3 réponses</p>
        </div>
      </section>
    </div>
  );
}
