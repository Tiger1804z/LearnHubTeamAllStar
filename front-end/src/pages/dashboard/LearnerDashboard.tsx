import { useEffect, useState } from "react";
import { apiFetch } from "../../api";

type DashboardResponse = {
  xp: number;
  streak: number;
  currentPath: {
    title: string;
    progress: number; // 0-100 (ou 0-1 selon backend)
  } | null;
};

export default function LearnerDashboard() {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        // IMPORTANT: endpoint ABSOLU
        const res = await apiFetch<DashboardResponse>("/dashboard/me", {
          method: "GET",
        });

        setData(res);
      } catch (e: any) {
        setError(e?.message ?? "Erreur API");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) return <div style={{ padding: 20 }}>Chargement...</div>;
  if (error) return <div style={{ padding: 20, color: "red" }}>{error}</div>;
  if (!data) return <div style={{ padding: 20 }}>Aucune donnée</div>;

  // si ton backend renvoie 0-1, décommente ça :
  // const progress = data.currentPath ? Math.round(data.currentPath.progress * 100) : 0;

  const progress = data.currentPath ? Math.round(data.currentPath.progress) : 0;

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard apprenant</h1>

      <div style={{ marginTop: 16 }}>
        <p><b>XP:</b> {data.xp}</p>
        <p><b>Streak:</b> {data.streak}</p>
      </div>

      <div style={{ marginTop: 24 }}>
        <h2>Parcours en cours</h2>
        {!data.currentPath ? (
          <p>Aucun parcours en cours</p>
        ) : (
          <>
            <p><b>Titre:</b> {data.currentPath.title}</p>
            <p><b>Progression:</b> {progress}%</p>
          </>
        )}
      </div>
    </div>
  );
}

