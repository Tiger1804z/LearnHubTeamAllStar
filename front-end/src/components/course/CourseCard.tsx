export default function CourseCard() {
  return (
    <div className="course-card">
      <img
        src="https://images.unsplash.com/photo-1526378722484-cc5c5103f8c4"
        alt="Illustration du parcours"
      />

      <div style={{ padding: "1rem" }}>
        <span className="badge">Programmation</span>

        <h3>JavaScript de zéro à héros</h3>

        <p>
          Apprenez les bases du JavaScript moderne et développez des applications
          web interactives grâce à des exercices pratiques.
        </p>

        <a href="/courses/1" className="btn">
          Voir le parcours
        </a>
      </div>
    </div>
  );
}
