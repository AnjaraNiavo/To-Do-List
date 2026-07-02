# TaskFlow — Frontend

Interface React pour l'application TaskFlow (gestionnaire de tâches).

## Stack

- **React 19** + **Vite**
- **Tailwind CSS 4**
- **JavaScript** (JSX)

## Démarrage

```bash
cd frontend
npm install
npm run dev
```

L'application sera disponible sur [http://localhost:5173](http://localhost:5173).

## Fonctionnalités (interface)

- Tableau de bord avec statistiques (total, terminées, en cours, complétion…)
- Liste des tâches avec filtres par statut
- Filtrage par projet via la sidebar
- Recherche par titre
- Création, modification et suppression de tâches
- Marquage rapide terminé / à faire
- Support des priorités, catégories, tags et échéances

> Les données sont actuellement **mockées** en local. Elles seront connectées au backend Django/PostgreSQL ultérieurement.

## Structure

```
src/
├── components/
│   ├── dashboard/   # Cartes statistiques
│   ├── layout/      # Sidebar, Header, Layout
│   ├── tasks/       # Liste, carte, formulaire, modal
│   └── ui/          # Composants réutilisables
├── constants/       # Labels priorités, statuts, catégories
├── data/            # Données de démonstration
├── hooks/           # useTasks (état local)
└── utils/           # Helpers de formatage
```
