import { useState } from "react";
import "./puzzle-shared.css";

// ⚠ À remplacer par la vraie réponse
const CORRECT_ANSWER = "PLACEHOLDER_CODE_951";

export default function Puzzle2({ gameState, onBack, onSolve }) {
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const check = () => {
    if (answer.trim().toLowerCase() === CORRECT_ANSWER.toLowerCase()) {
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
          <span className="p1-nav-title">Enigme des bâtonnets</span>
        </div>
        <div className="p1-nav-badge">🔍 En cours</div>
      </div>

      <div className="p1-body">

        {/* ── Panneau gauche : Papier trouvé ── */}
        <div className="p1-doc-panel">

          <div className="doc-title">📄 Papier trouvé (fouille du bureau)</div>

          <p style={{ fontSize: "0.85rem", color: "#555", marginBottom: "1rem" }}>
            Ce document a été récupéré lors de la perquisition du bureau de Flaurient.
            Il contient deux schémas codés.
          </p>

          {/* Schéma bâtonnets */}
          <div style={{ marginBottom: "0.5rem", fontSize: "0.75rem", fontWeight: 700, color: "#888", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Schéma des bâtonnets
          </div>
          <div className="placeholder-box">
            <span style={{ fontSize: "1.5rem" }}>📊</span>
            <span>[PLACEHOLDER — Insérer ici le schéma des bâtonnets]</span>
          </div>

          {/* Schéma positions */}
          <div style={{ marginBottom: "0.5rem", marginTop: "1rem", fontSize: "0.75rem", fontWeight: 700, color: "#888", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Schéma des positions sur la carte
          </div>
          <div className="placeholder-box">
            <span style={{ fontSize: "1.5rem" }}>🗺</span>
            <span>[PLACEHOLDER — Insérer ici le schéma des positions]</span>
          </div>

          {/* Note */}
          <div style={{ marginTop: "1.5rem", background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "8px", padding: "1rem" }}>
            <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#888", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Note manuscrite</div>
            <p style={{ fontSize: "0.9rem", color: "#555", fontStyle: "italic" }}>
              [PLACEHOLDER — Insérer ici la note manuscrite liée à l'énigme]
            </p>
          </div>
        </div>

        {/* ── Panneau droit ── */}
        <div className="p1-side">

          <div className="p1-context-card">
            <div className="p1-card-label">📌 CONTEXTE</div>
            <p>
              Ce schéma en bâtonnets a été retrouvé dans le bureau de l'employé.
              Il semble cacher un code numérique. Analysez la structure et les positions
              pour le déchiffrer.
            </p>
          </div>

          <div className="p1-clues-card">
            <div className="p1-card-label">🔎 INDICES</div>
            <ul className="p1-clues-list">
              <li>
                <span className="p1-clue-icon">📊</span>
                [PLACEHOLDER — Indice 1 sur le schéma des bâtonnets]
              </li>
              <li>
                <span className="p1-clue-icon">🗺</span>
                [PLACEHOLDER — Indice 2 sur les positions]
              </li>
              <li>
                <span className="p1-clue-icon">💡</span>
                <button className="p1-hint-btn" onClick={() => setShowHint(h => !h)}>
                  {showHint ? "Masquer l'indice" : "Révéler un indice supplémentaire"}
                </button>
                {showHint && (
                  <span className="p1-hint-text">
                    [PLACEHOLDER — Indice supplémentaire caché]
                  </span>
                )}
              </li>
            </ul>
          </div>

          <div className="p1-answer-card">
            <div className="p1-card-label">✏️ VOTRE RÉPONSE</div>
            <p className="p1-answer-question">
              Quel est le code obtenu grâce aux bâtonnets ?
            </p>

            {status !== "correct" ? (
              <>
                <input
                  className={`p1-input ${status === "wrong" ? "p1-input--wrong" : ""}`}
                  type="text"
                  placeholder="Code numérique…"
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
                    ✗ Code incorrect{attempts >= 2 && " — relisez attentivement le schéma"}
                  </div>
                )}
              </>
            ) : (
              <div className="p1-feedback p1-feedback--correct">
                <div className="p1-correct-icon">✓</div>
                <div>
                  <strong>Code trouvé !</strong>
                  <p>Ce code vous sera utile pour entrer dans l'usine.</p>
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
