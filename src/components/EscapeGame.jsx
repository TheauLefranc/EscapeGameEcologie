import { useState, useReducer, useEffect, useRef } from "react";
import Puzzle1 from "./Puzzle1";
import PuzzleCoffre from "./PuzzleCoffre";
import Puzzle2 from "./Puzzle2";
import Puzzle3 from "./Puzzle3";
import Puzzle4 from "./Puzzle4";
import Puzzle5 from "./Puzzle5";
import Puzzle6 from "./Puzzle6";
import Puzzle7 from "./Puzzle7";
import GameHub from "./GameHub";
import DocumentViewer from "./DocumentViewer";
import "./EscapeGame.css";

// ── State initial ──────────────────────────────────────────
const INITIAL_STATE = {
  unlockedDocs: ["mail_source"],
  viewedDocs: [],
  solvedPuzzles: {}, // { puzzle1: "réponse", puzzle2: "951", ... }
};

function reducer(state, action) {
  switch (action.type) {
    case "VIEW_DOC": {
      const { docId } = action;
      const viewedDocs = state.viewedDocs.includes(docId)
        ? state.viewedDocs
        : [...state.viewedDocs, docId];

      const unlockedDocs = [...state.unlockedDocs];
      const add = (id) => { if (!unlockedDocs.includes(id)) unlockedDocs.push(id); };

      if (docId === "mail_source")        { add("carte_de_visite"); add("carte_europe_quotas"); }
      if (docId === "localisation_usine") { add("street_view"); add("discussion_gardien"); }
      if (docId === "discussion_gardien") { add("badge"); }
      if (docId === "badge")              { add("frangey_2014"); add("code_barre_doc"); }

      return { ...state, viewedDocs, unlockedDocs };
    }

    case "SOLVE_PUZZLE": {
      const { puzzleId, answer } = action;
      const solvedPuzzles = { ...state.solvedPuzzles, [puzzleId]: answer };
      const unlockedDocs = [...state.unlockedDocs];
      const add = (id) => { if (!unlockedDocs.includes(id)) unlockedDocs.push(id); };

      if (puzzleId === "puzzle1")       { add("audio_pdg"); add("audio_secretaire"); }
      if (puzzleId === "puzzle_coffre") { add("papier_trouve"); }
      if (puzzleId === "puzzle3")       { add("localisation_usine"); }
      if (puzzleId === "puzzle4")       { add("audio_employe"); }
      if (puzzleId === "puzzle5")       { add("code_barre_doc"); }

      return { ...state, solvedPuzzles, unlockedDocs };
    }

    case "RESET":
      return INITIAL_STATE;

    default:
      return state;
  }
}

// ── Séquence démo (ordre respectant les dépendances) ───────
const DEMO_STEPS = [
  { type: "VIEW_DOC",     docId:    "mail_source" },
  { type: "VIEW_DOC",     docId:    "carte_de_visite" },
  { type: "VIEW_DOC",     docId:    "carte_europe_quotas" },
  { type: "SOLVE_PUZZLE", puzzleId: "puzzle_coffre", answer: "250" },
  { type: "VIEW_DOC",     docId:    "papier_trouve" },
  { type: "SOLVE_PUZZLE", puzzleId: "puzzle1",       answer: "lafarge" },
  { type: "VIEW_DOC",     docId:    "audio_pdg" },
  { type: "VIEW_DOC",     docId:    "audio_secretaire" },
  { type: "SOLVE_PUZZLE", puzzleId: "puzzle2",       answer: "951" },
  { type: "SOLVE_PUZZLE", puzzleId: "puzzle3",       answer: "47°47'15.6\"N 4°04'10.6\"E" },
  { type: "VIEW_DOC",     docId:    "localisation_usine" },
  { type: "VIEW_DOC",     docId:    "street_view" },
  { type: "VIEW_DOC",     docId:    "discussion_gardien" },
  { type: "VIEW_DOC",     docId:    "badge" },
  { type: "SOLVE_PUZZLE", puzzleId: "puzzle4",       answer: "9512" },
  { type: "VIEW_DOC",     docId:    "audio_employe" },
  { type: "SOLVE_PUZZLE", puzzleId: "puzzle5",       answer: "3512" },
  { type: "VIEW_DOC",     docId:    "frangey_2014" },
  { type: "VIEW_DOC",     docId:    "code_barre_doc" },
  { type: "SOLVE_PUZZLE", puzzleId: "puzzle6",       answer: "184210" },
  { type: "SOLVE_PUZZLE", puzzleId: "puzzle7",       answer: "142000" },
];

const DEMO_LABELS = {
  mail_source:        "Lecture du mail de la source…",
  carte_de_visite:    "Examen de la carte de visite…",
  carte_europe_quotas:"Analyse de la carte des quotas…",
  puzzle_coffre:      "Résolution du coffre (code ISO France)…",
  papier_trouve:      "Lecture du papier trouvé…",
  puzzle1:            "Identification de l'entreprise : Lafarge",
  audio_pdg:          "Écoute de l'audio — M. Nort…",
  audio_secretaire:   "Écoute de l'audio — Estelle…",
  puzzle2:            "Déchiffrage des bâtonnets : 951",
  puzzle3:            "Calcul des coordonnées GPS…",
  localisation_usine: "Localisation de l'usine…",
  street_view:        "Observation de la façade (Street View)…",
  discussion_gardien: "Discussion avec le gardien…",
  badge:              "Récupération du badge…",
  puzzle4:            "Entrée dans l'usine : code 9512",
  audio_employe:      "Discussion avec l'employé…",
  puzzle5:            "Code des archives : 3512",
  frangey_2014:       "Photo Frangey 2014…",
  code_barre_doc:     "Lecture du code-barres…",
  puzzle6:            "Décodage du code-barres : 184 210",
  puzzle7:            "Calcul du surplus frauduleux : 142 000",
};

// ── Composant principal ────────────────────────────────────
export default function EscapeGame({ onBack }) {
  const [phase, setPhase] = useState("intro");
  const [gameState, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [demoStep,   setDemoStep]   = useState(null);  // null = pas en démo
  const [demoPaused, setDemoPaused] = useState(false);
  const [endFromDemo, setEndFromDemo] = useState(false);
  const demoRef = useRef(null);

  const viewDoc = (docId) => {
    dispatch({ type: "VIEW_DOC", docId });
    setPhase(`doc:${docId}`);
  };

  const solvePuzzle = (puzzleId, answer) => {
    dispatch({ type: "SOLVE_PUZZLE", puzzleId, answer });
    setPhase("hub");
  };

  const startDemo = () => {
    dispatch({ type: "RESET" });
    setDemoStep(0);
    setDemoPaused(false);
    setEndFromDemo(false);
    setPhase("hub");
  };

  const stopDemo = () => {
    if (demoRef.current) clearTimeout(demoRef.current);
    setDemoStep(null);
    setDemoPaused(false);
  };

  const pauseDemo = () => {
    if (demoRef.current) clearTimeout(demoRef.current);
    setDemoPaused(true);
  };

  const resumeDemo = () => {
    setDemoPaused(false);
  };

  useEffect(() => {
    if (demoStep === null || demoPaused) return;
    if (demoStep >= DEMO_STEPS.length) {
      setDemoStep(null);
      setEndFromDemo(true);
      setPhase("end");
      return;
    }
    const step = DEMO_STEPS[demoStep];
    demoRef.current = setTimeout(() => {
      if (step.type === "VIEW_DOC")     dispatch({ type: "VIEW_DOC",     docId:    step.docId });
      if (step.type === "SOLVE_PUZZLE") dispatch({ type: "SOLVE_PUZZLE", puzzleId: step.puzzleId, answer: step.answer });
      setDemoStep(s => s + 1);
    }, 900);
    return () => clearTimeout(demoRef.current);
  }, [demoStep, demoPaused]);

  // ── Document viewer ──
  if (phase.startsWith("doc:")) {
    return (
      <DocumentViewer
        docId={phase.slice(4)}
        onClose={() => setPhase("hub")}
      />
    );
  }

  // ── Puzzles ──
  if (phase === "puzzle1")
    return <Puzzle1 gameState={gameState} onBack={() => setPhase("hub")} onSolve={(ans) => solvePuzzle("puzzle1", ans)} />;
  if (phase === "puzzle_coffre")
    return <PuzzleCoffre gameState={gameState} onBack={() => setPhase("hub")} onSolve={(ans) => solvePuzzle("puzzle_coffre", ans)} />;
  if (phase === "puzzle2")
    return <Puzzle2 gameState={gameState} onBack={() => setPhase("hub")} onSolve={(ans) => solvePuzzle("puzzle2", ans)} />;
  if (phase === "puzzle3")
    return <Puzzle3 gameState={gameState} onBack={() => setPhase("hub")} onSolve={(ans) => solvePuzzle("puzzle3", ans)} />;
  if (phase === "puzzle4")
    return <Puzzle4 gameState={gameState} onBack={() => setPhase("hub")} onSolve={(ans) => solvePuzzle("puzzle4", ans)} />;
  if (phase === "puzzle5")
    return <Puzzle5 gameState={gameState} onBack={() => setPhase("hub")} onSolve={(ans) => solvePuzzle("puzzle5", ans)} />;
  if (phase === "puzzle6")
    return <Puzzle6 gameState={gameState} onBack={() => setPhase("hub")} onSolve={(ans) => solvePuzzle("puzzle6", ans)} />;
  if (phase === "puzzle7")
    return <Puzzle7 gameState={gameState} onBack={() => setPhase("hub")} onSolve={(ans) => { solvePuzzle("puzzle7", ans); setPhase("end"); }} />;

  // ── Fin ──
  if (phase === "end") {
    return (
      <div className="eg-container">
        <div className="eg-back-bar">
          <button className="eg-back-btn" onClick={onBack}>← Retour à la carte</button>
        </div>
        <div className="eg-intro">
          <div className="eg-dossier">
            <div className="eg-dossier-stripe" />
            <div className="eg-dossier-header">
              <span className="eg-dossier-ref">REF. EU-ETS / 2016-11 / FR</span>
              <span className="eg-dossier-classif">MISSION ACCOMPLIE</span>
            </div>

            <h1 className="eg-title">
              <span className="eg-title-small">Enquête terminée</span>
              Dossier clos
            </h1>

            <div className="eg-dossier-body">
              <div className="eg-briefing">
                <div className="eg-briefing-label">📋 CONCLUSION</div>
                <p>
                  Nous tenons une info en or ! Depuis 2014 au moins, Lafarge reçoit des quotas
                  importants de la part de l'Union Européenne pour une usine qui n'est même pas
                  en fonctionnement. Cette usine sert à l'entreprise pour collecter un maximum
                  de « droits à polluer » et lui permet de réaliser du bénéfice grâce à la vente
                  de ces quotas.
                </p>
                <p>
                  Nous devons absolument en parler dans notre futur reportage, cela fera l'effet
                  d'une bombe !
                </p>
              </div>

              <div className="eg-briefing">
                <div className="eg-briefing-label">📰 L'HISTOIRE VRAIE</div>
                <p>
                  Cette enquête s'inspire d'une affaire réelle. Pour en savoir plus sur la fraude
                  aux quotas carbone de Lafarge, consultez le reportage de Cash Investigation :
                </p>
                <a
                  href="https://www.franceinfo.fr/environnement/video-cash-investigation-quotas-carbone-un-business-en-beton-pour-lafarge_1459609.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="eg-link"
                >
                  Cash Investigation — Quotas carbone : un business en béton pour Lafarge →
                </a>
              </div>
            </div>

            <div className="eg-dossier-footer">
              {endFromDemo && (
                <button className="eg-start-btn" onClick={() => { setEndFromDemo(false); setPhase("hub"); }}>
                  Retour au tableau de bord
                  <span className="eg-arrow">→</span>
                </button>
              )}
              <button
                className={endFromDemo ? "eg-demo-btn" : "eg-start-btn"}
                onClick={() => { dispatch({ type: "RESET" }); setEndFromDemo(false); setPhase("intro"); }}
              >
                {endFromDemo ? "↺ Rejouer depuis le début" : <>Rejouer depuis le début <span className="eg-arrow">↺</span></>}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Hub ──
  if (phase === "hub") {
    const currentLabel = demoStep !== null && demoStep < DEMO_STEPS.length
      ? DEMO_LABELS[DEMO_STEPS[demoStep].docId || DEMO_STEPS[demoStep].puzzleId]
      : null;
    return (
      <>
        {demoStep !== null && (
          <div className="demo-banner">
            <span className={`demo-banner-dot ${demoPaused ? "demo-banner-dot--paused" : ""}`} />
            <span className="demo-banner-label">
              {demoPaused ? "⏸ En pause" : (currentLabel ?? "Finalisation…")}
            </span>
            <div className="demo-banner-bar">
              <div
                className="demo-banner-fill"
                style={{ width: `${Math.round((demoStep / DEMO_STEPS.length) * 100)}%` }}
              />
            </div>
            {demoPaused
              ? <button className="demo-banner-pause" onClick={resumeDemo}>▶ Reprendre</button>
              : <button className="demo-banner-pause" onClick={pauseDemo}>⏸ Pause</button>
            }
            <button className="demo-banner-stop" onClick={stopDemo}>✕ Arrêter</button>
          </div>
        )}
        <GameHub
          gameState={gameState}
          onViewDoc={viewDoc}
          onGoPuzzle={(id) => setPhase(id)}
          onBack={onBack}
        />
      </>
    );
  }

  // ── Intro ──
  return (
    <div className="eg-container">
      <div className="eg-back-bar">
        <button className="eg-back-btn" onClick={onBack}>← Retour à la carte</button>
      </div>

      <div className="eg-intro">

        <div className="eg-dossier">
          <div className="eg-dossier-stripe" />
          <div className="eg-dossier-header">
            <span className="eg-dossier-ref">REF. EU-ETS / 2016-11 / FR</span>
            <span className="eg-dossier-classif">MISSION CONFIDENTIELLE</span>
          </div>

          <h1 className="eg-title">
            <span className="eg-title-small">Opération</span>
            Escape les quotas
          </h1>

          <div className="eg-dossier-body">
            <div className="eg-briefing">
              <div className="eg-briefing-label">📋 BRIEFING</div>
              <p>
                Vous êtes journaliste d'investigation. Une source anonyme vient de vous contacter
                au sujet d'une entreprise française qui aurait fraudé le système de quotas
                carbone européen (UE ETS).
              </p>
              <p>
                Votre article doit sortir bientôt. Vous avez accès aux données réelles
                d'émissions européennes. Servez-vous en.
              </p>
            </div>

            <div className="eg-objectives">
              <div className="eg-obj-title">OBJECTIFS</div>
              <ul>
                <li><span className="eg-check">○</span> Lire et analyser le mail de votre source</li>
                <li><span className="eg-check">○</span> Identifier l'entreprise fraudeuse</li>
                <li><span className="eg-check">○</span> Localiser l'usine concernée</li>
                <li><span className="eg-check">○</span> Obtenir le code d'accès et clore le dossier</li>
              </ul>
            </div>
          </div>

          <div className="eg-dossier-footer">
            <button className="eg-start-btn" onClick={() => setPhase("hub")}>
              Commencer l'enquête
              <span className="eg-arrow">→</span>
            </button>
            <button className="eg-demo-btn" onClick={startDemo}>
              ▶ Mode démo — parcours automatique
            </button>
            <p className="eg-warning">⚠ Ce jeu utilise des données réelles sur les émissions européennes</p>
          </div>
        </div>

      </div>
    </div>
  );
}
