import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="container">
      <section className="hero">
        <h1>LearnHub</h1>
        <p>
          Apprenez comme sur Udemy, progressez activement grâce
          à la pratique et à la collaboration.
        </p>
        <Link to="/courses" className="btn">Voir les parcours</Link>
      </section>

      <section>
        <h2>Acteurs du système</h2>
        <ul>
          <li><strong>Visiteur</strong> : explore les parcours</li>
          <li><strong>Apprenant</strong> : suit les leçons et progresse</li>
          <li><strong>Créateur</strong> : crée et structure des parcours</li>
          <li><strong>Mentor</strong> : accompagne les apprenants</li>
        </ul>
      </section>

      <section>
        <h2>Fonctionnalités principales</h2>
        <ul>
          <li>Parcours structurés en modules et leçons</li>
          <li>Suivi de progression</li>
          <li>Exercices et quiz</li>
          <li>Forum par leçon</li>
          <li>Tableau de bord apprenant</li>
        </ul>
      </section>

      <section>
        <h2>Règles métier</h2>
        <ul>
          <li>Une leçon doit être complétée pour progresser</li>
          <li>La progression est calculée par parcours</li>
          <li>Un parcours est terminé lorsque toutes les leçons le sont</li>
          <li>Les fonctionnalités dépendent du rôle</li>
        </ul>
      </section>

      <section>
        <h2>Pages principales</h2>
        <ul>
          <li>Accueil</li>
          <li>Catalogue des parcours</li>
          <li>Détail d’un parcours</li>
          <li>Page leçon</li>
          <li>Tableau de bord apprenant</li>
        </ul>
      </section>
    </main>
  );
}
