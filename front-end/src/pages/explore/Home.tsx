import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main>
      {/* ================= HERO ================= */}
      <section
        style={{
          background: 'linear-gradient(135deg, #2563eb, #1e3a8a)',
          color: 'white',
          padding: '5rem 1rem',
        }}
      >
        <div
          style={{
            maxWidth: 1000,
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
            Apprenez. Créez. Progressez.
          </h1>

          <p style={{ fontSize: '1.2rem', opacity: 0.95 }}>
            Une plateforme d’apprentissage collaborative où apprenants,
            créateurs et mentors évoluent ensemble grâce à des parcours
            concrets et progressifs.
          </p>

          <div style={{ marginTop: '2.5rem' }}>
            <Link
              to="/courses"
              style={{
                padding: '0.9rem 1.6rem',
                background: 'white',
                color: '#1e3a8a',
                borderRadius: 10,
                fontWeight: 600,
                textDecoration: 'none',
                marginRight: '1rem',
              }}
            >
              Explorer les parcours
            </Link>

            <Link
              to="/register"
              style={{
                padding: '0.9rem 1.6rem',
                border: '2px solid white',
                color: 'white',
                borderRadius: 10,
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Rejoindre la plateforme
            </Link>
          </div>
        </div>
      </section>

      {/* ================= CONCEPT ================= */}
      <section style={{ padding: '4rem 1rem' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>
            Une nouvelle façon d’apprendre
          </h2>

          <p style={{ color: '#4b5563', maxWidth: 750, margin: '0 auto' }}>
            LearnHub centralise des parcours pédagogiques créés par des
            passionnés, enrichis par la communauté, et conçus pour un
            apprentissage structuré, pratique et motivant.
          </p>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section style={{ background: '#f9fafb', padding: '4rem 1rem' }}>
        <div
          style={{
            maxWidth: 1000,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
          }}
        >
          <Feature
            title="📚 Parcours structurés"
            description="Des parcours organisés par modules et leçons pour progresser étape par étape."
          />

          <Feature
            title="🎯 Suivi de progression"
            description="Visualisez votre avancement et reprenez votre apprentissage à tout moment."
          />

          <Feature
            title="✍️ Création de contenu"
            description="Les créateurs peuvent concevoir et publier leurs propres parcours pédagogiques."
          />

          <Feature
            title="💬 Communauté active"
            description="Un espace d’échange pour poser des questions et apprendre ensemble."
          />

          <Feature
            title="🤝 Mentorat"
            description="Bénéficiez de l’accompagnement de mentors ou aidez d’autres apprenants."
          />

          <Feature
            title="📊 Tableaux de bord"
            description="Des dashboards dédiés pour apprenants, créateurs et administrateurs."
          />
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <h2>Prêt à commencer ?</h2>

        <p style={{ color: '#4b5563', margin: '1rem 0 2rem' }}>
          Rejoignez LearnHub dès aujourd’hui et commencez à apprendre,
          créer ou partager vos connaissances.
        </p>

        <Link
          to="/register"
          style={{
            padding: '0.9rem 1.8rem',
            background: '#2563eb',
            color: 'white',
            borderRadius: 10,
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          Créer un compte gratuitement
        </Link>
      </section>
    </main>
  );
}

function Feature({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div
      style={{
        background: 'white',
        padding: '1.6rem',
        borderRadius: 14,
        boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
      }}
    >
      <h3 style={{ marginBottom: '0.6rem' }}>{title}</h3>
      <p style={{ color: '#4b5563' }}>{description}</p>
    </div>
  );
}
