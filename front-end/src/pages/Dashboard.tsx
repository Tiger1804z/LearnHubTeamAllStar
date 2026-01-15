import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="container">
      <h1>Mon apprentissage</h1>

      <div className="stat-card">
        <h3>Introduction à la programmation</h3>
        <p>Progression : 30%</p>
        <Link to="/learn/1/2" className="btn">Continuer</Link>
      </div>
    </div>
  );
}
