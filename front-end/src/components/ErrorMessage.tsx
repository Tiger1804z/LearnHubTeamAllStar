type Props = {
  message?: string | null;
};

export default function ErrorMessage({ message }: Props) {
  if (!message) return null;

  return (
    <div style={{ marginTop: 8, padding: 10, borderRadius: 8, border: "1px solid #ffb4b4" }}>
      <p style={{ margin: 0 }}>{message}</p>
    </div>
  );
}
