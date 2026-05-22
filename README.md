# Escape Game Écologie — Fraude aux quotas carbone

Un escape game éducatif en ligne qui plonge les joueurs dans une enquête journalistique sur la fraude aux quotas carbone de Lafarge (2016), inspirée du reportage Cash Investigation.

## Concept

Les joueurs incarnent des journalistes d'investigation. En résolvant 8 énigmes interdépendantes, ils reconstituent le mécanisme par lequel Lafarge a perçu 142 000 quotas carbone excédentaires grâce à une usine inactive — et les a revendus sur le marché européen EU ETS.

À chaque énigme résolue, un éclairage critique sur le fonctionnement du marché des crédits carbone est présenté, du point de vue de la transition écologique.

## Démarrage

```bash
npm install
npm run dev
```

Le serveur se lance sur `http://localhost:5173`.

```bash
npm run build   # build production
npm run preview # prévisualiser le build
```

### Docker

```bash
docker compose up
```

## Structure des énigmes

| # | Énigme | Mécanique | Réponse |
|---|--------|-----------|---------|
| 1 | Le mail anonyme | Analyser un courriel pour identifier l'entreprise | `lafarge` |
| 2 | Le coffre-fort | Carte EU ETS 2016 + codes ISO 3166-1 | `250` |
| 3 | Les bâtonnets | Déchiffrer un code tally | `951` |
| 4 | Les coordonnées GPS | Croiser deux retranscriptions audio | coordonnées GPS |
| 5 | Entrer dans l'usine | Street View 2011 + dialogue gardien | `9512` |
| 6 | Les archives | Retranscription source + photo 2014 | `3512` |
| 7 | Le code-barres | Scanner un EAN-13 (émissions déclarées) | `184210` |
| 8 | Le surplus | Calcul quotas alloués − émissions vérifiées | `142000` |

## Structure du projet

```
src/
├── components/
│   ├── EscapeGame.jsx      # Machine d'état principale (intro / hub / puzzles / fin)
│   ├── GameHub.jsx         # Tableau de bord — documents et accès aux énigmes
│   ├── DocumentViewer.jsx  # Lecteur de documents débloqués
│   ├── EuropeMap.jsx       # Carte interactive EU ETS (D3 + GeoViz)
│   ├── Puzzle1.jsx         # Énigme 1 — mail anonyme
│   ├── PuzzleCoffre.jsx    # Énigme 2 — coffre-fort
│   ├── Puzzle2.jsx         # Énigme 3 — bâtonnets
│   ├── Puzzle3.jsx         # Énigme 4 — coordonnées GPS
│   ├── Puzzle4.jsx         # Énigme 5 — accès usine
│   ├── Puzzle5.jsx         # Énigme 6 — archives
│   ├── Puzzle6.jsx         # Énigme 7 — code-barres
│   ├── Puzzle7.jsx         # Énigme 8 — calcul surplus
│   └── puzzle-shared.css   # Styles communs aux puzzles
├── App.jsx                 # Page d'accueil avec carte EU ETS animée
└── index.css               # Variables CSS globales (thème sombre)
public/
└── data/
    ├── ETS.csv             # Données réelles EU ETS 2005-2023
    ├── Pays.json           # GeoJSON pays européens
    ├── Papier_trouve.jpg   # Document en jeu (énigme bâtonnets)
    ├── carte_de_visite-1.png
    └── code_barre.png      # EAN-13 (énigme 7)
```

## Technologies

- **React 18** + **Vite 5**
- **D3.js 7** — visualisation des données EU ETS
- **GeoViz** — rendu cartographique
- **CSS custom properties** — thème sombre cohérent

## Données

Les données d'émissions proviennent de la base officielle EU ETS de l'Agence européenne pour l'environnement (émissions vérifiées et quotas alloués, 2005-2023). Le cas Lafarge est documenté et vérifiable dans cette base.

## Contexte pédagogique

Chaque énigme résolue déclenche un encart d'analyse critique sur le marché des crédits carbone (sur-allocation initiale, opacité des échanges, asymétrie d'information, déconnexion marchés/terrain, etc.). L'angle éditorial est celui de la transition écologique.

Le jeu se conclut par une page de ressources : Cash Investigation, Commission européenne, Carbon Market Watch, Réseau Action Climat, EEA.
