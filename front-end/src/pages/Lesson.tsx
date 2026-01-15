import { Link } from "react-router-dom";

export default function Lesson() {
  return (
    <div className="container learning-layout">
      <aside className="lesson-sidebar">
        <h3>Leçons</h3>
        <ul>
          <li className="active">Introduction</li>
          <li>Variables</li>
          <li>Boucles</li>
        </ul>
      </aside>

      <main className="lesson-content">
        <h1>Introduction</h1>
        <p>
          Dans cette leçon, vous allez comprendre ce qu’est un programme et
          comment un ordinateur exécute des instructions.
        </p>

        <div className="exercise-box">
          <h3>Exercice</h3>
          <p>Explique avec tes mots ce qu’est un algorithme.</p>
        </div>

        <div className="lesson-navigation">
          <span />
          <Link to="/learn/1/2" className="btn">Leçon suivante</Link>
        </div>
      </main>
    </div>
  );
}
