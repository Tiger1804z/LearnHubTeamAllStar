import { useMemo, useState } from "react";
import ErrorMessage from "./ErrorMessage";

type Mode = "login" | "register";

type Props = {
  mode: Mode;
  onSubmit: (data: { email: string; password: string; confirmPassword?: string }) => Promise<void>;
  isLoading?: boolean;
  apiError?: string | null;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function AuthForm({ mode, onSubmit, isLoading = false, apiError }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const isRegister = mode === "register";

  const canSubmit = useMemo(() => {
    if (!email.trim() || !password) return false;
    if (!isValidEmail(email)) return false;
    if (password.length < 8) return false;
    if (isRegister && password !== confirmPassword) return false;
    return true;
  }, [email, password, confirmPassword, isRegister]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLocalError(null);

    if (!email.trim() || !password) return setLocalError("Tous les champs sont obligatoires.");
    if (!isValidEmail(email)) return setLocalError("Email invalide.");
    if (password.length < 8) return setLocalError("Mot de passe trop court (min 8).");
    if (isRegister && password !== confirmPassword) return setLocalError("Les mots de passe ne matchent pas.");

    await onSubmit({ email: email.trim(), password, confirmPassword: isRegister ? confirmPassword : undefined });
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 420 }}>
      <label>
        Email
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="ex: sam@mail.com"
          style={{ width: "100%", padding: 10, marginTop: 6, marginBottom: 12 }}
        />
      </label>

      <label>
        Mot de passe
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="min 8 caractères"
          style={{ width: "100%", padding: 10, marginTop: 6, marginBottom: 12 }}
        />
      </label>

      {isRegister && (
        <label>
          Confirmer mot de passe
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            style={{ width: "100%", padding: 10, marginTop: 6, marginBottom: 12 }}
          />
        </label>
      )}

      <button type="submit" disabled={!canSubmit || isLoading} style={{ padding: "10px 14px" }}>
        {isLoading ? "..." : isRegister ? "Créer le compte" : "Se connecter"}
      </button>

      <ErrorMessage message={localError || apiError} />
    </form>
  );
}
