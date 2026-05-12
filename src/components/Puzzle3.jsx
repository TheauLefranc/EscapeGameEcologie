import { useState } from "react";
import "./puzzle-shared.css";

// ⚠ À remplacer par les vraies coordonnées attendues (ex: "47.78")
const CORRECT_ANSWER = "PLACEHOLDER_COORDS";

export default function Puzzle3({ gameState, onBack, onSolve }) {
  const [tab, setTab] = useState("pdg"); // "pdg" | "secretaire"
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
          <span className="p1-nav-title">Enigme des coordonnées</span>
        </div>
        <div className="p1-nav-badge">🔍 En cours</div>
      </div>

      <div className="p1-body">

        {/* ── Panneau gauche : retranscriptions audio ── */}
        <div className="p1-audio-panel">

          {/* Tabs */}
          <div className="audio-tabs">
            <button
              className={`audio-tab ${tab === "pdg" ? "active" : ""}`}
              onClick={() => setTab("pdg")}
            >
              🎙 Audio 1 — PDG
            </button>
            <button
              className={`audio-tab ${tab === "secretaire" ? "active" : ""}`}
              onClick={() => setTab("secretaire")}
            >
              🎙 Audio 2 — Secrétaire
            </button>
          </div>

          {/* Content PDG */}
          {tab === "pdg" && (
            <div className="audio-content">
              <div className="audio-meta">
                <span className="audio-meta-chip">Durée : 56,6 s</span>
                <span className="audio-meta-chip">Initiale : N</span>
                <span className="audio-meta-chip">Source : Flaurient</span>
              </div>
              <div className="audio-transcript">
                <p>[PLACEHOLDER — Insérer ici la retranscription de l'entretien avec le PDG]</p>
                <p>[Les indices à déduire : Initiale N · Durée 56,6 s · Ville : Lezinnes]</p>
              </div>
              <div className="placeholder-box placeholder-box--dark">
                <span style={{ fontSize: "1.4rem" }}>🎙</span>
                <span>[PLACEHOLDER — Extrait audio ou texte complet de l'entretien PDG]</span>
              </div>
            </div>
          )}

          {/* Content Secrétaire */}
          {tab === "secretaire" && (
            <div className="audio-content">
              <div className="audio-meta">
                <span className="audio-meta-chip">Durée : 52,4 s</span>
                <span className="audio-meta-chip">Initiale : E</span>
                <span className="audio-meta-chip">Source : Flaurient</span>
              </div>
              <div className="audio-transcript">
                <p>[PLACEHOLDER — Insérer ici la retranscription de l'entretien avec la secrétaire]</p>
                <p>[Les indices à déduire : Initiale E · Durée 52,4 s · note émissions · "regardez le temps que vous avez perdu avec nous"]</p>
              </div>
              <div className="placeholder-box placeholder-box--dark">
                <span style={{ fontSize: "1.4rem" }}>🎙</span>
                <span>[PLACEHOLDER — Extrait audio ou texte complet de l'entretien secrétaire]</span>
              </div>
            </div>
          )}
        </div>

        {/* ── Panneau droit ── */}
        <div className="p1-side">

          <div className="p1-context-card">
            <div className="p1-card-label">📌 CONTEXTE</div>
            <p>
              Ces deux entretiens ont été enregistrés à l'insu des interlocuteurs.
              Combinés au papier trouvé dans le bureau, ils permettent de reconstituer
              des <strong>coordonnées GPS</strong> précises.
            </p>
          </div>

          <div className="p1-clues-card">
            <div className="p1-card-label">🔎 INDICES COLLECTÉS</div>
            <ul className="p1-clues-list">
              <li>
                <span className="p1-clue-icon">🎙</span>
                Audio PDG : Initiale <strong>N</strong> · Durée <strong>56,6 s</strong> · Ville : <strong>Lezinnes</strong>
              </li>
              <li>
                <span className="p1-clue-icon">🎙</span>
                Audio secrétaire : Initiale <strong>E</strong> · Durée <strong>52,4 s</strong>
              </li>
              <li>
                <span className="p1-clue-icon">📄</span>
                Papier bureau : "Vous êtes systématiquement en position parlante"
              </li>
              <li>
                <span className="p1-clue-icon">💡</span>
                <button className="p1-hint-btn" onClick={() => setShowHint(h => !h)}>
                  {showHint ? "Masquer l'indice" : "Révéler un indice supplémentaire"}
                </button>
                {showHint && (
                  <span className="p1-hint-text">
                    [PLACEHOLDER — Indice supplémentaire pour déduire les coordonnées]
                  </span>
                )}
              </li>
            </ul>
          </div>

          <div className="p1-answer-card">
            <div className="p1-card-label">✏️ VOTRE RÉPONSE</div>
            <p className="p1-answer-question">
              Quelles sont les coordonnées GPS de l'usine ?
            </p>

            {status !== "correct" ? (
              <>
                <input
                  className={`p1-input ${status === "wrong" ? "p1-input--wrong" : ""}`}
                  type="text"
                  placeholder="ex : 47°4706.1&quot;N 4°04'22.4&quot;E"
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
                    ✗ Coordonnées incorrectes{attempts >= 2 && " — revisitez les deux transcriptions"}
                  </div>
                )}
              </>
            ) : (
              <div className="p1-feedback p1-feedback--correct">
                <div className="p1-correct-icon">✓</div>
                <div>
                  <strong>Coordonnées trouvées !</strong>
                  <p>L'usine est localisée. Un nouveau document est débloqué dans le tableau.</p>
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
