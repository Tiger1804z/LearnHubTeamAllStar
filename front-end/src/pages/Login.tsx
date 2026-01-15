import { useState } from "react";
import AuthForm from "../components/AuthForm";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  async function onSubmit(data: { email: string; password: string }) {
    setIsLoading(true);
    setApiError(null);

    try {
      // a remplacer par le endpoint plus tard
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: data.email, password: data.password }),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Erreur de connexion.");
      }

      // redirect vers Home
      alert("Connecté ✅");
    } catch (e: any) {
      setApiError(e.message ?? "Erreur.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Connexion</h1>
      <AuthForm mode="login" onSubmit={onSubmit as any} isLoading={isLoading} apiError={apiError} />
    </div>
  );
}
