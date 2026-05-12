import { useState } from "react";
import "./puzzle-shared.css";

// ⚠ À remplacer par le vrai code d'accès
const CORRECT_ANSWER = "PLACEHOLDER_9512";

export default function Puzzle4({ gameState, onBack, onSolve }) {
  const [section, setSection] = useState("street"); // "street" | "gardien"
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const code951 = gameState.solvedPuzzles["puzzle2"] || null;

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
          <span className="p1-nav-step">Énigme 4</span>
          <span className="p1-nav-sep">/</span>
          <span className="p1-nav-title">Entrer dans l'usine</span>
        </div>
        <div className="p1-nav-badge">🔍 En cours</div>
      </div>

      <div className="p1-body">

        {/* ── Panneau gauche ── */}
        <div className="p1-scene-panel">

          {/* Tabs */}
          <div className="audio-tabs">
            <button
              className={`audio-tab ${section === "street" ? "active" : ""}`}
              onClick={() => setSection("street")}
            >
              🏭 Street View 2011
            </button>
            <button
              className={`audio-tab ${section === "gardien" ? "active" : ""}`}
              onClick={() => setSection("gardien")}
            >
              💬 Discussion gardien
            </button>
          </div>

          {/* Street View */}
          {section === "street" && (
            <div className="audio-content">
              <div className="audio-meta">
                <span className="audio-meta-chip">Usine Frangey</span>
                <span className="audio-meta-chip">Année 2011</span>
                <span className="audio-meta-chip">Google Street View</span>
              </div>
              <div className="placeholder-box placeholder-box--dark" style={{ minHeight: "260px" }}>
                <span style={{ fontSize: "2rem" }}>🏭</span>
                <span>[PLACEHOLDER — Insérer ici la capture Street View de l'usine de Frangey en 2011]</span>
              </div>
              <div style={{ fontSize: "0.88rem", color: "#475569", lineHeight: 1.7, marginTop: "1rem" }}>
                <p>[PLACEHOLDER — Observations à noter sur la photo : bâtiment, enseignes, code visible, éléments utiles pour trouver le code d'accès]</p>
              </div>
            </div>
          )}

          {/* Discussion gardien */}
          {section === "gardien" && (
            <div className="audio-content">
              <div className="audio-meta">
                <span className="audio-meta-chip">Dialogue retranscrit</span>
                <span className="audio-meta-chip">Source : Flaurient</span>
              </div>
              <div className="audio-transcript">
                <p>[PLACEHOLDER — Insérer ici le dialogue avec le gardien de l'usine]</p>
                <p>[L'échange doit permettre de déduire le code d'accès à l'usine]</p>
              </div>
              <div className="placeholder-box placeholder-box--dark">
                <span style={{ fontSize: "1.4rem" }}>💬</span>
                <span>[PLACEHOLDER — Texte complet de la discussion avec le gardien]</span>
              </div>
            </div>
          )}
        </div>

        {/* ── Panneau droit ── */}
        <div className="p1-side">

          <div className="p1-context-card">
            <div className="p1-card-label">📌 CONTEXTE</div>
            <p>
              Vous êtes devant l'usine. Pour entrer et recueillir les preuves finales,
              vous avez besoin du <strong>code d'accès</strong>.
            </p>
            <p>
              Utilisez la capture Street View, le dialogue avec le gardien,
              et le code obtenu lors de l'énigme des bâtonnets.
            </p>
          </div>

          {/* Code 951 acquis */}
          <div className="p1-clues-card">
            <div className="p1-card-label">🔑 CODE ACQUIS</div>
            {code951 ? (
              <div className="acquired-clue">
                ✓ Code 951 — obtenu (Énigme 2)
              </div>
            ) : (
              <p style={{ fontSize: "0.82rem", color: "#475569" }}>
                ⚠ Code 951 non encore obtenu — résolvez l'Énigme 2 d'abord
              </p>
            )}
          </div>

          <div className="p1-clues-card">
            <div className="p1-card-label">🔎 INDICES</div>
            <ul className="p1-clues-list">
              <li>
                <span className="p1-clue-icon">🏭</span>
                [PLACEHOLDER — Indice 1 tiré de la photo Street View]
              </li>
              <li>
                <span className="p1-clue-icon">💬</span>
                [PLACEHOLDER — Indice 2 tiré de la discussion avec le gardien]
              </li>
              <li>
                <span className="p1-clue-icon">💡</span>
                <button className="p1-hint-btn" onClick={() => setShowHint(h => !h)}>
                  {showHint ? "Masquer l'indice" : "Révéler un indice supplémentaire"}
                </button>
                {showHint && (
                  <span className="p1-hint-text">
                    [PLACEHOLDER — Indice supplémentaire pour trouver le code final]
                  </span>
                )}
              </li>
            </ul>
          </div>

          <div className="p1-answer-card">
            <div className="p1-card-label">✏️ CODE D'ACCÈS</div>
            <p className="p1-answer-question">
              Quel est le code pour entrer dans l'usine ?
            </p>

            {status !== "correct" ? (
              <>
                <input
                  className={`p1-input ${status === "wrong" ? "p1-input--wrong" : ""}`}
                  type="text"
                  placeholder="Code d'accès…"
                  value={answer}
                  onChange={e => { setAnswer(e.target.value); setStatus(null); }}
                  onKeyDown={e => e.key === "Enter" && check()}
                  autoComplete="off"
                />
                <button className="p1-submit-btn" onClick={check} disabled={!answer.trim()}>
                  Entrer →
                </button>
                {status === "wrong" && (
                  <div className="p1-feedback p1-feedback--wrong">
                    ✗ Code refusé{attempts >= 2 && " — relisez la discussion avec le gardien"}
                  </div>
                )}
              </>
            ) : (
              <div className="p1-feedback p1-feedback--correct">
                <div className="p1-correct-icon">✓</div>
                <div>
                  <strong>Accès accordé !</strong>
                  <p>Vous entrez dans l'usine et recueillez les preuves. L'enquête est bouclée.</p>
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
