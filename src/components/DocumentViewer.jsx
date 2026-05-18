import { useState, useEffect } from "react";
import * as d3 from "d3";
import EuropeMap from "./EuropeMap";
import "./DocumentViewer.css";

// ── Sous-composant carte (chargement autonome des données) ──
function CarteEuropeQuotas() {
  const [mapData, setMapData] = useState(null);
  const [maxVal, setMaxVal]   = useState(0);

  useEffect(() => {
    d3.dsv(";", "/data/ETS.csv").then((rows) => {
      const filtered = rows.filter(r =>
        r["Main Activity Code"] === "20-99" &&
        r["Unit"] === "tonne of CO2 equ." &&
        r["ETS information"] === "2. Verified emissions" &&
        r["Country Code"] !== "All Countries" &&
        parseInt(r.Year) === 2016
      );
      const byCountry = {};
      let max = 0;
      filtered.forEach(r => {
        const val = parseFloat(r.Value);
        byCountry[r["Country"]] = val;
        if (val > max) max = val;
      });
      setMapData(byCountry);
      setMaxVal(max);
    });
  }, []);

  return (
    <>
      <div className="dv-title">Carte de l'Europe — Quotas carbone 2016</div>
      <div className="dv-subtitle">Données EU ETS — Émissions vérifiées par pays participants</div>
      <div style={{ border: "1px solid rgba(0,0,0,0.1)", borderRadius: "10px", overflow: "hidden", background: "#fff", marginBottom: "1rem" }}>
        {mapData
          ? <EuropeMap data={mapData} maxVal={maxVal} />
          : <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "200px", color: "#aaa", fontStyle: "italic", fontSize: "0.85rem" }}>Chargement…</div>
        }
      </div>
      <div className="dv-body">
        <p style={{ fontSize: "0.82rem", color: "#555" }}>
          Les cercles jaunes représentent les émissions vérifiées de CO₂ (en tonnes) par pays participant à l'UE ETS.
          Plus le cercle est grand, plus les émissions sont élevées.
        </p>
      </div>
    </>
  );
}

// ── Contenu de chaque document ─────────────────────────────
// context : texte affiché dans la pop-up avant d'ouvrir le document
//           (null = pas de pop-up pour ce document)
const DOC_CONTENT = {
  mail_source: {
    topbarLabel: "✉ SECUREMAILPRO — Boîte de réception",
    theme: "light",
    context: null,
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
    context: null,
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

  carte_europe_quotas: {
    topbarLabel: "🗺 Document — Carte Europe des quotas carbone",
    theme: "light",
    context: null,
    render: () => <CarteEuropeQuotas />,
  },

  papier_trouve: {
    topbarLabel: "📄 Document — Papier trouvé",
    theme: "light",
    context: null,
    render: () => (
      <>
        <div className="dv-title">Papier trouvé (fouille du bureau)</div>
        <div className="dv-subtitle">Document récupéré lors de la perquisition du bureau de Flaurient</div>

        <div className="dv-card" style={{ marginTop: "1rem" }}>
          <div className="dv-section-label">Note manuscrite</div>
          <div className="dv-body">
            <img
            src="/data/Papier_trouve.jpg"
            alt="Papier trouvé"
            style={{ maxWidth: "100%", maxHeight: "60vh", borderRadius: "8px", boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}
          />
          </div>
        </div>
      </>
    ),
  },

  audio_pdg: {
    topbarLabel: "🎙 Document — Retranscription audio",
    theme: "dark",
    context: "Le mail que nous avons reçu souhaite donc que l'on s'intéresse à la cimenterie Lafarge… Après plusieurs jours de recherches sur l'entreprise, nous avons découvert des incohérences dans les chiffres déclarés en termes d'émission et d'utilisation des quotas carbone. Nous venons de trouver suffisamment d'éléments compromettants pour confronter l'entreprise à ses failles !\n\nIl ne nous reste donc plus qu'une chose à faire, les confronter avec les accusations dont ils sont la cible. Pour cela nous les avons appelés en leur demandant s'il était possible d'interroger le PDG de l'entreprise M. Nort concernant ce que nous avions trouvé. Chose rare dans ce domaine : ils ont accepté !\n\nLe jour de l'interview, en arrivant au siège social de l'entreprise, nous décidons d'activer nos micros en caméra cachée pour pouvoir si besoin capturer des aveux intéressants hors caméra avant ou après l'interview. Nous sommes directement conduits au bureau de M. Nort. Ce dernier, en attendant que l'équipe technique installe le matériel pour l'interview, nous a proposé de jouer au \"jeu des bâtonnets\".",
    render: () => (
      <div className="dicta-root">

        {/* En-tête dictaphone */}
        <div className="dicta-header">
          <div className="dicta-header-left">
            <span className="dicta-rec-dot" />
            <span className="dicta-rec-label">REC</span>
            <span className="dicta-id">ENREGISTREMENT #001</span>
          </div>
          <div className="dicta-header-right">
            <span className="dicta-meta-chip">12/11/2016</span>
            <span className="dicta-meta-chip">09:58</span>
            <span className="dicta-meta-chip">47,3 s</span>
          </div>
        </div>

        {/* Fausse forme d'onde */}
        <div className="dicta-waveform">
          {[3,6,9,5,12,8,4,11,7,3,10,6,14,5,9,3,7,11,4,8,13,6,10,5,12,4,9,7,3,11,6,8,5,10,4,7,12,5,9,3,8,6,11,4,7].map((h, i) => (
            <div key={i} className="dicta-wave-bar" style={{ height: `${h}px` }} />
          ))}
        </div>

        {/* Faux contrôles */}
        <div className="dicta-controls">
          <button className="dicta-play-btn" tabIndex={-1}>▶</button>
          <div className="dicta-progress-track">
            <div className="dicta-progress-fill" style={{ width: "100%" }} />
          </div>
          <span className="dicta-duration">0:56</span>
        </div>

        {/* Description */}
        <div className="dicta-desc">
          Retranscription audio de la conversation en caméra cachée avec M. Nort,
          PDG de l'entreprise Lafarge.
        </div>

        {/* Transcript */}
        <div className="dicta-transcript">
          {[
            { speaker: "journaliste", text: "Bon… vous avez gagné." },
            { speaker: "nort",        text: "Évidemment." },
            { speaker: "journaliste", text: "Vous aviez l'air sûr de vous dès le début." },
            { speaker: "nort",        text: "Parce que la partie était terminée à partir du moment où j'ai commencé à jouer. Vous étiez systématiquement en position perdante." },
            { speaker: "journaliste", text: "Donc je n'avais aucune chance ?" },
            { speaker: "nort",        text: "Pas une seule." },
            { speaker: "journaliste", text: "C'est un peu inquiétant dit comme ça." },
            { speaker: "nort",        text: "Tous les systèmes fonctionnent comme ça. Les marchés, les négociations, les quotas carbone… En réalité, tout dépend de qui comprend les règles avant les autres." },
            { speaker: "journaliste", text: "Vous comparez vraiment ça aux accusations contre votre entreprise ?" },
            { speaker: "nort",        text: "Évidemment. Vous savez, dans cette histoire, en aucun cas je n'ai triché ; je connais juste extrêmement bien les règles du jeu." },
            { speaker: "journaliste", text: "Donc votre avantage, c'est simplement d'avoir commencé en premier ?" },
            { speaker: "nort",        text: "Exactement. Quand vous prenez la bonne position dès le départ, les autres passent leur temps à croire qu'ils jouent encore. Alors qu'ils suivent déjà la trajectoire que vous avez imposée." },
          ].map((line, i) => (
            <div key={i} className={`dicta-line dicta-line--${line.speaker}`}>
              <span className="dicta-speaker">
                {line.speaker === "journaliste" ? "Journaliste" : "M. Nort"}
              </span>
              <p className="dicta-text">{line.text}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  audio_secretaire: {
    topbarLabel: "🎙 Document — Retranscription audio",
    theme: "dark",
    context: "En sortant de la salle du bureau de M. Nort. Nous croisons en bas du bâtiment, dans le hall d'entrée, une femme qui semble nous avoir reconnu. Par chance, mon micro était encore en caméra cachée.",
    render: () => (
      <div className="dicta-root">

        {/* En-tête dictaphone */}
        <div className="dicta-header">
          <div className="dicta-header-left">
            <span className="dicta-rec-dot" />
            <span className="dicta-rec-label">REC</span>
            <span className="dicta-id">ENREGISTREMENT #002</span>
          </div>
          <div className="dicta-header-right">
            <span className="dicta-meta-chip">12/11/2016</span>
            <span className="dicta-meta-chip">10:26</span>
            <span className="dicta-meta-chip">71,7 s</span>
          </div>
        </div>

        {/* Fausse forme d'onde */}
        <div className="dicta-waveform">
          {[5,8,4,11,6,3,9,7,12,4,8,5,10,3,7,11,4,9,6,13,5,8,3,10,7,4,11,6,9,3,8,5,12,4,7,10,3,9,6,11,4,8,5,7,3].map((h, i) => (
            <div key={i} className="dicta-wave-bar" style={{ height: `${h}px` }} />
          ))}
        </div>

        {/* Faux contrôles */}
        <div className="dicta-controls">
          <button className="dicta-play-btn" tabIndex={-1}>▶</button>
          <div className="dicta-progress-track">
            <div className="dicta-progress-fill" style={{ width: "100%" }} />
          </div>
          <span className="dicta-duration">1:11</span>
        </div>

        {/* Description */}
        <div className="dicta-desc">
          Retranscription audio de l'échange en caméra cachée avec Estelle.
        </div>

        {/* Transcript */}
        <div className="dicta-transcript">
          {[
            { speaker: "estelle",      text: "Vous êtes les journalistes qui ont interviewé M. Nort ?" },
            { speaker: "journaliste",  text: "Oui c'est ça, nous sommes en train d'enquêter sur une affaire de fraude et nous avions besoin d'obtenir des informations de sa part." },
            { speaker: "estelle",      text: "Des informations de quelle nature ?" },
            { speaker: "journaliste",  text: "Tant que vous êtes là, puis-je vous interroger sur quelques détails ? Qu'est-ce que vous pensez de ces reventes de quotas carbones incohérentes qui surviennent en ce moment et qui pourraient cacher une fraude d'ampleur ?" },
            { speaker: "estelle",      text: "Je n'ai rien à vous dire." },
            { speaker: "journaliste",  text: "Permettez-moi au moins de vous demander votre nom et votre rôle dans l'entreprise ?" },
            { speaker: "estelle",      text: "Je pense pouvoir me permettre de répondre à cette question, mais à celle-là uniquement. Je suis Estelle, la secrétaire de M. Nort, cela fait bien longtemps que je travaille ici, je n'ai jamais eu de problème quels qu'ils soient et n'ai rien remarqué en ce qui concerne ses \"fraudes\"." },
            { speaker: "journaliste",  text: "Vous n'avez pas l'air honnête." },
            { speaker: "estelle",      text: "Permettez-moi de vous donner un conseil. Si vous souhaitez avancer dans votre enquête stupide, vous devriez arrêter de me parler et regarder le temps que vous avez perdu avec M. Nort et avec moi." },
            { speaker: "journaliste",  text: "Très bien, je m'arrête là. Vous accorderez que l'atmosphère est étrange ici, c'est comme si…" },
            { speaker: "estelle",      text: "Le temps et l'espace se relient formant une unité particulière, je vois très bien ce que vous voulez dire." },
            { speaker: "journaliste",  text: "Comment ça ?! Je n'ai absolument rien compris à ce que vous avez dit." },
            { speaker: "estelle",      text: "Je vous fais perdre du temps pour le bien de votre enquête." },
          ].map((line, i) => (
            <div key={i} className={`dicta-line dicta-line--${line.speaker}`}>
              <span className="dicta-speaker">
                {line.speaker === "journaliste" ? "Journaliste" : "Estelle"}
              </span>
              <p className="dicta-text">{line.text}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  localisation_usine: {
    topbarLabel: "📍 Document — Localisation de l'usine",
    theme: "dark",
    context: null,
    render: () => (
      <>
        <div className="dv-title dv-title--dark">Localisation de l'usine</div>
        <div className="dv-subtitle dv-subtitle--dark">
          Coordonnées : 47°4706.1"N 4°04'22.4"E — Frangey, France
        </div>
        <div className="dv-body dv-body--dark" style={{ marginTop: "1rem" }}>
          <p><strong>Adresse :</strong> Frangey, commune de Frangey, Yonne (89), France</p>
          <p><strong>Coordonnées GPS :</strong> 47°47'15.6"N 4°04'10.6"E</p>
          <p style={{ marginTop: "0.5rem" }}>
            <a
              href={`https://www.google.com/maps/@47.787667,4.069611,17z`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#34d399", textDecoration: "underline", fontSize: "0.9rem" }}
            >
              Voir sur Google Maps →
            </a>
          </p>
          <p style={{ marginTop: "0.75rem", fontSize: "0.88rem", color: "#94a3b8" }}>
            L'usine est accessible depuis la D905, à environ 10 km au nord-ouest de Tonnerre.
            Une capture Street View de la façade est disponible dans les documents.
          </p>
        </div>
      </>
    ),
  },

  street_view: {
    topbarLabel: "🏭 Document — Street View usine Frangey",
    theme: "dark",
    context: null,
    render: () => (
      <>
        <div className="dv-title dv-title--dark">Observation Street View — Usine Frangey (2011)</div>
        <div className="dv-subtitle dv-subtitle--dark">
          Capture Street View Google — Année 2011
        </div>
        <div className="dv-body dv-body--dark" style={{ marginTop: "1rem" }}>
          <p>Consultez la vue Street View de l'usine telle qu'elle était en 2011 pour observer la façade et ses inscriptions.</p>
          <p style={{ marginTop: "0.75rem" }}>
            <a
              href="https://www.google.com/maps/@47.787667,4.069611,3a,75y,90t/data=!3m6!1e1!3m4!1s0x0:0x0!2e0!7i13312!8i6656"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#34d399", textDecoration: "underline", fontSize: "0.9rem" }}
            >
              Voir la Street View de l'usine Frangey →
            </a>
          </p>
        </div>
      </>
    ),
  },

  discussion_gardien: {
    topbarLabel: "💬 Document — Discussion avec le gardien",
    theme: "dark",
    context: "En arrivant à l'entrée de l'usine, je remarque le gardien à l'entrée, somnolant devant son ordinateur. Plusieurs caméras sont visibles depuis l'entrée du bâtiment: l'endroit a l'air bien surveillé. Il va sûrement falloir que j'utilise mon identité de couverture. Par chance, j'ai pris ma fausse carte d'identité dans mon sac. Soudain, le gardien se met à me parler:",
    render: () => (
      <div className="dicta-root">

        {/* En-tête dictaphone */}
        <div className="dicta-header">
          <div className="dicta-header-left">
            <span className="dicta-rec-dot" />
            <span className="dicta-rec-label">REC</span>
            <span className="dicta-id">ENREGISTREMENT #003</span>
          </div>
          <div className="dicta-header-right">
            <span className="dicta-meta-chip">19/11/2016</span>
            <span className="dicta-meta-chip">10:36</span>
            <span className="dicta-meta-chip">1m36s</span>
          </div>
        </div>

        {/* Fausse forme d'onde */}
        <div className="dicta-waveform">
          {[4,7,3,10,6,9,4,12,5,8,3,11,7,4,9,6,13,5,8,3,10,7,4,11,6,9,3,8,5,12,4,7,10,3,9,6,11,4,8,5,7,3,10,6,9].map((h, i) => (
            <div key={i} className="dicta-wave-bar" style={{ height: `${h}px` }} />
          ))}
        </div>

        {/* Faux contrôles */}
        <div className="dicta-controls">
          <button className="dicta-play-btn" tabIndex={-1}>▶</button>
          <div className="dicta-progress-track">
            <div className="dicta-progress-fill" style={{ width: "100%" }} />
          </div>
          <span className="dicta-duration">1:36</span>
        </div>

        {/* Description */}
        <div className="dicta-desc">
          Retranscription audio de la conversation en caméra cachée avec le gardien de l'usine de Frangey.
        </div>

        {/* Transcript */}
        <div className="dicta-transcript">
          {[
            { speaker: "gardien",      text: "Bonjour, vous êtes extérieur ?" },
            { speaker: "journaliste",  text: "Non, en fait c'est mon premier jour, lui répondis-je." },
            { speaker: "gardien",      text: "Votre premier jour ! Soit vous mentez, soit vous êtes encore un de nos supérieurs descendus de Paris qui viennent faire un tour dans la région pour \"contrôler que l'usine fonctionne correctement\"." },
            { speaker: "journaliste",  text: "En fait, je viens du siège social d'Issy Les Moulineaux. Comme vous le dites, on m'y a envoyé pour un contrôle." },
            { speaker: "gardien",      text: "D'accord, enregistrez vous sur ce carnet et vous pourrez passer. Vous aurez aussi besoin de ceci." },
            { speaker: "journaliste",  text: "J'ouvre la grille avec ce badge ?" },
            { speaker: "gardien",      text: "Non, ce badge vous sert à accéder à toutes les zones gardées par mes collègues sans qu'ils aient besoin de m'appeler pour vérifier votre identité. D'ailleurs, le code barre ne fonctionne nulle part ! C'est à ce portail, celui qui est derrière vous, qu'il vous faudra entrer le code que le PDG vous a donné. Vu que beaucoup de personnes ont ce code et que le PDG ne veut pas le changer, on a ajouté une sécurité en plus du code en déplaçant des lettres sur la devanture de l'usine." },
          ].map((line, i) => (
            <div key={i} className={`dicta-line dicta-line--${line.speaker}`}>
              <span className="dicta-speaker">
                {line.speaker === "journaliste" ? "Journaliste" : "Gardien"}
              </span>
              <p className="dicta-text">{line.text}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  badge: {
    topbarLabel: "🪪 Document — Badge site industriel",
    theme: "dark",
    context: "En discutant avec le gardien, ce dernier laisse tomber son badge d'accès sans s'en apercevoir. Vous le ramassez discrètement avant qu'il ne s'en rende compte. Ce badge porte plusieurs informations intéressantes.",
    render: () => (
      <>
        <div className="dv-title dv-title--dark">Badge d'accès — Site industriel Frangey</div>
        <div className="dv-subtitle dv-subtitle--dark">Retrouvé lors de la discussion avec le gardien</div>
        <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
          <img
            src="/data/code_barre.png"
            alt="Code-barres — Badge industriel"
            style={{ width: "100%", maxWidth: "420px", display: "inline-block", imageRendering: "pixelated" }}
          />
        </div>
      </>
    ),
  },

  audio_employe: {
    topbarLabel: "🎙 Document — Retranscription audio",
    theme: "dark",
    context: "C'est le bon code ! Je peux enfin rentrer dans l'usine.\n\nToujours muni de mon fidèle micro caché, je commence à m'aventurer dans l'usine en quête de plus d'indices concernant notre affaire.\n\nEn commençant à me balader dans les environs, je remarque que l'endroit me paraît désert pour une usine en fonctionnement, bizarre…\n\nPar chance, je rencontre un employé dans les environs.",
    render: () => (
      <div className="dicta-root">

        {/* En-tête dictaphone */}
        <div className="dicta-header">
          <div className="dicta-header-left">
            <span className="dicta-rec-dot" />
            <span className="dicta-rec-label">REC</span>
            <span className="dicta-id">ENREGISTREMENT #004</span>
          </div>
          <div className="dicta-header-right">
            <span className="dicta-meta-chip">19/11/2016</span>
            <span className="dicta-meta-chip">11:14</span>
            <span className="dicta-meta-chip">48,6 s</span>
          </div>
        </div>

        {/* Fausse forme d'onde */}
        <div className="dicta-waveform">
          {[6,3,9,5,11,4,8,6,3,10,7,4,12,5,8,3,9,6,11,4,7,10,3,8,5,12,4,9,6,3,11,7,4,10,5,8,3,9,6,12,4,7,10,3,8].map((h, i) => (
            <div key={i} className="dicta-wave-bar" style={{ height: `${h}px` }} />
          ))}
        </div>

        {/* Faux contrôles */}
        <div className="dicta-controls">
          <button className="dicta-play-btn" tabIndex={-1}>▶</button>
          <div className="dicta-progress-track">
            <div className="dicta-progress-fill" style={{ width: "100%" }} />
          </div>
          <span className="dicta-duration">0:48</span>
        </div>

        {/* Description */}
        <div className="dicta-desc">
          Retranscription audio de la conversation en caméra cachée avec un employé de l'usine de Frangey.
        </div>

        {/* Transcript */}
        <div className="dicta-transcript">
          {[
            { speaker: "journaliste", text: "Bonjour monsieur !" },
            { speaker: "employe",     text: "Bonjour, qu'est-ce qui vous amène ici ?" },
            { speaker: "journaliste", text: "J'enquête, dans le cadre de mon métier, sur l'utilisation des quotas carbone européens par l'entreprise Lafarge. Il se trouve qu'après pas mal de jours d'enquête, plusieurs pistes nous amènent dans cet endroit. Il y a l'air de se passer des choses ici." },
            { speaker: "employe",     text: "Se passer des choses !? Si c'est de l'ironie, en effet, cela fait bien longtemps que l'usine est au point mort." },
            { speaker: "journaliste", text: "Des problèmes de rentabilité ?" },
            { speaker: "employe",     text: "Sûrement, ça fait plusieurs années que l'usine ne tourne plus. Nous, on vient juste une fois de temps en temps car il reste pas mal de matos utiles ici." },
            { speaker: "journaliste", text: "Donc l'Union Européenne ne vous attribue plus de quotas d'émissions depuis un moment..?" },
            { speaker: "employe",     text: "Je ne sais pas vraiment de quoi vous parlez mais logiquement non. De toute façon, en ce qui concerne les chiffres de l'usine, le PDG est tellement parano qu'ils doivent être bien gardés, encodés quelque part." },
            { speaker: "journaliste", text: "On a pu en faire l'expérience…" },
            { speaker: "employe",     text: "Il paraît, selon un de ses proches collègues, qu'il adore cacher des données sensibles avec un certain « code de Samuel »." },
            { speaker: "journaliste", text: "Vous savez ce que cela veut dire ?" },
            { speaker: "employe",     text: "Pas du tout, mais à l'heure d'Internet, vous devriez pouvoir vite trouver." },
          ].map((line, i) => (
            <div key={i} className={`dicta-line dicta-line--${line.speaker}`}>
              <span className="dicta-speaker">
                {line.speaker === "journaliste" ? "Journaliste" : "Employé"}
              </span>
              <p className="dicta-text">{line.text}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  frangey_2014: {
    topbarLabel: "📸 Document — Photo Frangey 2014",
    theme: "dark",
    context: null,
    render: () => (
      <>
        <div className="dv-title dv-title--dark">Photo de l'usine — Frangey, 2014</div>
        <div className="dv-subtitle dv-subtitle--dark">
          Photographie de la façade principale — Année 2014
        </div>
        <div className="dv-placeholder dv-placeholder--dark" style={{ minHeight: "260px" }}>
          <div className="dv-placeholder-icon">📸</div>
          <div className="dv-placeholder-text">
            [PLACEHOLDER — Insérer ici la photo de l'usine Frangey prise en 2014]
            <br /><br />
            Un numéro de salle est visible sur la porte principale
          </div>
        </div>
        <div className="dv-body dv-body--dark">
          <p>[PLACEHOLDER — Description des éléments visibles sur la photo : numéro de bâtiment, enseignes, détails utiles]</p>
        </div>
      </>
    ),
  },

  code_barre_doc: {
    topbarLabel: "█▌ Document — Code-barres badge",
    theme: "dark",
    context: "Dans les archives de l'usine, vous retrouvez un document portant le même code-barres que celui du badge. Une loupe posée sur le bureau vous permet d'examiner le code en détail.",
    render: () => (
      <>
        <div className="dv-title dv-title--dark">Code-barres — Badge industriel (agrandissement)</div>
        <div className="dv-subtitle dv-subtitle--dark">
          Code-barres EAN-13 — Document récupéré dans les archives
        </div>
        <div style={{ textAlign: "center", padding: "1rem 0" }}>
          <img
            src="/data/code_barre.png"
            alt="Code-barres EAN-13 — Badge industriel"
            style={{ width: "100%", maxWidth: "420px", display: "inline-block", imageRendering: "pixelated" }}
          />
        </div>
        <div className="dv-body dv-body--dark">
          <p>
            Ce code-barres est de type <strong>EAN-13</strong> (13 chiffres).
            Scannez-le avec une application de lecture de codes-barres sur votre téléphone,
            ou utilisez un lecteur en ligne pour obtenir le nombre encodé.
          </p>
        </div>
      </>
    ),
  },
};

// ── Composant ──────────────────────────────────────────────
export default function DocumentViewer({ docId, onClose }) {
  const doc = DOC_CONTENT[docId];
  const [contextDismissed, setContextDismissed] = useState(false);

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
  const showPopup = doc.context && !contextDismissed;

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

      {/* Pop-up de contexte */}
      {showPopup && (
        <div className="dv-popup-overlay" onClick={() => setContextDismissed(true)}>
          <div className="dv-popup" onClick={e => e.stopPropagation()}>
            <div className="dv-popup-eyebrow">📓 Carnet de bord</div>
            <div className="dv-popup-text">
              {doc.context.split("\n\n").map((para, i) => (
                <p key={i} style={{ marginBottom: "0.75rem" }}>{para}</p>
              ))}
            </div>
            <button className="dv-popup-btn" onClick={() => setContextDismissed(true)}>
              Ouvrir le document →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
