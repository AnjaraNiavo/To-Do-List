# at🩷ksi — Task & Project Management

> **Ataksi** est une application SaaS de gestion de tâches et de projets, construite avec Django REST Framework en backend et React + Tailwind CSS en frontend.

---

## 📋 Table des matières

- [Aperçu](#-aperçu)
- [Stack technique](#-stack-technique)
- [Architecture du projet](#-architecture-du-projet)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
  - [Backend (Django)](#backend-django)
  - [Frontend (React)](#frontend-react)
- [Variables d'environnement](#-variables-denvironnement)
- [API Endpoints](#-api-endpoints)
- [Pages & fonctionnalités](#-pages--fonctionnalités)
- [Captures d'écran](#-captures-décran)
- [Contribuer](#-contribuer)
- [Licence](#-licence)

---

## 🚀 Aperçu

Ataksi centralise la gestion de vos projets, tâches, équipes et statistiques dans une interface premium :

- ✅ Création et suivi de tâches avec priorités, catégories et statuts
- 📅 Timeline visuelle type Gantt (May 9–13)
- ⏱️ Suivi du temps avec sparkline hebdomadaire
- 👥 Gestion d'équipes et de projets multiples
- 🏷️ Système de tags colorés
- 💬 Commentaires sur les tâches
- 📊 Dashboard avec statistiques en temps réel
- 🔐 Authentification complète (register / login / logout)

---

## 🛠 Stack technique

| Couche      | Technologie                                   | Version      |
|-------------|-----------------------------------------------|--------------|
| Backend     | Python / Django                               | 5.0.6        |
| API         | Django REST Framework                         | 3.15.1       |
| Base de données | PostgreSQL (via psycopg2)               | —            |
| CORS        | django-cors-headers                           | 4.3.1        |
| Env vars    | python-dotenv                                 | 1.0.1        |
| Frontend    | React 18 + Vite                               | 18.x / 5.x   |
| Styling     | Tailwind CSS 3                                | 3.4.x        |
| Routing     | React Router DOM                              | 6.x          |
| Icônes      | Lucide React                                  | 0.408.x      |
| Typographie | Inter (Google Fonts)                          | —            |

---

## 📁 Architecture du projet

```
To-Do-list/
├── backend/                        # Application Django
│   ├── backend/                    # Configuration Django
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── asgi.py
│   ├── task/                       # App principale
│   │   ├── models.py               # Project, Tag, Task, TaskComment
│   │   ├── serializers.py          # ProjectSerializer, TaskSerializer, etc.
│   │   ├── views.py                # Views (register, login, tasks, projects, tags, stats)
│   │   ├── urls.py                 # Routes /api/...
│   │   ├── admin.py
│   │   └── migrations/
│   ├── .env                        # Variables d'environnement (non versionné)
│   ├── manage.py
│   └── requirement.txt
│
└── frontend/                       # Application React
    ├── src/
    │   ├── pages/
    │   │   ├── Landing.jsx         # Page d'accueil marketing
    │   │   ├── Login.jsx           # Connexion (OAuth + formulaire)
    │   │   ├── Register.jsx        # Inscription (2 colonnes + strength meter)
    │   │   └── Dashboard.jsx       # Dashboard principal
    │   ├── components/
    │   │   ├── Logo.jsx            # Logo "at🩷ksi"
    │   │   ├── Avatar.jsx          # Avatar & AvatarStack
    │   │   ├── Sidebar.jsx         # Sidebar 240px avec navigation
    │   │   ├── Header.jsx          # Header avec recherche + actions
    │   │   ├── TodayTasks.jsx      # Liste de tâches du jour
    │   │   ├── Timeline.jsx        # Gantt chart visuel
    │   │   ├── TimeManagement.jsx  # Sparkline temps hebdomadaire
    │   │   └── RecentProjects.jsx  # Grille 2x2 de projets
    │   ├── App.jsx                 # Routes React Router
    │   ├── main.jsx                # Point d'entrée React
    │   └── index.css               # Tailwind + animations + composants globaux
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── postcss.config.js
```

---

## ✅ Prérequis

Assurez-vous d'avoir installé :

- **Python** ≥ 3.11
- **PostgreSQL** ≥ 14
- **Node.js** ≥ 18
- **npm** ≥ 9

---

## ⚙️ Installation

### Backend (Django)

#### 1. Créer et activer l'environnement virtuel

```bash
# Windows
python -m venv env
env\Scripts\activate

# macOS / Linux
python -m venv env
source env/bin/activate
```

#### 2. Installer les dépendances Python

```bash
cd backend
pip install -r requirement.txt
```

#### 3. Configurer les variables d'environnement

Créez un fichier `.env` dans le dossier `backend/` :

```env
DB_NAME=todotable
DB_USER=postgres
DB_PASSWORD=votre_mot_de_passe
DB_HOST=localhost
DB_PORT=5432
SECRET_KEY=votre-cle-secrete-django
DEBUG=True
```

> ⚠️ Ne commitez jamais votre `.env` en production. Changez `SECRET_KEY` et passez `DEBUG=False`.

#### 4. Créer la base de données PostgreSQL

```sql
-- Dans psql
CREATE DATABASE todotable;
```

#### 5. Appliquer les migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

#### 6. Créer un super-utilisateur (optionnel)

```bash
python manage.py createsuperuser
```

#### 7. Lancer le serveur de développement

```bash
python manage.py runserver
```

> Le backend sera disponible sur **http://127.0.0.1:8000**

---

### Frontend (React)

#### 1. Installer les dépendances Node

```bash
cd frontend
npm install
```

#### 2. Lancer le serveur de développement

```bash
npm run dev
```

> Le frontend sera disponible sur **http://localhost:5173**

#### 3. Build de production (optionnel)

```bash
npm run build
npm run preview
```

---

## 🔐 Variables d'environnement

| Variable      | Description                        | Exemple                      |
|---------------|------------------------------------|------------------------------|
| `DB_NAME`     | Nom de la base de données          | `todotable`                  |
| `DB_USER`     | Utilisateur PostgreSQL             | `postgres`                   |
| `DB_PASSWORD` | Mot de passe PostgreSQL            | `motdepasse`                 |
| `DB_HOST`     | Hôte de la base de données         | `localhost`                  |
| `DB_PORT`     | Port PostgreSQL                    | `5432`                       |
| `SECRET_KEY`  | Clé secrète Django                 | `changez-cette-cle`          |
| `DEBUG`       | Mode debug (`True` / `False`)      | `True`                       |

---

## 📡 API Endpoints

Tous les endpoints sont préfixés par `/api/`.

### 🔑 Authentification

| Méthode | Endpoint              | Description                     | Auth requise |
|---------|-----------------------|---------------------------------|:---:|
| `POST`  | `/api/auth/register/` | Créer un compte utilisateur     | ❌  |
| `POST`  | `/api/auth/login/`    | Se connecter (session Django)   | ❌  |
| `POST`  | `/api/auth/logout/`   | Se déconnecter                  | ✅  |

### 📝 Tâches

| Méthode  | Endpoint              | Description                              | Auth requise |
|----------|-----------------------|------------------------------------------|:---:|
| `GET`    | `/api/tasks/`         | Lister les tâches (filtres disponibles)  | ✅  |
| `POST`   | `/api/tasks/`         | Créer une nouvelle tâche                 | ✅  |
| `GET`    | `/api/tasks/{id}/`    | Détail complet d'une tâche               | ✅  |
| `PATCH`  | `/api/tasks/{id}/`    | Modifier partiellement une tâche         | ✅  |
| `DELETE` | `/api/tasks/{id}/`    | Suppression douce (`is_deleted=True`)    | ✅  |

**Filtres disponibles sur `GET /api/tasks/` :**

```
?status=pending|in_progress|done|archived
?priority=low|medium|high
?category=work|personal|urgent|other
?project_id=<uuid>
?search=<texte>
```

### 📁 Projets

| Méthode  | Endpoint               | Description               | Auth requise |
|----------|------------------------|---------------------------|:---:|
| `GET`    | `/api/projects/`       | Lister les projets actifs | ✅  |
| `POST`   | `/api/projects/`       | Créer un projet           | ✅  |
| `GET`    | `/api/projects/{id}/`  | Détail d'un projet        | ✅  |
| `PATCH`  | `/api/projects/{id}/`  | Modifier un projet        | ✅  |
| `DELETE` | `/api/projects/{id}/`  | Archiver un projet        | ✅  |

### 🏷️ Tags

| Méthode   | Endpoint          | Description        | Auth requise |
|-----------|-------------------|--------------------|:---:|
| `GET`     | `/api/tags/`      | Lister les tags    | ✅  |
| `POST`    | `/api/tags/`      | Créer un tag       | ✅  |
| `DELETE`  | `/api/tags/{id}/` | Supprimer un tag   | ✅  |

### 💬 Commentaires

| Méthode   | Endpoint                                       | Description                  | Auth requise |
|-----------|------------------------------------------------|------------------------------|:---:|
| `POST`    | `/api/tasks/{task_id}/comments/`               | Ajouter un commentaire       | ✅  |
| `DELETE`  | `/api/tasks/{task_id}/comments/{comment_id}/`  | Supprimer un commentaire     | ✅  |

### 📊 Statistiques

| Méthode | Endpoint       | Description                        | Auth requise |
|---------|----------------|------------------------------------|:---:|
| `GET`   | `/api/stats/`  | Statistiques du dashboard          | ✅  |

**Réponse de `/api/stats/` :**

```json
{
  "total": 24,
  "completed": 16,
  "pending": 5,
  "in_progress": 3,
  "high_priority_open": 2,
  "completion_pct": 66.7
}
```

---

## 🖥️ Pages & fonctionnalités

### `/` — Page d'accueil (Landing)
- Navbar fixe avec navigation et CTA
- Section Hero avec gradient violet → rose
- Prévisualisation du dashboard (mini-mockup)
- Grille de 6 fonctionnalités
- 3 témoignages clients
- Section CTA finale + footer

### `/login` — Connexion
- Boutons OAuth Google & GitHub (UI uniquement)
- Formulaire email + mot de passe
- Bouton afficher/masquer le mot de passe
- Lien "Mot de passe oublié"
- Spinner de chargement animé

### `/register` — Inscription
- Layout 2 colonnes (avantages + formulaire) sur desktop
- Boutons OAuth
- Indicateur de force du mot de passe (4 niveaux)
- Checkbox CGU avec liens
- Social proof (avatars + note 4.9/5)

### `/dashboard` — Dashboard principal
- **Sidebar** (240px) : logo, navigation active, équipes Suroto Studios & Umukoloid, Favoris Rewardino & Spexcircle
- **Header** : titre, barre de recherche arrondie, bouton "+ Add project" dégradé, cloche avec badge, avatar
- **Today** : 4 tâches avec checkbox interactive, badge commentaires, stack d'avatars, tag coloré
- **Timeline** : grille Gantt May 9–13, 6 barres colorées, ligne rouge "maintenant"
- **Time Management** : 7h 28m, +27m vert, sparkline SVG avec tooltip 2h 45m, labels Mon–Fri
- **Recent Projects** : 4 cartes 2×2 (Rewardino 90%, Spexcircle 67%, Arify 40%, Scuba 80%)

---

## 🎨 Design System

| Token          | Valeur                        |
|----------------|-------------------------------|
| Fond global    | `#F5F6FA`                     |
| Couleur primaire | `violet-600` (#7c3aed)      |
| Accent         | `pink-500` (#ec4899)          |
| Cartes         | Blanc, `border-radius: 16px`  |
| Ombres         | `0 2px 12px rgba(0,0,0,0.06)` |
| Typographie    | Inter (Google Fonts)          |
| Animation      | `fadeIn` 0.4s ease-out        |

---

## 🤝 Contribuer

1. Forkez le dépôt
2. Créez votre branche : `git checkout -b feature/ma-fonctionnalite`
3. Commitez vos changements : `git commit -m 'feat: ajout de ma fonctionnalité'`
4. Pushez : `git push origin feature/ma-fonctionnalite`
5. Ouvrez une Pull Request

---

## 📄 Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](./LICENSE) pour plus de détails.

---

<div align="center">
  <p>Fait avec 🩷 par l'équipe Ataksi</p>
</div>
