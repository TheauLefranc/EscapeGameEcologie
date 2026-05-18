import { useState, useEffect, useRef } from 'react';
import EuropeMap from "./components/EuropeMap";
import EscapeGame from "./components/EscapeGame";
import carbonLogo from "./carbon_unit_logo_v2.svg";
import * as d3 from "d3";
import "./App.css";

function App() {
  const [view, setView] = useState('home');
  const [etsData, setEtsData] = useState({});
  const [years, setYears] = useState([]);
  const [currentYear, setCurrentYear] = useState(2005);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [globalMax, setGlobalMax] = useState(0);
  const mapSectionRef = useRef(null);

  useEffect(() => {
    d3.dsv(";", "/data/ETS.csv").then((data) => {
      const filteredData = data.filter(d =>
        d["Main Activity Code"] === "20-99" &&
        d["Unit"] === "tonne of CO2 equ." &&
        d["ETS information"] === "2. Verified emissions" &&
        d["Country Code"] !== "All Countries"
      );

      const uniqueYears = [...new Set(filteredData.map(d => parseInt(d.Year)))].sort((a, b) => a - b);
      setYears(uniqueYears);
      if (uniqueYears.length > 0) setCurrentYear(uniqueYears[0]);

      const processedData = {};
      let maxVal = 0;

      filteredData.forEach(row => {
        const year = parseInt(row.Year);
        const countryName = row["Country"];
        const value = parseFloat(row.Value);
        if (!processedData[year]) processedData[year] = {};
        processedData[year][countryName] = value;
        if (value > maxVal) maxVal = value;
      });

      setEtsData(processedData);
      setGlobalMax(maxVal);
      setDataLoaded(true);
    });
  }, []);

  const scrollToMap = () => {
    mapSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (view === 'game') {
    return <EscapeGame onBack={() => setView('home')} />;
  }

  return (
    <div className="page">

      {/* ── Hero ── */}
      <header className="hero">
        <div className="hero-bg-orb hero-bg-orb--green" />
        <div className="hero-bg-orb hero-bg-orb--blue" />

        <nav className="hero-nav">
          <img src={carbonLogo} className="nav-logo" alt="Carbon Unit" />
          <button className="nav-game-btn" onClick={() => setView('game')}>
            Lancer l'enquête →
          </button>
        </nav>

        <div className="hero-content">
          <img src={carbonLogo} className="hero-logo-badge" alt="Carbon Unit — Division Quotas" />
          <div className="hero-eyebrow">Données réelles · UE ETS · 2005–2023</div>

          <h1 className="hero-title">
            Le marché des<br />
            <span className="hero-accent">crédits carbone</span><br />
            en Europe
          </h1>

          <p className="hero-sub">
            Explorez 18 ans d'émissions CO₂ vérifiées à travers l'Europe,
            puis plongez dans un escape game pour comprendre les enjeux
            du marché carbone européen.
          </p>

          <div className="hero-ctas">
            <button className="cta-primary" onClick={() => setView('game')}>
              <span className="cta-icon">🎮</span>
              Lancer l'Escape Game
            </button>
            <button className="cta-secondary" onClick={scrollToMap}>
              <span className="cta-icon">🗺️</span>
              Explorer la carte
            </button>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-value">30+</div>
              <div className="hero-stat-label">pays participants</div>
            </div>
            <div className="hero-stat-sep" />
            <div className="hero-stat">
              <div className="hero-stat-value">2005</div>
              <div className="hero-stat-label">création de l'UE ETS</div>
            </div>
            <div className="hero-stat-sep" />
            <div className="hero-stat">
              <div className="hero-stat-value">18 ans</div>
              <div className="hero-stat-label">de données</div>
            </div>
          </div>
        </div>

        <div className="hero-scroll-hint" onClick={scrollToMap}>
          <span>Voir la carte</span>
          <span className="hero-scroll-arrow">↓</span>
        </div>
      </header>

      {/* ── Map section ── */}
      <section className="map-section" ref={mapSectionRef}>
        <div className="map-section-header">
          <div className="map-section-eyebrow">Données interactives</div>
          <h2 className="map-section-title">Émissions CO₂ vérifiées par pays</h2>
          <p className="map-section-sub">
            Utilisez le curseur pour naviguer entre les années. Cliquez sur un pays pour zoomer.
          </p>
        </div>

        {dataLoaded && years.length > 0 && (
          <div className="slider-card">
            <label className="slider-label" htmlFor="year-slider">
              Année sélectionnée : <strong>{currentYear}</strong>
            </label>
            <input
              id="year-slider"
              type="range"
              min={years[0]}
              max={years[years.length - 1]}
              value={currentYear}
              onChange={e => setCurrentYear(parseInt(e.target.value))}
              step="1"
              className="slider"
            />
            <div className="slider-bounds">
              <span>{years[0]}</span>
              <span>{years[years.length - 1]}</span>
            </div>
          </div>
        )}

        <div className="map-wrapper">
          <EuropeMap
            data={etsData[currentYear] || {}}
            maxVal={globalMax}
          />
        </div>

        {/* CTA en bas de la carte */}
        <div className="map-cta-banner">
          <div className="map-cta-text">
            <strong>Prêt à jouer ?</strong>
            <span> Utilisez ces données dans l'escape game pour résoudre l'enquête.</span>
          </div>
          <button className="cta-primary cta-small" onClick={() => setView('game')}>
            🎮 Lancer l'Escape Game
          </button>
        </div>
      </section>

      <footer className="site-footer">
        Sources : Agence Européenne pour l'Environnement (AEE) · © EuroGeographics
      </footer>
    </div>
  );
}

export default App;
