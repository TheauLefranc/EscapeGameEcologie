# React Bertin Server

Une application de cartographie écologique combinant **React** avec la bibliothèque **Bertin**.

## 🚀 Démarrage rapide

### Installation des dépendances

```bash
npm install
```

### Lancement du serveur de développement

```bash
npm run dev
```

Le serveur se lancera automatiquement sur `http://localhost:3000`

### Build pour la production

```bash
npm run build
```

## 📁 Structure du projet

```
EscapeGame/
├── src/
│   ├── components/
│   │   └── Map.jsx          # Composant carte Bertin
│   ├── App.jsx              # Composant principal
│   ├── App.css              # Styles de l'application
│   ├── main.jsx             # Point d'entrée React
│   └── index.css            # Styles globaux
├── index.html               # Template HTML
├── vite.config.js           # Configuration Vite
├── package.json             # Dépendances et scripts
└── README.md                # Ce fichier
```

## 📚 Technologies utilisées

- **React 18** - Bibliothèque UI
- **Vite** - Bundler et serveur de développement
- **Bertin** - Bibliothèque de cartographie
- **CSS3** - Styling

## 🗺️ Fonctionnalités

✅ Affichage de cartes géographiques interactives  
✅ Intégration avec des données GeoJSON  
✅ Interface utilisateur moderne et responsive  
✅ Panneau d'informations collapsible  
✅ Visualisation de données écologiques  

## 🎨 Customisation

### Ajouter de nouvelles couches cartographiques

Modifiez le fichier `src/components/Map.jsx` pour ajouter ou modifier les couches :

```javascript
{
  type: "geo",
  data: "votre-geojson-url",
  fill: "#couleur",
  stroke: "white"
}
```

### Modifier les styles

Éditez `src/App.css` pour personnaliser le design de l'application.

## 📖 Documentation Bertin

Pour en savoir plus sur les capacités de Bertin :
- [Documentation officielle](https://github.com/neocarto/bertin)
- [Exemples et démos](https://observablehq.com/@neocarto/bertin)

## 📝 Notes

Cette application est conçue pour des projets de cartographie écologique et peut être étendue avec :
- Des données dynamiques via une API
- Des filtres et critères de visualisation
- Des interactions utilisateur avancées
- Des exports de cartes

## 💡 Tips

- Utilisez les outils de développement de Bertin pour déboguer les couches
- Testez avec différentes données GeoJSON
- Pensez à optimiser les données géographiques volumineuses

---

Enjoy! 🌍
