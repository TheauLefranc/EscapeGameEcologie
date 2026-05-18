import "./GameHub.css";
import carbonLogo from "../carbon_unit_logo_v2.svg";

// ── Définition des documents ───────────────────────────────
const DOCS = [
  { id: "mail_source",          icon: "✉",  title: "Mail de la source" },
  { id: "carte_de_visite",      icon: "📇", title: "Carte de visite" },
  { id: "carte_europe_quotas",  icon: "🗺", title: "Carte Europe — Quotas carbone" },
  { id: "papier_trouve",        icon: "📄", title: "Papier trouvé (bureau)" },
  { id: "audio_pdg",            icon: "🎙", title: "Retranscription audio — PDG" },
  { id: "audio_secretaire",     icon: "🎙", title: "Retranscription audio — Secrétaire" },
  { id: "localisation_usine",   icon: "📍", title: "Localisation de l'usine" },
  { id: "street_view",          icon: "🏭", title: "Street View — Usine Frangey 2011" },
  { id: "discussion_gardien",   icon: "💬", title: "Discussion — Gardien d'usine" },
  { id: "badge",                icon: "🪪", title: "Badge — Site industriel" },
  { id: "frangey_2014",         icon: "📸", title: "Photo Frangey 2014" },
  { id: "code_barre_doc",       icon: "█▌", title: "Code-barres — Badge" },
];

// ── Définition des puzzles ─────────────────────────────────
// result      : la valeur affichée en permanence après résolution
// resultLabel : l'étiquette décrivant ce résultat
const PUZZLES = [
  {
    id: "puzzle1",
    num: "01",
    title: "Trouver l'entreprise",
    desc: "Une source vous a contacté. Analysez le mail et identifiez l'entreprise fraudeuse.",
    needs: [],
    needsLabel: null,
    needsExtra: null,
    result: "Lezinnes",
    resultLabel: "Siège social",
  },
  {
    id: "puzzle_coffre",
    num: "02",
    title: "Enigme du coffre fort",
    desc: "Un coffre est découvert dans le bureau. Son code est lié aux quotas carbone européens.",
    needs: ["carte_europe_quotas"],
    needsLabel: "Nécessite : Carte Europe des quotas",
    needsExtra: null,
    result: "250",
    resultLabel: "Code coffre",
  },
  {
    id: "puzzle2",
    num: "03",
    title: "Enigme des bâtonnets",
    desc: "Un papier trouvé dans le coffre contient un schéma codé. Déchiffrez-le.",
    needs: ["papier_trouve"],
    needsLabel: "Nécessite : Papier trouvé",
    needsExtra: null,
    result: "951",
    resultLabel: "Code bâtonnets",
  },
  {
    id: "puzzle3",
    num: "04",
    title: "Enigme des coordonnées",
    desc: "Les retranscriptions audio recèlent des coordonnées GPS cachées.",
    needs: ["audio_pdg", "audio_secretaire"],
    needsLabel: "Nécessite : 2 retranscriptions audio",
    needsExtra: null,
    result: "47°47'15.6\"N 4°04'10.6\"E",
    resultLabel: "Coordonnées usine",
  },
  {
    id: "puzzle4",
    num: "05",
    title: "Entrer dans l'usine",
    desc: "Vous avez localisé l'usine. Trouvez le code d'accès pour entrer.",
    needs: ["street_view", "discussion_gardien"],
    needsLabel: "Nécessite : Street View + Gardien + Code 951",
    needsExtra: "puzzle2",
    result: "9512",
    resultLabel: "Code d'accès",
  },
  {
    id: "puzzle5",
    num: "06",
    title: "Discussion avec l'employé",
    desc: "À l'intérieur de l'usine, vous croisez Flaurient. Il vous transmet discrètement des informations sur les archives.",
    needs: ["badge"],
    needsLabel: "Nécessite : Badge + Entrer dans l'usine (Énigme 5)",
    needsExtra: "puzzle4",
    result: "3512",
    resultLabel: "Code archives",
  },
  {
    id: "puzzle6",
    num: "07",
    title: "Enigme du code-barres",
    desc: "Un code-barres mystérieux figure sur le badge. Déchiffrez-le pour trouver un nombre clé.",
    needs: ["frangey_2014", "code_barre_doc"],
    needsLabel: "Nécessite : Photo Frangey 2014 + Code-barres",
    needsExtra: null,
    result: "184210",
    resultLabel: "Nombre mystère",
  },
  {
    id: "puzzle7",
    num: "08",
    title: "Enigme du surplus de quotas",
    desc: "Vous avez toutes les preuves. Calculez le surplus de quotas carbone frauduleux pour clore l'affaire.",
    needs: [],
    needsLabel: "Nécessite : résoudre l'Énigme 7 (code-barres)",
    needsExtra: "puzzle6",
    result: "142 000",
    resultLabel: "Surplus frauduleux",
  },
];

// ── Helpers ────────────────────────────────────────────────
function docStatus(id, gameState) {
  if (!gameState.unlockedDocs.includes(id)) return "locked";
  if (gameState.viewedDocs.includes(id))    return "viewed";
  return "available";
}

function puzzleStatus(puzzle, gameState) {
  if (gameState.solvedPuzzles[puzzle.id]) return "solved";
  const docsOk = puzzle.needs.every(d => gameState.viewedDocs.includes(d));
  const extraOk = !puzzle.needsExtra || gameState.solvedPuzzles[puzzle.needsExtra];
  return docsOk && extraOk ? "available" : "locked";
}

// ── Composant ──────────────────────────────────────────────
export default function GameHub({ gameState, onViewDoc, onGoPuzzle, onBack }) {
  const solved = Object.keys(gameState.solvedPuzzles).length;
  const solvedPuzzles = PUZZLES.filter(p => gameState.solvedPuzzles[p.id]);

  return (
    <div className="hub-root">

      {/* Nav */}
      <div className="hub-nav">
        <button className="hub-nav-back" onClick={onBack}>← Accueil</button>
        <span className="hub-nav-title">Opération : Escape les quotas</span>
        <span className="hub-nav-progress">
          Progression : <strong>{solved} / 8</strong> énigmes résolues
        </span>
        <img src={carbonLogo} className="hub-corner-logo" alt="Carbon Unit" />
      </div>

      {/* ── Résultats acquis (toujours visible, vide si rien encore) ── */}
      <div className="hub-results-bar">
        <div className="hub-results-label">
          🗂 Résultats acquis
        </div>
        <div className="hub-results-chips">
          {PUZZLES.map(puzzle => {
            const isSolved = !!gameState.solvedPuzzles[puzzle.id];
            return (
              <div
                key={puzzle.id}
                className={`result-chip ${isSolved ? "result-chip--solved" : "result-chip--pending"}`}
              >
                <span className="result-chip-label">{puzzle.resultLabel}</span>
                <span className="result-chip-value">
                  {isSolved ? puzzle.result : "—"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Header */}
      <div className="hub-header">
        <div className="hub-header-eyebrow">Tableau de bord</div>
        <h2>Documents & Énigmes</h2>
        <p>Lisez les documents pour débloquer de nouveaux indices. Résolvez les énigmes dans l'ordre.</p>
      </div>

      {/* Body */}
      <div className="hub-body">

        {/* ── Documents ── */}
        <div className="hub-docs-col">
          <div className="hub-col-label">📁 Documents ({gameState.unlockedDocs.length} / {DOCS.length} débloqués)</div>
          <div className="hub-docs-grid">
            {DOCS.map(doc => {
              const status = docStatus(doc.id, gameState);
              return (
                <div
                  key={doc.id}
                  className={`doc-card doc-card--${status}`}
                  onClick={status !== "locked" ? () => onViewDoc(doc.id) : undefined}
                >
                  <div className="doc-card-top">
                    <span className="doc-card-icon">{status === "locked" ? "🔒" : doc.icon}</span>
                    <span className={`doc-card-badge badge--${status === "viewed" ? "read" : status}`}>
                      {status === "locked"   ? "Verrouillé"
                       : status === "viewed" ? "Lu ✓"
                       : "Nouveau"}
                    </span>
                  </div>
                  <div className="doc-card-title">{doc.title}</div>
                  {status !== "locked" && (
                    <div className="doc-card-open">
                      {status === "viewed" ? "Relire →" : "Ouvrir →"}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Puzzles ── */}
        <div className="hub-puzzles-col">
          <div className="hub-col-label">🔍 Énigmes</div>
          {PUZZLES.map(puzzle => {
            const status = puzzleStatus(puzzle, gameState);
            return (
              <div key={puzzle.id} className={`puzzle-card puzzle-card--${status}`}>
                <div className="puzzle-card-top">
                  <span className="puzzle-card-num">#{puzzle.num}</span>
                  <span className="puzzle-card-title">{puzzle.title}</span>
                  <span className={`puzzle-card-status status--${status}`}>
                    {status === "solved"     ? "Résolue ✓"
                     : status === "available" ? "Disponible"
                     : "🔒 Verrouillée"}
                  </span>
                </div>

                <p className="puzzle-card-desc">{puzzle.desc}</p>

                {status === "locked" && puzzle.needsLabel && (
                  <div className="puzzle-card-needs">
                    <span>🔒</span> {puzzle.needsLabel}
                  </div>
                )}

                {status === "solved" && (
                  <div className="puzzle-card-result">
                    <span className="puzzle-card-result-lbl">{puzzle.resultLabel}</span>
                    <span className="puzzle-card-result-val">{puzzle.result}</span>
                  </div>
                )}

                {status === "available" && (
                  <button className="puzzle-go-btn" onClick={() => onGoPuzzle(puzzle.id)}>
                    Résoudre →
                  </button>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
