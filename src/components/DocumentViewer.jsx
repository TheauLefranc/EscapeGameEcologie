import "./DocumentViewer.css";

// ── Contenu de chaque document (placeholders) ─────────────
const DOC_CONTENT = {
  mail_source: {
    topbarLabel: "✉ SECUREMAILPRO — Boîte de réception",
    theme: "light",
    render: () => (
      <>
        <div className="dv-title">URGENT — Trafic de quotas carbone</div>
        <div className="dv-subtitle">De : anonyme@gmail.fr — 11 mai 2026, 10:42</div>
        <div className="dv-body">
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
          <p>Cordialement.</p>
        </div>
      </>
    ),
  },

  carte_de_visite: {
    topbarLabel: "📇 Document — Carte de visite",
    theme: "light",
    render: () => (
      <>
        <div className="dv-title">Carte de visite</div>
        <div className="dv-subtitle">Trouvée dans les affaires de la source</div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
          <img
            src="/data/carte_de_visite-1.png"
            alt="Carte de visite"
            style={{ maxWidth: "100%", maxHeight: "60vh", borderRadius: "8px", boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}
          />
        </div>
      </>
    ),
  },

  papier_trouve: {
    topbarLabel: "📄 Document — Papier trouvé",
    theme: "light",
    render: () => (
      <>
        <div className="dv-title">Papier trouvé (fouille du bureau)</div>
        <div className="dv-subtitle">Document récupéré lors de la perquisition du bureau de Flaurient</div>

        <div className="dv-section-label">Schéma des bâtonnets</div>
        <div className="dv-placeholder">
          <div className="dv-placeholder-icon">📊</div>
          <div className="dv-placeholder-text">[PLACEHOLDER — Insérer ici le schéma des bâtonnets]</div>
        </div>

        <div className="dv-section-label">Schéma des positions sur la carte</div>
        <div className="dv-placeholder">
          <div className="dv-placeholder-icon">🗺</div>
          <div className="dv-placeholder-text">[PLACEHOLDER — Insérer ici le schéma des positions]</div>
        </div>

        <div className="dv-card" style={{ marginTop: "1rem" }}>
          <div className="dv-section-label">Note manuscrite</div>
          <div className="dv-body">
            <p style={{ fontStyle: "italic", color: "#555" }}>
              [PLACEHOLDER — "Vous êtes systématiquement en position parlante"]
            </p>
          </div>
        </div>
      </>
    ),
  },

  audio_pdg: {
    topbarLabel: "🎙 Document — Retranscription audio",
    theme: "dark",
    render: () => (
      <>
        <div className="dv-title dv-title--dark">Retranscription audio 1 — Entretien avec le PDG</div>
        <div className="dv-subtitle dv-subtitle--dark">
          Durée : 56,6 s · Initiale : N · Source : Flaurient
        </div>
        <div className="dv-placeholder dv-placeholder--dark">
          <div className="dv-placeholder-icon">🎙</div>
          <div className="dv-placeholder-text">
            [PLACEHOLDER — Insérer ici la retranscription de l'entretien avec le PDG]
            <br /><br />
            Indices à faire apparaître : Initiale N · Durée 56,6 s · Ville : Lezinnes
          </div>
        </div>
      </>
    ),
  },

  audio_secretaire: {
    topbarLabel: "🎙 Document — Retranscription audio",
    theme: "dark",
    render: () => (
      <>
        <div className="dv-title dv-title--dark">Retranscription audio 2 — Entretien avec la secrétaire</div>
        <div className="dv-subtitle dv-subtitle--dark">
          Durée : 52,4 s · Initiale : E · Source : Flaurient
        </div>
        <div className="dv-placeholder dv-placeholder--dark">
          <div className="dv-placeholder-icon">🎙</div>
          <div className="dv-placeholder-text">
            [PLACEHOLDER — Insérer ici la retranscription de l'entretien avec la secrétaire]
            <br /><br />
            Indices à faire apparaître : Initiale E · Durée 52,4 s · Note sur les émissions · "regardez le temps que vous avez perdu avec nous"
          </div>
        </div>
      </>
    ),
  },

  localisation_usine: {
    topbarLabel: "📍 Document — Localisation de l'usine",
    theme: "dark",
    render: () => (
      <>
        <div className="dv-title dv-title--dark">Localisation de l'usine</div>
        <div className="dv-subtitle dv-subtitle--dark">
          Coordonnées : 47°4706.1"N 4°04'22.4"E — Frangey, France
        </div>
        <div className="dv-placeholder dv-placeholder--dark">
          <div className="dv-placeholder-icon">📍</div>
          <div className="dv-placeholder-text">
            [PLACEHOLDER — Insérer ici la carte de localisation de l'usine]
          </div>
        </div>
        <div className="dv-body dv-body--dark">
          <p>[PLACEHOLDER — Description de l'adresse et accès à Google Street View]</p>
        </div>
      </>
    ),
  },

  street_view: {
    topbarLabel: "🏭 Document — Street View usine Frangey",
    theme: "dark",
    render: () => (
      <>
        <div className="dv-title dv-title--dark">Observation Street View — Usine Frangey (2011)</div>
        <div className="dv-subtitle dv-subtitle--dark">
          Capture Street View Google — Année 2011
        </div>
        <div className="dv-placeholder dv-placeholder--dark" style={{ minHeight: "260px" }}>
          <div className="dv-placeholder-icon">🏭</div>
          <div className="dv-placeholder-text">
            [PLACEHOLDER — Insérer ici la capture Street View de l'usine de Frangey en 2011]
          </div>
        </div>
        <div className="dv-body dv-body--dark">
          <p>[PLACEHOLDER — Observations à noter sur la photo (bâtiment, enseignes, éléments visuels utiles)]</p>
        </div>
      </>
    ),
  },

  discussion_gardien: {
    topbarLabel: "💬 Document — Discussion avec le gardien",
    theme: "dark",
    render: () => (
      <>
        <div className="dv-title dv-title--dark">Discussion avec le gardien d'usine</div>
        <div className="dv-subtitle dv-subtitle--dark">Dialogue retranscrit — Source : Flaurient</div>
        <div className="dv-placeholder dv-placeholder--dark">
          <div className="dv-placeholder-icon">💬</div>
          <div className="dv-placeholder-text">
            [PLACEHOLDER — Insérer ici le dialogue avec le gardien]
            <br /><br />
            L'échange doit permettre de déduire le code d'accès à l'usine
          </div>
        </div>
      </>
    ),
  },
};

// ── Composant ──────────────────────────────────────────────
export default function DocumentViewer({ docId, onClose }) {
  const doc = DOC_CONTENT[docId];

  if (!doc) {
    return (
      <div className="dv-root">
        <div className="dv-topbar">
          <span className="dv-topbar-logo">✉ SECUREMAILPRO</span>
          <span className="dv-topbar-label">Document inconnu</span>
          <button className="dv-close-btn" onClick={onClose}>✕ Fermer</button>
        </div>
        <div className="dv-content dv-content--dark" style={{ padding: "2rem", color: "#475569" }}>
          Document introuvable : {docId}
        </div>
      </div>
    );
  }

  const isDark = doc.theme === "dark";

  return (
    <div className="dv-root">
      <div className="dv-topbar">
        <span className="dv-topbar-logo">✉ SECUREMAILPRO</span>
        <span className="dv-topbar-label">{doc.topbarLabel}</span>
        <button className="dv-close-btn" onClick={onClose}>✕ Fermer</button>
      </div>
      <div className={`dv-content ${isDark ? "dv-content--dark" : "dv-content--light"}`}>
        {doc.render()}
      </div>
    </div>
  );
}
