import { useState } from "react";
import "./puzzle-shared.css";

// ⚠ À remplacer par les vraies coordonnées attendues
const CORRECT_ANSWER = "47°47'15.6\"N 4°04'10.6\"E";

const LINES_PDG = [
  { speaker: "Journaliste", text: "Bon… vous avez gagné.", highlight: false },
  { speaker: "M. Nort",     text: "Évidemment.", highlight: false },
  { speaker: "Journaliste", text: "Vous aviez l'air sûr de vous dès le début.", highlight: false },
  { speaker: "M. Nort",     text: "Parce que la partie était terminée à partir du moment où j'ai commencé à jouer. Vous étiez systématiquement en position perdante.", highlight: true },
  { speaker: "Journaliste", text: "Donc je n'avais aucune chance ?", highlight: false },
  { speaker: "M. Nort",     text: "Pas une seule.", highlight: false },
  { speaker: "Journaliste", text: "C'est un peu inquiétant dit comme ça.", highlight: false },
  { speaker: "M. Nort",     text: "Tous les systèmes fonctionnent comme ça. Les marchés, les négociations, les quotas carbone… En réalité, tout dépend de qui comprend les règles avant les autres.", highlight: false },
  { speaker: "Journaliste", text: "Vous comparez vraiment ça aux accusations contre votre entreprise ?", highlight: false },
  { speaker: "M. Nort",     text: "Évidemment. Vous savez, dans cette histoire, en aucun cas je n'ai triché ; je connais juste extrêmement bien les règles du jeu.", highlight: false },
  { speaker: "Journaliste", text: "Donc votre avantage, c'est simplement d'avoir commencé en premier ?", highlight: false },
  { speaker: "M. Nort",     text: "Exactement. Quand vous prenez la bonne position dès le départ, les autres passent leur temps à croire qu'ils jouent encore. Alors qu'ils suivent déjà la trajectoire que vous avez imposée.", highlight: false },
];

const LINES_SECRETAIRE = [
  { speaker: "Estelle",     text: "Vous êtes les journalistes qui ont interviewé M. Nort ?", highlight: false },
  { speaker: "Journaliste", text: "Oui c'est ça, nous sommes en train d'enquêter sur une affaire de fraude et nous avions besoin d'obtenir des informations de sa part.", highlight: false },
  { speaker: "Estelle",     text: "Des informations de quelle nature ?", highlight: false },
  { speaker: "Journaliste", text: "Tant que vous êtes là, puis-je vous interroger sur quelques détails ? Qu'est-ce que vous pensez de ces reventes de quotas carbones incohérentes qui surviennent en ce moment et qui pourraient cacher une fraude d'ampleur ?", highlight: false },
  { speaker: "Estelle",     text: "Je n'ai rien à vous dire.", highlight: false },
  { speaker: "Journaliste", text: "Permettez-moi au moins de vous demander votre nom et votre rôle dans l'entreprise ?", highlight: false },
  { speaker: "Estelle",     text: "Je pense pouvoir me permettre de répondre à cette question, mais à celle-là uniquement. Je suis Estelle, la secrétaire de M. Nort, cela fait bien longtemps que je travaille ici, je n'ai jamais eu de problème quels qu'ils soient et n'ai rien remarqué en ce qui concerne ses \"fraudes\".", highlight: false },
  { speaker: "Journaliste", text: "Vous n'avez pas l'air honnête.", highlight: false },
  { speaker: "Estelle",     text: "Permettez-moi de vous donner un conseil. Si vous souhaitez avancer dans votre enquête stupide, vous devriez arrêter de me parler et regarder le temps que vous avez perdu avec M. Nort et avec moi.", highlight: true },
  { speaker: "Journaliste", text: "Très bien, je m'arrête là. Vous accorderez que l'atmosphère est étrange ici, c'est comme si…", highlight: false },
  { speaker: "Estelle",     text: "Le temps et l'espace se relient formant une unité particulière, je vois très bien ce que vous voulez dire.", highlight: true },
  { speaker: "Journaliste", text: "Comment ça ?! Je n'ai absolument rien compris à ce que vous avez dit.", highlight: false },
  { speaker: "Estelle",     text: "Je vous fais perdre du temps pour le bien de votre enquête.", highlight: false },
];

function TranscriptLine({ line }) {
  const isNort    = line.speaker === "M. Nort";
  const isEstelle = line.speaker === "Estelle";
  const speakerColor = isNort ? "#f59e0b" : isEstelle ? "#c084fc" : "#60a5fa";

  return (
    <div className={`tr-line ${line.highlight ? "tr-line--highlight" : ""}`}>
      <span className="tr-speaker" style={{ color: speakerColor }}>
        {line.speaker}
      </span>
      <p className="tr-text">{line.text}</p>
    </div>
  );
}

export default function Puzzle3({ gameState, onBack, onSolve }) {
  const [tab, setTab] = useState("pdg");
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
          <span className="p1-nav-step">Énigme 4</span>
          <span className="p1-nav-sep">/</span>
          <span className="p1-nav-title">Enigme des coordonnées</span>
        </div>
        <div className="p1-nav-badge">🔍 En cours</div>
      </div>

      <div className="p1-body">

        {/* ── Panneau gauche : transcriptions ── */}
        <div className="p1-audio-panel">

          <div className="audio-tabs">
            <button className={`audio-tab ${tab === "pdg" ? "active" : ""}`} onClick={() => setTab("pdg")}>
              🎙 Audio 1 — M. Nort
            </button>
            <button className={`audio-tab ${tab === "secretaire" ? "active" : ""}`} onClick={() => setTab("secretaire")}>
              🎙 Audio 2 — Estelle
            </button>
          </div>

          {tab === "pdg" && (
            <div className="audio-content">
              <div className="audio-meta">
                <span className="audio-meta-chip">12/11/2016 · 09:58</span>
                <span className="audio-meta-chip">Durée : <strong style={{ color: "#10b981" }}>47,3 s</strong></span>
                </div>
              <div className="tr-list">
                {LINES_PDG.map((line, i) => <TranscriptLine key={i} line={line} />)}
              </div>
            </div>
          )}

          {tab === "secretaire" && (
            <div className="audio-content">
              <div className="audio-meta">
                <span className="audio-meta-chip">12/11/2016 · 10:26</span>
                <span className="audio-meta-chip">Durée : <strong style={{ color: "#10b981" }}>71,7 s</strong></span>
                </div>
              <div className="tr-list">
                {LINES_SECRETAIRE.map((line, i) => <TranscriptLine key={i} line={line} />)}
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
              Combinés, ils permettent de reconstituer des <strong>coordonnées GPS</strong> précises.
            </p>
            <p>Les lignes surlignées en jaune sont des indices clés.</p>
          </div>

          <div className="p1-clues-card">
            <div className="p1-card-label">🔎 INDICES COLLECTÉS</div>
            <ul className="p1-clues-list">
              <li>
                <span className="p1-clue-icon">🎙</span>
                M. Nort — Initiale&nbsp;<strong style={{color:"#f59e0b"}}>N</strong>&nbsp;·&nbsp;Durée&nbsp;<strong style={{color:"#f59e0b"}}>47,3 s</strong>
              </li>
              <li>
                <span className="p1-clue-icon">📍</span>
                Une ville : <strong style={{color:"#10b981"}}>Lezinnes</strong> — pointer la mairie&nbsp;
                <code style={{fontSize:"0.78rem", color:"#94a3b8"}}>47°48'02.9"N 4°38'22.3"E</code>
              </li>
              <li>
                <span className="p1-clue-icon">🎙</span>
                Estelle — Initiale&nbsp;<strong style={{color:"#c084fc"}}>E</strong>&nbsp;·&nbsp;Durée&nbsp;<strong style={{color:"#c084fc"}}>71,7 s</strong>
              </li>
              <li>
                <span className="p1-clue-icon">💬</span>
                <em>"…regardez le <strong style={{color:"#fde68a"}}>temps</strong> que vous avez perdu avec M. Nort et avec moi."</em>
              </li>
              <li>
                <span className="p1-clue-icon">💬</span>
                <em>"Le <strong style={{color:"#fde68a"}}>temps</strong> et l'<strong style={{color:"#fde68a"}}>espace</strong> se relient formant une unité particulière."</em>
              </li>
              <li>
                <span className="p1-clue-icon">💡</span>
                <button className="p1-hint-btn" onClick={() => setShowHint(h => !h)}>
                  {showHint ? "Masquer l'indice" : "Révéler un indice supplémentaire"}
                </button>
                {showHint && (
                  <span className="p1-hint-text">
                    En GPS, les coordonnées s'expriment en degrés°minutes'secondes". Les durées des enregistrements sont en secondes — la même unité. M. Nort (initiale N → latitude) et Estelle (initiale E → longitude) : soustrayez leur durée en arc-secondes aux coordonnées de Lézinnes.
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
                  placeholder="ex : 47°47'06.1&quot;N 4°04'22.4&quot;E"
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
                    ✗ Coordonnées incorrectes{attempts >= 2 && " — relisez les lignes surlignées"}
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
                <div style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)", borderLeft: "3px solid #f59e0b", borderRadius: "6px", padding: "10px 12px" }}>
                  <div style={{ fontSize: "0.6rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#f59e0b", marginBottom: "6px", fontFamily: "var(--font-mono)" }}>
                    Décryptage — Marché des crédits carbone
                  </div>
                  <p style={{ fontSize: "0.8rem", color: "#fde68a", lineHeight: 1.65, margin: 0 }}>
                    La réplique du PDG — « je connais juste extrêmement bien les règles du jeu » — résume une critique fondamentale du marché carbone : il favorise structurellement ceux qui disposent des meilleures ressources juridiques et financières. Les grandes entreprises emploient des équipes entières pour optimiser leurs positions carbone, là où les régulateurs manquent souvent de moyens humains pour contrôler. La transition écologique exige des réductions absolues et vérifiables — pas une compétition asymétrique entre lobbyistes industriels et inspecteurs sous-dotés.
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
