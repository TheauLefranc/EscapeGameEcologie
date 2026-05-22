import { useState } from "react";
import "./puzzle-shared.css";

// ⚠ À remplacer par la vraie réponse
const CORRECT_ANSWER = "951";

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
          <span className="p1-nav-step">Énigme 3</span>
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

          {/* Note */}
          <div style={{ marginTop: "1.5rem", background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "8px", padding: "1rem" }}>
            <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#888", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Note manuscrite</div>
            <p style={{ fontSize: "0.9rem", color: "#555", fontStyle: "italic" }}>
              <img
                src="/data/Papier_trouve.jpg"
                alt="Papier trouvé"
                style={{ maxWidth: "100%", maxHeight: "60vh", borderRadius: "8px", boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}
              />
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
                <span className="p1-clue-icon">💡</span>
                <button className="p1-hint-btn" onClick={() => setShowHint(h => !h)}>
                  {showHint ? "Masquer l'indice" : "Révéler un indice supplémentaire"}
                </button>
                {showHint && (
                  <span className="p1-hint-text">
                    Les bâtonnets suivent le principe du comptage tally : 4 barres verticales + 1 barre diagonale = 5. Comptez chaque groupe séparément pour obtenir les chiffres un par un.
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
                <div style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)", borderLeft: "3px solid #f59e0b", borderRadius: "6px", padding: "10px 12px" }}>
                  <div style={{ fontSize: "0.6rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#f59e0b", marginBottom: "6px", fontFamily: "var(--font-mono)" }}>
                    Décryptage — Marché des crédits carbone
                  </div>
                  <p style={{ fontSize: "0.8rem", color: "#fde68a", lineHeight: 1.65, margin: 0 }}>
                    Ce code dissimulé reflète l'opacité qui caractérise les échanges de quotas carbone. Ces crédits s'échangent sur des marchés financiers complexes, via des intermédiaires, avec peu de traçabilité réelle. Cette opacité a facilité des fraudes massives : entre 2008 et 2009, des réseaux criminels ont détourné plus de 5 milliards d'euros via des carrousels de TVA sur les quotas européens. Le marché carbone a ainsi produit, en quelques années seulement, l'une des plus grandes fraudes fiscales de l'histoire de l'UE.
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
