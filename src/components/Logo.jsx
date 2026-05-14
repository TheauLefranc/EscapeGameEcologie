/* ══════════════════════════════════════════════
   Logo.jsx — Badge d'investigation officielle
   Opération Ciment Noir / Carbon Fraud Unit

   Props:
     size="full"  → version complète hero (350px)
     size="nav"   → sceau simplifié navbar  (40px)
══════════════════════════════════════════════ */

function starPoints(cx, cy, r, innerR = r * 0.4) {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const angle = (i * Math.PI) / 5 - Math.PI / 2;
    const radius = i % 2 === 0 ? r : innerR;
    pts.push(
      `${(cx + radius * Math.cos(angle)).toFixed(2)},` +
      `${(cy + radius * Math.sin(angle)).toFixed(2)}`
    );
  }
  return pts.join(' ');
}

/* ── Version navbar ── */
function LogoNav() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <svg
        width="40"
        height="40"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Fond */}
        <circle cx="50" cy="50" r="48" fill="#0f0f13" />
        {/* Anneau cranté */}
        <circle cx="50" cy="50" r="44" stroke="#c8a84b" strokeWidth="6"
          strokeDasharray="8,4" fill="none" />
        {/* Anneau intérieur */}
        <circle cx="50" cy="50" r="36" stroke="#c8a84b" strokeWidth="0.8"
          fill="none" opacity="0.5" />
        {/* Fond badge */}
        <circle cx="50" cy="50" r="35" fill="#0d1118" />
        {/* Loupe */}
        <circle cx="46" cy="46" r="11.5" fill="none" stroke="#c8a84b" strokeWidth="2.8" />
        <line x1="54.5" y1="54.5" x2="64" y2="64" stroke="#c8a84b"
          strokeWidth="3.5" strokeLinecap="round" />
        {/* Centre rouge */}
        <circle cx="46" cy="46" r="3" fill="#cc2200" />
        {/* Étoiles haut/bas */}
        <polygon points={starPoints(50, 18, 4.5)} fill="#c8a84b" />
        <polygon points={starPoints(50, 82, 4.5)} fill="#c8a84b" />
      </svg>

      <div>
        <div style={{
          fontFamily: "'Oswald', sans-serif",
          fontWeight: 700,
          fontSize: '0.98rem',
          color: '#f0f0f0',
          letterSpacing: '0.07em',
          textTransform: 'uppercase',
          lineHeight: 1.15,
        }}>
          <span style={{ color: '#c8a84b' }}>Carbon</span> Unit
        </div>
        <div style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '0.54rem',
          color: '#5a5a6e',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          EU ETS · Enquête spéciale
        </div>
      </div>
    </div>
  );
}

/* ── Version complète ── */
function LogoFull() {
  return (
    <svg
      width="350"
      height="350"
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 0 18px rgba(200, 168, 75, 0.3))' }}
      aria-label="Badge — Cellule d'Investigation Fraude Carbone"
    >
      <defs>
        <path id="topArcFull"
          d="M 42,200 A 158,158 0 0,1 358,200" />
        <path id="bottomArcFull"
          d="M 57,200 A 143,143 0 0,0 343,200" />
      </defs>

      {/* ── Fond général ── */}
      <circle cx="200" cy="200" r="196" fill="#0f0f13" />

      {/* ── Anneau cranté or ── */}
      <circle cx="200" cy="200" r="185" stroke="#c8a84b" strokeWidth="16"
        strokeDasharray="11,5.5" fill="none" />

      {/* ── Bordures anneaux ── */}
      <circle cx="200" cy="200" r="176" stroke="#c8a84b" strokeWidth="1.5" fill="none" />
      <circle cx="200" cy="200" r="171" stroke="rgba(200,168,75,0.25)"
        strokeWidth="0.8" fill="none" />

      {/* ── Corps du badge ── */}
      <circle cx="200" cy="200" r="169" fill="#0d1118" />

      {/* ── Anneau intérieur pointillé ── */}
      <circle cx="200" cy="200" r="150" stroke="#c8a84b" strokeWidth="0.6"
        strokeDasharray="4,4" fill="none" opacity="0.45" />

      {/* ── Texte en arc — haut ── */}
      <text fill="#c8a84b" fontFamily="'Oswald', sans-serif" fontSize="13.5"
        fontWeight="700" letterSpacing="3">
        <textPath href="#topArcFull" startOffset="5%">
          CELLULE D'INVESTIGATION · FRAUDE CARBONE
        </textPath>
      </text>

      {/* ── Texte en arc — bas ── */}
      <text fill="#c8a84b" fontFamily="'Oswald', sans-serif" fontSize="11"
        fontWeight="600" letterSpacing="2.5">
        <textPath href="#bottomArcFull" startOffset="14%">
          EU ETS · CARBON FRAUD UNIT · 2016
        </textPath>
      </text>

      {/* ── Étoiles latérales ── */}
      <polygon points={starPoints(68, 200, 7)} fill="#c8a84b" />
      <polygon points={starPoints(332, 200, 7)} fill="#c8a84b" />

      {/* ════════════════════════
          AIGLE STYLISÉ
      ════════════════════════ */}

      {/* Aile gauche */}
      <path
        d="M 200,197
           C 188,190 170,182 148,178
           C 129,174 112,181 115,191
           C 123,187 146,185 167,191
           C 182,195 193,199 200,203
           Z"
        fill="#c8a84b"
      />
      {/* Nervures aile gauche */}
      <line x1="198" y1="200" x2="148" y2="184" stroke="#0d1118"
        strokeWidth="1.2" opacity="0.45" />
      <line x1="198" y1="200" x2="122" y2="190" stroke="#0d1118"
        strokeWidth="1" opacity="0.3" />

      {/* Aile droite */}
      <path
        d="M 200,197
           C 212,190 230,182 252,178
           C 271,174 288,181 285,191
           C 277,187 254,185 233,191
           C 218,195 207,199 200,203
           Z"
        fill="#c8a84b"
      />
      {/* Nervures aile droite */}
      <line x1="202" y1="200" x2="252" y2="184" stroke="#0d1118"
        strokeWidth="1.2" opacity="0.45" />
      <line x1="202" y1="200" x2="278" y2="190" stroke="#0d1118"
        strokeWidth="1" opacity="0.3" />

      {/* Queue */}
      <path d="M 192,217 Q 200,234 208,217 Z" fill="#c8a84b" opacity="0.75" />

      {/* Corps */}
      <ellipse cx="200" cy="203" rx="14" ry="19" fill="#c8a84b" />

      {/* Tête */}
      <circle cx="200" cy="180" r="12" fill="#c8a84b" />

      {/* Bec */}
      <polygon points="209,179 218,182 209,186" fill="#cc2200" />

      {/* Œil */}
      <circle cx="205" cy="178" r="2.8" fill="#0d1118" />
      <circle cx="205.8" cy="177.3" r="1.1" fill="rgba(240,240,240,0.8)" />

      {/* ════════════════════════
          LOUPE (enquête)
      ════════════════════════ */}

      {/* Halo sombre derrière la loupe */}
      <circle cx="196" cy="202" r="18" fill="rgba(13,17,24,0.82)" />
      {/* Cercle de la loupe */}
      <circle cx="196" cy="202" r="15.5" fill="rgba(204,34,0,0.05)"
        stroke="#cc2200" strokeWidth="2.8" />
      {/* Reflet interne */}
      <circle cx="196" cy="202" r="14" fill="none"
        stroke="rgba(255,100,80,0.15)" strokeWidth="2" />
      {/* Manche */}
      <line x1="207" y1="213" x2="219" y2="225" stroke="#cc2200"
        strokeWidth="4.5" strokeLinecap="round" />
      <line x1="207" y1="213" x2="219" y2="225" stroke="#8b0000"
        strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      {/* Réticule */}
      <line x1="196" y1="190" x2="196" y2="214" stroke="#cc2200"
        strokeWidth="0.8" opacity="0.35" />
      <line x1="184" y1="202" x2="208" y2="202" stroke="#cc2200"
        strokeWidth="0.8" opacity="0.35" />

      {/* ════════════════════════
          RANGÉE D'ÉTOILES
      ════════════════════════ */}
      {[152, 170, 188, 212, 230, 248].map((x, i) => (
        <polygon key={i} points={starPoints(x, 249, 5)} fill="#c8a84b" opacity="0.85" />
      ))}

      {/* ════════════════════════
          BANNIÈRE ROUGE
      ════════════════════════ */}

      {/* Corps bannière */}
      <path d="M 97,260 Q 200,274 303,260 L 292,286 Q 200,300 108,286 Z"
        fill="#cc2200" />
      <path d="M 97,260 Q 200,274 303,260 L 292,286 Q 200,300 108,286 Z"
        fill="none" stroke="#8b0000" strokeWidth="1.2" />
      {/* Encoches latérales */}
      <polygon points="97,260 85,273 108,286" fill="#8b0000" />
      <polygon points="303,260 315,273 292,286" fill="#8b0000" />

      <text x="200" y="278" textAnchor="middle" fill="white"
        fontFamily="'Oswald', sans-serif" fontSize="14" fontWeight="700" letterSpacing="3.5">
        OPÉRATION VÉRITÉ
      </text>

      {/* ── Numéro de dossier ── */}
      <text x="200" y="320" textAnchor="middle" fill="#c8a84b"
        fontFamily="'Share Tech Mono', monospace" fontSize="9.5"
        letterSpacing="2.5" opacity="0.5">
        XK-2016-LFG-047
      </text>

      {/* ════════════════════════
          TAMPON CLASSIFIÉ
      ════════════════════════ */}
      <g transform="rotate(-22, 295, 132)">
        <rect x="252" y="118" width="118" height="33"
          fill="rgba(13,17,24,0.75)" stroke="#cc2200" strokeWidth="2.8" rx="2" />
        <rect x="256" y="122" width="110" height="25"
          fill="none" stroke="#cc2200" strokeWidth="0.9" rx="1" opacity="0.55" />
        <text x="311" y="140" textAnchor="middle" fill="#cc2200"
          fontFamily="'Oswald', sans-serif" fontSize="16" fontWeight="700" letterSpacing="4.5">
          CLASSIFIÉ
        </text>
      </g>
    </svg>
  );
}

/* ── Export principal ── */
export default function Logo({ size = 'full' }) {
  return size === 'nav' ? <LogoNav /> : <LogoFull />;
}
