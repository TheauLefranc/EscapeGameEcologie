import { useState } from "react";
import "./puzzle-shared.css";

// ⚠ À remplacer par la vraie réponse finale
const CORRECT_ANSWER = "142000";

export default function Puzzle7({ gameState, onBack, onSolve }) {
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const emissionsVerifiees = gameState.solvedPuzzles["puzzle6"] || null;

  const check = () => {
    if (answer.trim().replace(/\s/g, "") === CORRECT_ANSWER) {
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
          <span className="p1-nav-step">Énigme 8</span>
          <span className="p1-nav-sep">/</span>
          <span className="p1-nav-title">Enigme du surplus de quotas</span>
        </div>
        <div className="p1-nav-badge">🔍 En cours</div>
      </div>

      <div className="p1-body">

        {/* ── Panneau gauche ── */}
        <div className="p1-doc-panel">
          <div className="doc-title">📊 Synthèse des preuves collectées</div>
          <p style={{ fontSize: "0.85rem", color: "#555", marginBottom: "1.25rem" }}>
            Vous avez réuni toutes les pièces du dossier. Il ne reste plus qu'à
            calculer l'ampleur exacte de la fraude aux quotas carbone.
          </p>

          {/* Tableau de bord des preuves */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>

            <div style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.25)", borderRadius: "8px", padding: "0.9rem" }}>
              <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#10b981", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.4rem" }}>
                📋 Source — Mail anonyme
              </div>
              <p style={{ fontSize: "0.88rem", color: "#374151" }}>
                L'entreprise aurait reçu <strong>142 000 quotas carbone en trop</strong>.
              </p>
            </div>

            <div style={{ background: "rgba(96,165,250,0.08)", border: "1px solid rgba(96,165,250,0.25)", borderRadius: "8px", padding: "0.9rem" }}>
              <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#60a5fa", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.4rem" }}>
                📍 Entreprise identifiée
              </div>
              <p style={{ fontSize: "0.88rem", color: "#374151" }}>
                Lafarge — Siège social à Lezinnes. Usine à Frangey.
              </p>
            </div>

            <div style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.3)", borderRadius: "8px", padding: "0.9rem" }}>
              <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#f59e0b", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.4rem" }}>
                █▌ Code-barres — Émissions vérifiées déclarées
              </div>
              {emissionsVerifiees ? (
                <p style={{ fontSize: "0.88rem", color: "#374151" }}>
                  Nombre décodé : <strong style={{ color: "#f59e0b", fontSize: "1.1rem" }}>{emissionsVerifiees}</strong> tonnes CO₂
                </p>
              ) : (
                <p style={{ fontSize: "0.82rem", color: "#9ca3af", fontStyle: "italic" }}>
                  ⚠ Non encore résolu — complétez l'Énigme 7 d'abord
                </p>
              )}
            </div>

            <div style={{ background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "8px", padding: "0.9rem" }}>
              <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#888", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                📊 Données EU ETS — Quotas alloués (2016)
              </div>
              <table style={{ width: "100%", fontSize: "0.82rem", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
                    <th style={{ textAlign: "left", padding: "0.3rem 0.5rem", color: "#6b7280" }}>Installation</th>
                    <th style={{ textAlign: "right", padding: "0.3rem 0.5rem", color: "#6b7280" }}>Quotas alloués</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: "0.4rem 0.5rem", color: "#374151" }}>Lafarge — Usine Frangey</td>
                    <td style={{ padding: "0.4rem 0.5rem", textAlign: "right", fontWeight: 700, color: "#f59e0b" }}>326 210 t CO₂</td>
                  </tr>
                </tbody>
              </table>
              <p style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: "0.5rem" }}>
                Source : base de données EU ETS — Main Activity Code 20-99 — Verified emissions 2016
              </p>
            </div>

          </div>
        </div>

        {/* ── Panneau droit ── */}
        <div className="p1-side">

          <div className="p1-context-card">
            <div className="p1-card-label">📌 CONTEXTE</div>
            <p>
              Vous avez maintenant tous les éléments pour calculer le
              <strong> surplus frauduleux</strong> de quotas carbone.
            </p>
            <p>
              Croisez les émissions réellement vérifiées (code-barres),
              les quotas alloués (données EU ETS), et les informations
              transmises par votre source.
            </p>
          </div>

          <div className="p1-clues-card">
            <div className="p1-card-label">🔎 CALCUL</div>
            <ul className="p1-clues-list">
              <li>
                <span className="p1-clue-icon">📊</span>
                Quotas alloués − Émissions vérifiées = <strong>Surplus</strong>
              </li>
              <li>
                <span className="p1-clue-icon">📋</span>
                Données EU ETS 2016 : quotas alloués à l'installation = <strong>326 210 t CO₂</strong>
              </li>
              <li>
                <span className="p1-clue-icon">💡</span>
                <button className="p1-hint-btn" onClick={() => setShowHint(h => !h)}>
                  {showHint ? "Masquer l'indice" : "Révéler un indice supplémentaire"}
                </button>
                {showHint && (
                  <span className="p1-hint-text">
                    326 210 (quotas alloués) − 184 210 (émissions vérifiées) = surplus frauduleux. Vérifiez que ce résultat correspond à ce qu'annonce le mail de votre source.
                  </span>
                )}
              </li>
            </ul>
          </div>

          <div className="p1-answer-card">
            <div className="p1-card-label">✏️ VOTRE RÉPONSE</div>
            <p className="p1-answer-question">
              Quel est le nombre exact de quotas carbone frauduleusement obtenus ?
            </p>

            {status !== "correct" ? (
              <>
                <input
                  className={`p1-input ${status === "wrong" ? "p1-input--wrong" : ""}`}
                  type="text"
                  placeholder="Nombre de quotas…"
                  value={answer}
                  onChange={e => { setAnswer(e.target.value); setStatus(null); }}
                  onKeyDown={e => e.key === "Enter" && check()}
                  autoComplete="off"
                />
                <button className="p1-submit-btn" onClick={check} disabled={!answer.trim()}>
                  Soumettre →
                </button>
                {status === "wrong" && (
                  <div className="p1-feedback p1-feedback--wrong">
                    ✗ Réponse incorrecte{attempts >= 2 && " — relisez le mail de la source et les données EU ETS"}
                  </div>
                )}
              </>
            ) : (
              <div className="p1-feedback p1-feedback--correct">
                <div className="p1-correct-icon">✓</div>
                <div>
                  <strong>Dossier bouclé !</strong>
                  <p>
                    Vous avez prouvé que Lafarge a frauduleusement obtenu <strong>{CORRECT_ANSWER} quotas carbone</strong>.
                    Votre article va faire les gros titres.
                  </p>
                </div>
                <div style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)", borderLeft: "3px solid #f59e0b", borderRadius: "6px", padding: "10px 12px" }}>
                  <div style={{ fontSize: "0.6rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#f59e0b", marginBottom: "6px", fontFamily: "var(--font-mono)" }}>
                    Décryptage — Marché des crédits carbone
                  </div>
                  <p style={{ fontSize: "0.8rem", color: "#fde68a", lineHeight: 1.65, margin: 0 }}>
                    Ces 142 000 quotas revendus sur le marché représentent 142 000 tonnes de CO₂ qui n'ont jamais été réduites, mais dont des tiers ont acheté le « droit » de polluer. C'est la contradiction centrale du marché carbone : chaque quota frauduleux dilue l'intégrité du système global et autorise, ailleurs, une pollution supplémentaire réelle. La transition écologique exige des réductions absolues et vérifiables — le marché carbone, lui, vend du droit à émettre, avec tous les risques de dérive que cette logique financière implique.
                  </p>
                </div>
                <button className="p1-next-btn" onClick={() => onSolve(CORRECT_ANSWER)}>
                  Terminer l'enquête →
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
