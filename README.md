# LearnHub 🚧  
Plateforme d’apprentissage – projet en cours de développement

LearnHub est un projet de plateforme d’apprentissage développé dans un contexte académique / hackathon.  

L’objectif principal était de mettre en place une **architecture solide**, évolutive, et réaliste, même si toutes les fonctionnalités prévues ne sont pas encore complétées.

---

## 🧠 Stack technologique

### Front-end
- React + TypeScript
- Vite
- React Router
- Context API (authentification)
- Fetch centralisé (`apiFetch`)
- UI custom (sans librairie externe lourde)

### Back-end
- Node.js
- Express
- TypeScript
- Prisma
- PostgreSQL
- JWT (authentification)
- Architecture controllers / routes / services

---



---

## 🔐 Authentification (fonctionnel)

### Back-end
- Inscription (`POST /users/signup`)
- Connexion (`POST /users/login`)
- JWT généré et validé via middleware
- Routes protégées prêtes à être utilisées

### Front-end
- Inscription connectée au back-end
- Connexion connectée au back-end
- Stockage du token dans le `localStorage`
- Injection automatique du token via `apiFetch`

✅ **Cette partie est pleinement fonctionnelle**

---

## 📚 Parcours d’apprentissage (Learning Paths)

### Back-end (fonctionnel)
- Création de parcours
- Publication de parcours
- Lecture du catalogue
- Récupération de la structure complète (parcours → modules → leçons)
- Inscription à un parcours

### Front-end (partiel)
- Récupération et affichage des parcours disponibles en base de données
- UI branchée à l’API

---

## ❌ Fonctionnalités non terminées

### Back-end (à compléter)
- Système de progression / XP (partiellement pensé)
- Forum
- Groupes d’étude
- Mentorat
- Système d’avis et de notes

### Front-end (à compléter)
- Suivi de progression utilisateur
- Forum
- Groupes
- Mentorat
- Avis / notes
- UI complète pour modules, leçons et progression
- details parcours

---

## ▶️ Lancer le projet en local

### Back-end

```bash
cd backend
npm install
npm run dev
```

Créer un fichier .env :
```bash
env

DATABASE_URL=postgresql://...
JWT_SECRET=your_secret
VITE_API_URL=http://localhost:3000
```

Front-end
```bash
cd front-end
npm install
npm run dev
```


VITE_API_URL=http://localhost:3000
