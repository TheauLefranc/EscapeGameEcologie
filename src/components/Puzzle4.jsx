import { useState } from "react";
import "./puzzle-shared.css";

const CORRECT_ANSWER = "9512";

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
              <div style={{ fontSize: "0.88rem", color: "#475569", lineHeight: 1.7 }}>
                <p>Observez attentivement la façade de l'usine telle qu'elle était en 2011. Les inscriptions visibles sur le bâtiment contiennent un indice essentiel pour trouver le code d'accès.</p>
                <p style={{ marginTop: "0.75rem" }}>
                  <a
                    href="https://www.google.com/maps/@47.787667,4.069611,3a,75y,90t/data=!3m6!1e1!3m4!1s0x0:0x0!2e0!7i13312!8i6656"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#34d399", textDecoration: "underline" }}
                  >
                    Ouvrir la Street View de l'usine →
                  </a>
                </p>
              </div>
            </div>
          )}

          {/* Discussion gardien */}
          {section === "gardien" && (
            <div className="audio-content">
              <div className="audio-meta">
                <span className="audio-meta-chip">19/11/2016 — 10h36</span>
                <span className="audio-meta-chip">Durée : 1m36s</span>
                <span className="audio-meta-chip">Caméra cachée</span>
              </div>
              <div className="audio-transcript">
                {[
                  { speaker: "Gardien",     text: "Bonjour, vous êtes extérieur ?" },
                  { speaker: "Journaliste", text: "Non, en fait c'est mon premier jour, lui répondis-je." },
                  { speaker: "Gardien",     text: "Votre premier jour ! Soit vous mentez, soit vous êtes encore un de nos supérieurs descendus de Paris qui viennent faire un tour dans la région pour « contrôler que l'usine fonctionne correctement »." },
                  { speaker: "Journaliste", text: "En fait, je viens du siège social d'Issy Les Moulineaux. Comme vous le dites, on m'y a envoyé pour un contrôle." },
                  { speaker: "Gardien",     text: "D'accord, enregistrez vous sur ce carnet et vous pourrez passer. Vous aurez aussi besoin de ceci." },
                  { speaker: "Journaliste", text: "J'ouvre la grille avec ce badge ?" },
                  { speaker: "Gardien",     text: "Non, ce badge vous sert à accéder à toutes les zones gardées par mes collègues sans qu'ils aient besoin de m'appeler pour vérifier votre identité. D'ailleurs, le code barre ne fonctionne nulle part ! C'est à ce portail, celui qui est derrière vous, qu'il vous faudra entrer le code que le PDG vous a donné. Vu que beaucoup de personnes ont ce code et que le PDG ne veut pas le changer, on a ajouté une sécurité en plus du code en déplaçant des lettres sur la devanture de l'usine." },
                ].map((line, i) => (
                  <div key={i} style={{ marginBottom: "0.75rem" }}>
                    <strong style={{ color: line.speaker === "Gardien" ? "#94a3b8" : "#64748b" }}>{line.speaker} : </strong>
                    <span>{line.text}</span>
                  </div>
                ))}
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
                Sur la <strong>façade de l'usine</strong> (Street View 2011), un chiffre est visible. C'est le dernier élément du code.
              </li>
              <li>
                <span className="p1-clue-icon">💬</span>
                Le gardien explique que le code PDG est <strong>complété par un chiffre</strong> issu des lettres déplacées sur la devanture. Le code final = code bâtonnets + ce chiffre.
              </li>
              <li>
                <span className="p1-clue-icon">💡</span>
                <button className="p1-hint-btn" onClick={() => setShowHint(h => !h)}>
                  {showHint ? "Masquer l'indice" : "Révéler un indice supplémentaire"}
                </button>
                {showHint && (
                  <span className="p1-hint-text">
                    Le code est à 4 chiffres. Vous connaissez déjà les 3 premiers (Énigme 3). Trouvez le 4e sur la façade de l'usine dans la capture Street View.
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
