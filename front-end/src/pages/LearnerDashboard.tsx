import { useEffect, useState } from "react";

type ProgressData = {
  currentPaths: { id: string; title: string; progressPercent: number }[];
  xp: number;
  streak: number;
};

export default function LearnerDashboard() {
  const [data, setData] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        // proxy ici
        const res = await fetch("/api/progress/me", {
          credentials: "include",
        });

        if (!res.ok) {
          const txt = await res.text();
          throw new Error(txt || "Erreur API");
        }

        const json = await res.json();
        setData(json);
      } catch (e: any) {
        setError(e.message || "Erreur");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) return <div style={{ padding: 24 }}>Chargement...</div>;
  if (error) return <div style={{ padding: 24, color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: 24 }}>
      <h1>Dashboard apprenant</h1>

      <section style={{ marginTop: 24 }}>
        <h2>XP / Streak</h2>
        <p>XP: <b>{data?.xp ?? 0}</b></p>
        <p>Streak: <b>{data?.streak ?? 0}</b> jours</p>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Parcours en cours</h2>
        {data?.currentPaths?.length ? (
          <ul>
            {data.currentPaths.map((p) => (
              <li key={p.id}>
                <b>{p.title}</b> — {p.progressPercent}%
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucun parcours en cours.</p>
        )}
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Progression</h2>
        <p>Affichage basé sur les % de progression par parcours.</p>
      </section>
    </div>
  );
}
