import { useState, useReducer } from "react";
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
          <div className="eg-badge">MISSION ACCOMPLIE</div>
          <h1 className="eg-title">
            <span className="eg-title-small">Enquête terminée</span>
            <br />
            Dossier clos
          </h1>
          <div className="eg-divider" />
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
          <div className="eg-briefing" style={{ marginTop: "1rem" }}>
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
