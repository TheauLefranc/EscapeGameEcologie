import { useState } from "react";
import "./puzzle-shared.css";

// ⚠ À remplacer par la vraie réponse
const CORRECT_ANSWER = "3512";

const LINES_FLAURIENT = [
  { speaker: "Journaliste", text: "Flaurient ? C'est bien vous qui avez envoyé le mail anonyme ?", highlight: false },
  { speaker: "Flaurient",   text: "Chut. Oui, c'est moi. Je n'ai pas beaucoup de temps.", highlight: false },
  { speaker: "Journaliste", text: "Que pouvez-vous nous apprendre de plus sur la fraude ?", highlight: false },
  { speaker: "Flaurient",   text: "Tout est dans les archives de l'usine. Mais l'accès est restreint. Il vous faut le code de la salle des archives.", highlight: true },
  { speaker: "Journaliste", text: "Quel code ? Vous pouvez nous le donner directement ?", highlight: false },
  { speaker: "Flaurient",   text: "Impossible, il y a des caméras partout. Mais cherchez sur le réseau interne — il y a un document de réservation avec le numéro de salle.", highlight: true },
  { speaker: "Journaliste", text: "Un document de réservation ?", highlight: false },
  { speaker: "Flaurient",   text: "Oui. La réservation de la salle de réunion annuelle. Le numéro de salle utilisé cette année-là est votre code. Cherchez le fameux document de 2014.", highlight: true },
  { speaker: "Journaliste", text: "Nous avons une photo de Frangey datée de 2014. Est-ce que ça peut aider ?", highlight: false },
  { speaker: "Flaurient",   text: "Exactement. Regardez le numéro affiché sur la porte principale. C'est votre entrée.", highlight: true },
  { speaker: "Journaliste", text: "Merci. Nous allons enquêter.", highlight: false },
  { speaker: "Flaurient",   text: "Dépêchez-vous. Je ne peux pas rester ici.", highlight: false },
];

function TranscriptLine({ line }) {
  const isFlaurient = line.speaker === "Flaurient";
  const speakerColor = isFlaurient ? "#34d399" : "#60a5fa";

  return (
    <div className={`tr-line ${line.highlight ? "tr-line--highlight" : ""}`}>
      <span className="tr-speaker" style={{ color: speakerColor }}>
        {line.speaker}
      </span>
      <p className="tr-text">{line.text}</p>
    </div>
  );
}

export default function Puzzle5({ gameState, onBack, onSolve }) {
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const codeBarre = gameState.solvedPuzzles["puzzle4"] || null;

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
          <span className="p1-nav-step">Énigme 6</span>
          <span className="p1-nav-sep">/</span>
          <span className="p1-nav-title">Discussion avec l'employé</span>
        </div>
        <div className="p1-nav-badge">🔍 En cours</div>
      </div>

      <div className="p1-body">

        {/* ── Panneau gauche : discussion ── */}
        <div className="p1-audio-panel">
          <div className="audio-tabs">
            <button className="audio-tab active">💬 Discussion — Flaurient</button>
          </div>
          <div className="audio-content">
            <div className="audio-meta">
              <span className="audio-meta-chip">À l'intérieur de l'usine</span>
              <span className="audio-meta-chip">Source : Flaurient</span>
              <span className="audio-meta-chip">Caméra cachée</span>
            </div>
            <div className="tr-list">
              {LINES_FLAURIENT.map((line, i) => (
                <TranscriptLine key={i} line={line} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Panneau droit ── */}
        <div className="p1-side">

          <div className="p1-context-card">
            <div className="p1-card-label">📌 CONTEXTE</div>
            <p>
              À l'intérieur de l'usine, vous croisez Flaurient — votre source anonyme.
              Profitant d'un angle mort des caméras, il vous transmet discrètement
              des informations cruciales sur l'accès aux archives.
            </p>
            <p>Les lignes surlignées en jaune contiennent les indices clés.</p>
          </div>

          {codeBarre && (
            <div className="p1-clues-card">
              <div className="p1-card-label">🔑 ACCÈS OBTENU</div>
              <div className="acquired-clue">
                ✓ Code d'entrée usine — obtenu (Énigme 5)
              </div>
            </div>
          )}

          <div className="p1-clues-card">
            <div className="p1-card-label">🔎 INDICES COLLECTÉS</div>
            <ul className="p1-clues-list">
              <li>
                <span className="p1-clue-icon">📂</span>
                Chercher un <strong style={{ color: "#34d399" }}>document de réservation de 2014</strong>
              </li>
              <li>
                <span className="p1-clue-icon">🏭</span>
                Le numéro figure sur la <strong style={{ color: "#34d399" }}>photo Frangey 2014</strong>
              </li>
              <li>
                <span className="p1-clue-icon">💡</span>
                <button className="p1-hint-btn" onClick={() => setShowHint(h => !h)}>
                  {showHint ? "Masquer l'indice" : "Révéler un indice supplémentaire"}
                </button>
                {showHint && (
                  <span className="p1-hint-text">
                    Regardez attentivement la porte principale sur la photo de 2014. Un numéro de salle est affiché dessus — c'est votre code d'accès aux archives, à 4 chiffres.
                  </span>
                )}
              </li>
            </ul>
          </div>

          <div className="p1-answer-card">
            <div className="p1-card-label">✏️ CODE DES ARCHIVES</div>
            <p className="p1-answer-question">
              Quel est le code d'accès à la salle des archives ?
            </p>

            {status !== "correct" ? (
              <>
                <input
                  className={`p1-input ${status === "wrong" ? "p1-input--wrong" : ""}`}
                  type="text"
                  placeholder="Code à 4 chiffres…"
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
                    ✗ Code refusé{attempts >= 2 && " — examinez attentivement la photo Frangey 2014"}
                  </div>
                )}
              </>
            ) : (
              <div className="p1-feedback p1-feedback--correct">
                <div className="p1-correct-icon">✓</div>
                <div>
                  <strong>Accès aux archives !</strong>
                  <p>Vous entrez dans la salle des archives. Un code-barres sur un document attire votre attention.</p>
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
