export default function CreateCourse() {
  return (
    <div className="container">
      <section className="section-header">
        <span className="section-tag">Création</span>
        <h1>Créer un parcours</h1>
        <p>
          Structurez votre contenu en modules et leçons pour accompagner les
          apprenants.
        </p>
      </section>

      <section>
        <form className="form">
          <input type="text" placeholder="Titre du parcours" />
          <textarea placeholder="Description du parcours"></textarea>

          <input type="text" placeholder="Nom du module" />
          <input type="text" placeholder="Titre de la leçon" />

          <button className="btn">Aperçu du parcours</button>
        </form>
      </section>
    </div>
  );
}
