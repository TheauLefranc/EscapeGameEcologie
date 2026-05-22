import { useState } from "react";
import "./puzzle-shared.css";

const CORRECT_ANSWER = "184210";

export default function Puzzle6({ gameState, onBack, onSolve }) {
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);

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
          <span className="p1-nav-step">Énigme 7</span>
          <span className="p1-nav-sep">/</span>
          <span className="p1-nav-title">Enigme du code-barres</span>
        </div>
        <div className="p1-nav-badge">🔍 En cours</div>
      </div>

      <div className="p1-body">

        {/* ── Panneau gauche ── */}
        <div className="p1-doc-panel">
          <div className="doc-title">█▌█ Code-barres — Badge d'accès</div>
          <p style={{ fontSize: "0.85rem", color: "#555", marginBottom: "1rem" }}>
            Ce code-barres figure sur le badge retrouvé dans l'usine.
            Il encode un nombre qui correspond aux <strong>émissions vérifiées déclarées</strong> par l'entreprise.
          </p>

          <div style={{ marginBottom: "1.5rem", background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "8px", padding: "1.25rem" }}>
            <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#888", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Code-barres — Badge industriel
            </div>
            <img
              src="/data/code_barre.png"
              alt="Code-barres — Badge industriel"
              style={{ width: "100%", maxWidth: "360px", display: "block", margin: "0 auto", imageRendering: "pixelated" }}
            />
          </div>

        </div>

        {/* ── Panneau droit ── */}
        <div className="p1-side">

          <div className="p1-context-card">
            <div className="p1-card-label">📌 CONTEXTE</div>
            <p>
              Dans les archives de l'usine, un badge portant un code-barres a été retrouvé.
              Ce code-barres encode discrètement les <strong>émissions vérifiées déclarées</strong>
              par Lafarge pour cette installation.
            </p>
            <p>
              En croisant ce chiffre avec les données EU ETS et les informations
              de la source, vous pourrez calculer l'ampleur exacte de la fraude.
            </p>
          </div>

          <div className="p1-clues-card">
            <div className="p1-card-label">🔎 INDICES</div>
            <ul className="p1-clues-list">
              <li>
                <span className="p1-clue-icon">█▌</span>
                Le code-barres est de type <strong>EAN-13</strong> (13 chiffres visibles)
              </li>
              <li>
                <span className="p1-clue-icon">📊</span>
                Scannez le code-barres avec l'<strong>appareil photo de votre téléphone</strong> ou une application dédiée. Les 13 chiffres affichés sous le code sont la réponse (sans le premier chiffre de vérification).
              </li>
              <li>
                <span className="p1-clue-icon">💡</span>
                <button className="p1-hint-btn" onClick={() => setShowHint(h => !h)}>
                  {showHint ? "Masquer l'indice" : "Révéler un indice supplémentaire"}
                </button>
                {showHint && (
                  <span className="p1-hint-text">
                    Le nombre encodé est à 6 chiffres. Cherchez les 6 chiffres centraux du code-barres EAN-13 (chiffres 2 à 7).
                  </span>
                )}
              </li>
            </ul>
          </div>

          <div className="p1-answer-card">
            <div className="p1-card-label">✏️ VOTRE RÉPONSE</div>
            <p className="p1-answer-question">
              Quel nombre est encodé dans le code-barres ?
            </p>

            {status !== "correct" ? (
              <>
                <input
                  className={`p1-input ${status === "wrong" ? "p1-input--wrong" : ""}`}
                  type="text"
                  placeholder="Nombre entier…"
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
                    ✗ Nombre incorrect{attempts >= 2 && " — relisez attentivement le code-barres"}
                  </div>
                )}
              </>
            ) : (
              <div className="p1-feedback p1-feedback--correct">
                <div className="p1-correct-icon">✓</div>
                <div>
                  <strong>Nombre trouvé : {CORRECT_ANSWER}</strong>
                  <p>
                    Ce chiffre représente les émissions déclarées. Croisé avec les données
                    de la source, il permet de calculer le surplus frauduleux.
                  </p>
                </div>
                <div style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)", borderLeft: "3px solid #f59e0b", borderRadius: "6px", padding: "10px 12px" }}>
                  <div style={{ fontSize: "0.6rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#f59e0b", marginBottom: "6px", fontFamily: "var(--font-mono)" }}>
                    Décryptage — Marché des crédits carbone
                  </div>
                  <p style={{ fontSize: "0.8rem", color: "#fde68a", lineHeight: 1.65, margin: 0 }}>
                    Ce chiffre de 184 210 t CO₂ est ce que Lafarge a officiellement déclaré avoir émis. Mais une émission « vérifiée » dans l'EU ETS n'est pas mesurée physiquement : elle est calculée à partir de données fournies par l'entreprise, puis contrôlées par un vérificateur accrédité. Ce système a montré ses limites — les vérificateurs peuvent sous-estimer les émissions par manque de moyens, par conflit d'intérêts, ou simplement faute de remettre en cause les chiffres qu'on leur soumet.
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
