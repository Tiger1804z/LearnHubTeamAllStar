

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options?.headers ?? {}),
    },
  });

  // On essaie de lire le body (même en erreur)
  const contentType = res.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");
  const body = isJson ? await res.json().catch(() => null) : null;

  if (!res.ok) {
    const msg =
      body?.error ||
      body?.message ||
      (typeof body === "string" ? body : null) ||
      `HTTP_${res.status}`;
    throw new Error(msg);
  }

  return body as T;
}