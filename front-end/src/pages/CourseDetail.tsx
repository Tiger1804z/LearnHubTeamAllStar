import { Link } from "react-router-dom";

export default function CourseDetail() {
  return (
    <div className="container">
      <h1>Introduction à la programmation</h1>

      <p>
        Ce parcours vous guide pas à pas pour comprendre les bases de la
        programmation et développer une logique solide.
      </p>

      <h2>Modules</h2>
      <ul>
        <li>Module 1 — Bases</li>
        <li>Module 2 — Conditions et boucles</li>
        <li>Module 3 — Mise en pratique</li>
      </ul>

      <h2>Avis</h2>
      <div className="review">
        <strong>Marie</strong>
        <p>★★★★★ Très clair et progressif.</p>
      </div>

      {/* LOGIQUE RÉELLE */}
      <div style={{ marginTop: "2rem" }}>
        <Link to="/register" className="btn">S’inscrire</Link>
        <Link to="/learn/1/1" className="btn secondary">Commencer</Link>
      </div>
    </div>
  );
}
