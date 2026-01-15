import { useEffect, useState } from "react";
import EmptyState from "../components/EmptyState";

export default function Courses() {
  const [courses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Plus tard : appel API backend (fetch / axios)
    setLoading(false);
  }, []);

  return (
    <div className="container">
      <section className="section-header">
        <span className="section-tag">Parcours</span>
        <h1>Apprenez avec des parcours guidés</h1>
        <p>
          Des parcours structurés pour progresser étape par étape, pratiquer
          activement et apprendre avec la communauté LearnHub.
        </p>
      </section>

      <section>
        {loading && <p>Chargement des parcours…</p>}

        {!loading && courses.length === 0 && (
          <EmptyState
            title="Aucun parcours disponible"
            message="Les parcours seront ajoutés prochainement par les créateurs."
          />
        )}

        {/* 
          Quand le backend sera prêt :
          courses.map(course => <CourseCard key={course.id} course={course} />)
        */}
      </section>
    </div>
  );
}

