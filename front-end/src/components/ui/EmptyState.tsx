export default function EmptyState({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <div className="empty-state">
      <div className="empty-icon">📚</div>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}
