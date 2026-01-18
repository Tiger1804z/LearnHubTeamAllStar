import { useEffect, useState } from "react";
import PageLayout from "../../components/layout/PageLayout";
import { apiFetch } from "../../api";
import { useNavigate } from "react-router-dom";

type LearningPath = {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  level: string | null;
  estMinutes: number | null;
};

//  Type pour la réponse complète du backend
type PathsResponse = {
  ok: boolean;
  items: LearningPath[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export default function Courses() {
  const [paths, setPaths] = useState<LearningPath[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setError(null);
        //  Typer correctement la réponse
        const data = await apiFetch<PathsResponse>("/catalog/paths");
        //  Extraire items (le tableau)
        setPaths(data.items);
      } catch (e: any) {
        setError(e?.message ?? "FAILED_TO_LOAD_PATHS");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <PageLayout
      title="Catalogue des parcours"
      subtitle="Explorez des parcours organisés par catégories et niveaux"
    >
      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      {!loading && !error && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "2rem",
          }}
        >
          {paths.map((p) => (
            <CourseCard key={p.id} path={p} />
          ))}
        </div>
      )}
    </PageLayout>
  );
}

function CourseCard({ path }: { path: LearningPath }) {
  const navigate = useNavigate();

  // Construction sécurisée des métadonnées
  const metadata = [
    path.category ? `Catégorie: ${path.category}` : null,
    path.level ? `Niveau: ${path.level}` : null,
    typeof path.estMinutes === "number" ? `~${path.estMinutes} min` : null,
  ]
    .filter(Boolean)
    .join(" • ");

  return (
    <div
      style={{
        background: "white",
        padding: "1.5rem",
        borderRadius: 14,
        boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
      }}
    >
      <h3>{path.title}</h3>

      <p style={{ color: "#4b5563", margin: "0.8rem 0" }}>
        {path.description ?? "Parcours structuré avec modules et exercices pratiques."}
      </p>

      {metadata && (
        <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 0 }}>
          {metadata}
        </p>
      )}

      <button
        style={{
          marginTop: "1rem",
          padding: "0.6rem 1.2rem",
          background: "#2563eb",
          color: "white",
          borderRadius: 8,
          border: "none",
          fontWeight: 600,
          cursor: "pointer",
        }}
        onClick={() => navigate(`/paths/${path.id}`)}
      >
        Voir le parcours
      </button>
    </div>
  );
}

