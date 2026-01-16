export default function PageLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <main>
      {/* ===== HERO ===== */}
      <section
        style={{
          background: 'linear-gradient(135deg, #2563eb, #1e3a8a)',
          color: 'white',
          padding: '4rem 1rem',
        }}
      >
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.6rem', marginBottom: '0.8rem' }}>
            {title}
          </h1>
          {subtitle && (
            <p style={{ fontSize: '1.1rem', opacity: 0.95 }}>
              {subtitle}
            </p>
          )}
        </div>
      </section>

      {/* ===== CONTENT ===== */}
      <section style={{ padding: '4rem 1rem' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          {children}
        </div>
      </section>
    </main>
  );
}
