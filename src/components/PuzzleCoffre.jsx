import { useState, useEffect } from "react";
import * as d3 from "d3";
import EuropeMap from "./EuropeMap";
import "./puzzle-shared.css";
import "./PuzzleCoffre.css";

const CORRECT_ANSWER = "250";

const ISO_TABLE = [
  { pays: "Allemagne",       code: "276" },
  { pays: "Autriche",        code: "040" },
  { pays: "Belgique",        code: "056" },
  { pays: "Bulgarie",        code: "100" },
  { pays: "Chypre",          code: "196" },
  { pays: "Croatie",         code: "191" },
  { pays: "Danemark",        code: "208" },
  { pays: "Espagne",         code: "724" },
  { pays: "Estonie",         code: "233" },
  { pays: "Finlande",        code: "246" },
  { pays: "France",          code: "250" },
  { pays: "Grèce",           code: "300" },
  { pays: "Hongrie",         code: "348" },
  { pays: "Irlande",         code: "372" },
  { pays: "Islande",         code: "352" },
  { pays: "Italie",          code: "380" },
  { pays: "Lettonie",        code: "428" },
  { pays: "Liechtenstein",   code: "438" },
  { pays: "Lituanie",        code: "440" },
  { pays: "Luxembourg",      code: "442" },
  { pays: "Malte",           code: "470" },
  { pays: "Norvège",         code: "578" },
  { pays: "Pays-Bas",        code: "528" },
  { pays: "Pologne",         code: "616" },
  { pays: "Portugal",        code: "620" },
  { pays: "République tchèque", code: "203" },
  { pays: "Roumanie",        code: "642" },
  { pays: "Royaume-Uni",     code: "826" },
  { pays: "Slovaquie",       code: "703" },
  { pays: "Slovénie",        code: "705" },
  { pays: "Suède",           code: "752" },
];

export default function PuzzleCoffre({ gameState, onBack, onSolve }) {
  const [answer, setAnswer]     = useState("");
  const [status, setStatus]     = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const [mapData, setMapData]   = useState(null);
  const [maxVal, setMaxVal]     = useState(0);

  useEffect(() => {
    d3.dsv(";", "/data/ETS.csv").then((rows) => {
      const filtered = rows.filter(r =>
        r["Main Activity Code"] === "20-99" &&
        r["Unit"] === "tonne of CO2 equ." &&
        r["ETS information"] === "2. Verified emissions" &&
        r["Country Code"] !== "All Countries" &&
        parseInt(r.Year) === 2016
      );
      const byCountry = {};
      let max = 0;
      filtered.forEach(r => {
        const val = parseFloat(r.Value);
        byCountry[r["Country"]] = val;
        if (val > max) max = val;
      });
      setMapData(byCountry);
      setMaxVal(max);
    });
  }, []);

  const check = () => {
    if (answer.trim() === CORRECT_ANSWER) {
      setStatus("correct");
    } else {
      setAttempts(a => a + 1);
      setStatus("wrong");
    }
  };

  return (
    <div className="p1-root">

      {/* Nav */}
      <div className="p1-nav">
        <button className="p1-nav-back" onClick={onBack}>← Tableau de bord</button>
        <div className="p1-nav-crumb">
          <span className="p1-nav-step">Énigme 2</span>
          <span className="p1-nav-sep">/</span>
          <span className="p1-nav-title">Enigme du coffre fort</span>
        </div>
        <div className="p1-nav-badge">🔍 En cours</div>
      </div>

      <div className="p1-body">

        {/* ── Panneau gauche ── */}
        <div className="p1-doc-panel coffre-doc-panel">
          <div className="doc-title">🗺 Carte de l'Europe — Quotas carbone 2016</div>
          <p style={{ fontSize: "0.82rem", color: "#555", marginBottom: "0.75rem" }}>
            Émissions vérifiées (EU ETS, 2016). Les cercles jaunes sont proportionnels aux émissions de chaque pays participant.
          </p>

          {/* Carte interactive */}
          <div className="coffre-map-wrapper">
            {mapData
              ? <EuropeMap data={mapData} maxVal={maxVal} />
              : <div className="coffre-map-loading">Chargement de la carte…</div>
            }
          </div>

          {/* Tableau ISO 3166-1 */}
          <div className="coffre-iso-section">
            <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#888", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.6rem" }}>
              Codes ISO 3166-1 numérique — Pays participants UE ETS
            </div>
            <div className="coffre-iso-table-wrap">
              <table className="coffre-iso-table">
                <thead>
                  <tr>
                    <th>Pays</th>
                    <th>Code ISO 3166-1</th>
                  </tr>
                </thead>
                <tbody>
                  {ISO_TABLE.map(({ pays, code }) => (
                    <tr key={code}>
                      <td>{pays}</td>
                      <td className="coffre-iso-code">{code}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ── Panneau droit ── */}
        <div className="p1-side">

          <div className="p1-context-card">
            <div className="p1-card-label">📌 CONTEXTE</div>
            <p>
              En fouillant le bureau de Flaurient, vous avez découvert un coffre-fort.
              Son code est lié aux données de la carte des quotas carbone et
              aux codes standardisés des pays de l'UE ETS.
            </p>
          </div>

          <div className="p1-clues-card">
            <div className="p1-card-label">🔎 INDICES</div>
            <ul className="p1-clues-list">
              <li>
                <span className="p1-clue-icon">🗺</span>
                Identifiez le pays fraudeur sur la carte à partir des données 2016.
              </li>
              <li>
                <span className="p1-clue-icon">📊</span>
                Le code du coffre est le <strong style={{color:"#cbd5e1"}}>code ISO 3166-1 numérique</strong> de ce pays.
              </li>
              <li>
                <span className="p1-clue-icon">💡</span>
                <button className="p1-hint-btn" onClick={() => setShowHint(h => !h)}>
                  {showHint ? "Masquer l'indice" : "Révéler un indice supplémentaire"}
                </button>
                {showHint && (
                  <span className="p1-hint-text">
                    Le pays fraudeur est celui dont vous avez trouvé le siège social lors de l'Énigme 1.
                    Cherchez son code dans le tableau ci-contre.
                  </span>
                )}
              </li>
            </ul>
          </div>

          <div className="p1-answer-card">
            <div className="p1-card-label">✏️ VOTRE RÉPONSE</div>
            <p className="p1-answer-question">
              Quel est le code du coffre fort ?
            </p>

            {status !== "correct" ? (
              <>
                <input
                  className={`p1-input ${status === "wrong" ? "p1-input--wrong" : ""}`}
                  type="text"
                  placeholder="Code à 3 chiffres…"
                  value={answer}
                  onChange={e => { setAnswer(e.target.value); setStatus(null); }}
                  onKeyDown={e => e.key === "Enter" && check()}
                  autoComplete="off"
                />
                <button className="p1-submit-btn" onClick={check} disabled={!answer.trim()}>
                  Valider →
                </button>
                {status === "wrong" && (
                  <div className="p1-feedback p1-feedback--wrong">
                    ✗ Code incorrect{attempts >= 2 && " — vérifiez le code ISO 3166-1 numérique du pays"}
                  </div>
                )}
              </>
            ) : (
              <div className="p1-feedback p1-feedback--correct">
                <div className="p1-correct-icon">✓</div>
                <div>
                  <strong>Coffre ouvert !</strong>
                  <p>Un papier est découvert à l'intérieur. Un nouveau document est débloqué dans le tableau.</p>
                </div>
                <div style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)", borderLeft: "3px solid #f59e0b", borderRadius: "6px", padding: "10px 12px" }}>
                  <div style={{ fontSize: "0.6rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#f59e0b", marginBottom: "6px", fontFamily: "var(--font-mono)" }}>
                    Décryptage — Marché des crédits carbone
                  </div>
                  <p style={{ fontSize: "0.8rem", color: "#fde68a", lineHeight: 1.65, margin: 0 }}>
                    Cette carte des émissions européennes révèle une inégalité flagrante d'allocation entre pays. Dès ses premières phases (2005-2012), l'EU ETS a distribué des quotas largement excédentaires — souvent sous pression des lobbys industriels — faisant s'effondrer le prix du carbone à moins de 1 €. Un crédit carbone à ce prix n'incite à rien changer. Le marché a paradoxalement permis à des entreprises polluantes de vendre leurs excédents et de dégager des bénéfices sans réduire une seule tonne de CO₂.
                  </p>
                </div>
                <button className="p1-next-btn" onClick={() => onSolve(CORRECT_ANSWER)}>
                  Retour au tableau →
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
