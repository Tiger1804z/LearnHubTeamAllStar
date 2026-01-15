import { useState } from "react";
import AuthForm from "../components/AuthForm";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  async function onSubmit(data: {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}) {


    try {
      // a remplacer par le endpoint plus tard
      const res = await fetch("http://localhost:3000/users/signup", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  credentials: "include",
  body: JSON.stringify({
    first_name: data.firstName,
    last_name: data.lastName,
    email: data.email,
    password: data.password
  }),
});


      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Erreur d'inscription.");
      }

      alert("Compte créé ✅");
    } catch (e: any) {
      setApiError(e.message ?? "Erreur.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Inscription</h1>
      <AuthForm mode="register" onSubmit={onSubmit} isLoading={isLoading} apiError={apiError} />
    </div>
  );
}
