import { useState, useReducer } from "react";
import Puzzle1 from "./Puzzle1";
import PuzzleCoffre from "./PuzzleCoffre";
import Puzzle2 from "./Puzzle2";
import Puzzle3 from "./Puzzle3";
import Puzzle4 from "./Puzzle4";
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

      return { ...state, solvedPuzzles, unlockedDocs };
    }

    case "RESET":
      return INITIAL_STATE;

    default:
      return state;
  }
}

// ── Composant principal ────────────────────────────────────
export default function EscapeGame({ onBack }) {
  const [phase, setPhase] = useState("intro");
  const [gameState, dispatch] = useReducer(reducer, INITIAL_STATE);

  const viewDoc = (docId) => {
    dispatch({ type: "VIEW_DOC", docId });
    setPhase(`doc:${docId}`);
  };

  const solvePuzzle = (puzzleId, answer) => {
    dispatch({ type: "SOLVE_PUZZLE", puzzleId, answer });
    setPhase("hub");
  };

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
    return <Puzzle4 gameState={gameState} onBack={() => setPhase("hub")} onSolve={(ans) => { solvePuzzle("puzzle4", ans); setPhase("end"); }} />;

  // ── Fin ──
  if (phase === "end") {
    return (
      <div className="eg-container">
        <div className="eg-back-bar">
          <button className="eg-back-btn" onClick={onBack}>← Retour à la carte</button>
        </div>
        <div className="eg-intro">
          <div className="eg-badge">MISSION ACCOMPLIE</div>
          <h1 className="eg-title">
            <span className="eg-title-small">Enquête terminée</span>
            <br />
            Dossier clos
          </h1>
          <div className="eg-divider" />
          <div className="eg-briefing">
            <div className="eg-briefing-label">📋 RÉSULTAT</div>
            <p>
              Vous avez identifié l'entreprise, localisé l'usine et obtenu le code d'accès.
              Votre article fait les gros titres. Le parquet a ouvert une instruction.
            </p>
          </div>
          <button className="eg-start-btn" onClick={() => { dispatch({ type: "RESET" }); setPhase("intro"); }}>
            <span>Rejouer depuis le début</span>
            <span className="eg-arrow">↺</span>
          </button>
        </div>
      </div>
    );
  }

  // ── Hub ──
  if (phase === "hub") {
    return (
      <GameHub
        gameState={gameState}
        onViewDoc={viewDoc}
        onGoPuzzle={(id) => setPhase(id)}
        onBack={onBack}
      />
    );
  }

  // ── Intro ──
  return (
    <div className="eg-container">
      <div className="eg-back-bar">
        <button className="eg-back-btn" onClick={onBack}>← Retour à la carte</button>
      </div>

      <div className="eg-intro">
        <div className="eg-badge">MISSION CONFIDENTIELLE</div>

        <h1 className="eg-title">
          <span className="eg-title-small">Opération</span>
          <br />
          Escape les quotas
        </h1>

        <div className="eg-divider" />

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

        <button className="eg-start-btn" onClick={() => setPhase("hub")}>
          <span>Commencer l'enquête</span>
          <span className="eg-arrow">→</span>
        </button>

        <p className="eg-warning">
          ⚠ Ce jeu utilise des données réelles sur les émissions européennes
        </p>
      </div>
    </div>
  );
}
