import { useState } from "react";
import "./Puzzle1.css";

// Modifier ici la réponse attendue (insensible à la casse)
const CORRECT_ANSWER = "lafarge";

export default function Puzzle1({ onSolve, onBack }) {
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState(null); // null | "wrong" | "correct"
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const check = () => {
    const clean = answer.trim().toLowerCase();
    if (clean === CORRECT_ANSWER.toLowerCase()) {
      setStatus("correct");
    } else {
      setAttempts(a => a + 1);
      setStatus("wrong");
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") check();
  };

  return (
    <div className="p1-root">

      {/* ── Navigation ── */}
      <div className="p1-nav">
        <button className="p1-nav-back" onClick={onBack}>← Retour</button>
        <div className="p1-nav-crumb">
          <span className="p1-nav-step">Énigme 1</span>
          <span className="p1-nav-sep">/</span>
          <span className="p1-nav-title">Le mail anonyme</span>
        </div>
        <div className="p1-nav-badge">🔍 En cours</div>
      </div>

      <div className="p1-body">

        {/* ── Email viewer ── */}
        <div className="p1-email-panel">

          {/* Topbar style mail */}
          <div className="mail-topbar">
            <span className="mail-topbar-logo">✉ SECUREMAILPRO</span>
            <input className="mail-topbar-search" readOnly placeholder="Rechercher dans les messages…" />
            <div className="mail-topbar-avatar">MJ</div>
          </div>

          {/* Email content */}
          <div className="mail-scroll">
            <div className="mail-toolbar">
              <button className="mail-btn">↩ Répondre</button>
              <button className="mail-btn">↪ Transférer</button>
              <button className="mail-btn">🗂 Archiver</button>
              <button className="mail-btn mail-btn--danger">🗑 Supprimer</button>
            </div>

            <div className="mail-subject">URGENT — Trafic de quotas carbone</div>

            <div className="mail-header-card">
              <div className="mail-header-row">
                <div className="mail-avatar">SL</div>
                <div className="mail-sender-info">
                  <div className="mail-sender-name">anonyme</div>
                  <div className="mail-sender-email">anonyme@gmail.fr</div>
                </div>
                <div className="mail-date">11 mai 2026 — 10:42</div>
              </div>
              <div className="mail-meta">
                <div className="mail-meta-row">
                  <span className="mail-meta-lbl">À</span>
                  <span className="mail-meta-chip">m.journaliste@redaction-enquete.fr</span>
                </div>
                <div className="mail-meta-row">
                  <span className="mail-meta-lbl">CC</span>
                  <span className="mail-meta-chip">r.fontaine@investigativ-presse.fr</span>
                  <span className="mail-meta-chip">direction@investigativ-presse.fr</span>
                </div>
                <div className="mail-meta-row">
                  <span className="mail-meta-lbl">Objet</span>
                  <span className="mail-meta-subject">URGENT — Trafic de quotas carbone</span>
                </div>
              </div>
            </div>

            <div className="mail-body-text">
              <p>Bonjour,</p>
              <p>
                Le sujet dont j'ai à vous parler aujourd'hui est de la plus haute importance.
                À l'heure actuelle, une entreprise trafique ses quotas carbones. Flaurient,
                un employé de l'entreprise m'a contactée pour m'avertir.
              </p>
              <p>
                Apparemment, elle aurait reçu <strong>142&nbsp;000 quotas carbones en trop</strong>.
                Récemment, de plus en plus d'usines ont été construites en France par cette entreprise.
                Grâce à ces informations, vous avez la possibilité de trouver le nom de cette entreprise
                et de mener votre enquête.
              </p>
              <p>En vous souhaitant bon courage, vous en aurez besoin.</p>
              <p>
                Cordialement.<br /><br />
              </p>
            </div>
          </div>
        </div>

        {/* ── Side panel : contexte + réponse ── */}
        <div className="p1-side">

          <div className="p1-clues-card">
            <div className="p1-card-label">🔎 INDICES DISPONIBLES</div>
            <ul className="p1-clues-list">
              <li>
                <span className="p1-clue-icon">💡</span>
                <button className="p1-hint-btn" onClick={() => setShowHint(h => !h)}>
                  {showHint ? "Masquer l'indice supplémentaire" : "Révéler un indice supplémentaire"}
                </button>
                {showHint && (
                  <span className="p1-hint-text">
                    Le mail contient déjà tous les indices nécessaires. Relis-le attentivement — le type d'activité de l'entreprise y est mentionné.
                  </span>
                )}
              </li>
            </ul>
          </div>

          {/* Answer input */}
          <div className="p1-answer-card">
            <div className="p1-card-label">✏️ VOTRE RÉPONSE</div>
            <p className="p1-answer-question">
              Quel est le nom de l'entreprise fraudeuse ?
            </p>

            {status !== "correct" ? (
              <>
                <input
                  className={`p1-input ${status === "wrong" ? "p1-input--wrong" : ""}`}
                  type="text"
                  placeholder="Nom de l'entreprise…"
                  value={answer}
                  onChange={e => { setAnswer(e.target.value); setStatus(null); }}
                  onKeyDown={handleKey}
                  autoComplete="off"
                />
                <button className="p1-submit-btn" onClick={check} disabled={!answer.trim()}>
                  Valider →
                </button>
                {status === "wrong" && (
                  <div className="p1-feedback p1-feedback--wrong">
                    ✗ Mauvaise réponse
                    {attempts >= 2 && " — consultez les indices à gauche"}
                  </div>
                )}
              </>
            ) : (
              <div className="p1-feedback p1-feedback--correct">
                <div className="p1-correct-icon">✓</div>
                <div>
                  <strong>Bonne réponse !</strong>
                  <p>Vous avez identifié l'entreprise. L'enquête continue…</p>
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
