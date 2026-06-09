import { motion } from 'framer-motion'
import './Skills.css'

/* Minimal line-art marks in the site's own visual language — drawn rather than
   borrowed, so they sit naturally next to Ronzino-era numerals and lime accents.
   Swap any of these for an official brand logo by dropping an SVG/PNG into
   public/logos and pointing the relevant entry at it. */
const ICON_PATHS = {
  blender: (
    <>
      <circle cx="12" cy="12" r="5.4" />
      <ellipse cx="12" cy="12" rx="9.2" ry="3.4" transform="rotate(-24 12 12)" />
    </>
  ),
  lighting: (
    <>
      <circle cx="12" cy="5.6" r="2.1" />
      <path d="M7 20 12 9l5 11Z" />
    </>
  ),
  composition: (
    <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
  ),
  world: (
    <>
      <circle cx="12" cy="12" r="7.6" />
      <path d="M4.4 12h15.2M12 4.4c2.8 2.6 2.8 14.6 0 17.2M12 4.4c-2.8 2.6-2.8 14.6 0 17.2" />
    </>
  ),
  environment: (
    <>
      <circle cx="7.2" cy="7.2" r="2" />
      <path d="M3 18.4 9 10l3.6 4.6L15 11.6l6 6.8Z" />
    </>
  ),
  concept: (
    <path d="M5 19 17.5 6.5M14 3.4l4.6 4.6M5 19l1.2-4.7L9.7 15.6Z" />
  ),
  direction: (
    <>
      <circle cx="12" cy="12" r="7" />
      <circle cx="12" cy="12" r="1.6" />
      <path d="M12 2.4v3.2M12 18.4v3.2M2.4 12h3.2M18.4 12h3.2" />
    </>
  ),
  branding: (
    <>
      <path d="M11 3.4 3.4 11v4L11 22.6l8.6-8.6L11 3.4Z" />
      <circle cx="9" cy="9" r="1.3" />
    </>
  ),
  product: (
    <path d="M12 2.6 3.8 7.3v9.4L12 21.4l8.2-4.7V7.3L12 2.6ZM12 12 20.2 7.3M12 12 3.8 7.3M12 12v9.4" />
  ),
  signage: (
    <path d="M6 21V8.6M3 8.6h7.4l-1.5 2.4 1.5 2.4H3M14 4.4h7l-1.5 2.4 1.5 2.4h-7" />
  ),
  code: (
    <path d="M7 8l-4 4 4 4M17 8l4 4-4 4M13 5l-2 14" />
  ),
  web: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2" />
      <path d="M3 9h18M7.5 6.9h.01M10 6.9h.01M12.5 6.9h.01" />
    </>
  ),
  video: (
    <>
      <rect x="2.5" y="7" width="12" height="10" rx="2" />
      <path d="M14.5 10l5.5-3v10l-5.5-3" />
      <path d="M7 12h4M9 10v4" />
    </>
  ),
}

function SkillIcon({ id }) {
  return (
    <svg
      className="skill-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICON_PATHS[id]}
    </svg>
  )
}

const TOOL = {
  name: 'Blender',
  label: '— lo strumento principale',
  text: 'La base di ogni scena: dalla prima mesh allo shading, dall’illuminazione al render finale. Tutto ciò che vedi in “Progetti” nasce e si compie qui dentro.',
  presence: '10 / 10 progetti',
}

const DISCIPLINES = [
  { n: '01', name: 'Lighting', count: 6, icon: 'lighting' },
  { n: '02', name: 'Branding', count: 3, icon: 'branding' },
  { n: '03', name: 'Composition', count: 2, icon: 'composition' },
  { n: '04', name: 'Environment', count: 2, icon: 'environment' },
  { n: '05', name: 'Concept art', count: 2, icon: 'concept' },
  { n: '06', name: 'Product rendering', count: 2, icon: 'product' },
  { n: '07', name: 'World-building', count: 1, icon: 'world' },
  { n: '08', name: 'Art direction', count: 1, icon: 'direction' },
  { n: '09', name: 'Signage design', count: 1, icon: 'signage' },
  { n: '10', name: 'Sviluppo Web', count: 8, icon: 'code', note: 'React · Vite · JS · Node' },
  { n: '11', name: 'Web Design', count: 7, icon: 'web', note: 'UI/UX · CSS · Figma' },
  { n: '12', name: 'Video Editing', count: 7, icon: 'video', note: 'reels · short-form · color' },
]

function SkillRow({ item, index }) {
  return (
    <motion.li
      className="skill-row"
      initial={{ opacity: 0, x: -28 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="skill-row-n">{item.n}</span>
      <span className="skill-row-icon"><SkillIcon id={item.icon} /></span>
      <span className="skill-row-name">{item.name}</span>
      <span className="skill-row-meta">
        <span className="skill-row-bar">
          <motion.span
            className="skill-row-fill"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: item.count / 10 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 + index * 0.05, ease: [0.16, 1, 0.3, 1] }}
          />
        </span>
        <span className="skill-row-count">{item.note ?? `${item.count}/10 lavori`}</span>
      </span>
    </motion.li>
  )
}

export default function Skills() {
  return (
    <section id="competenze" className="skills-section">
      <div className="skills-intro">
        <p className="skills-kicker">
          <span className="skills-kicker-dot" /> 04 — strumenti &amp; competenze
        </p>
        <h2 className="skills-heading">
          3D, <em>web</em> e <em>video</em> — un insieme di competenze costruito progetto per progetto.
        </h2>
        <p className="skills-lede">
          Blender per le scene 3D, React e CSS per i siti, Premiere per il montaggio video.
          Discipline diverse che si parlano: ogni progetto è un punto di incontro tra tecnica, design e racconto visivo.
        </p>
      </div>

      <motion.div
        className="skill-tool"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="skill-tool-icon"><SkillIcon id="blender" /></span>
        <div className="skill-tool-body">
          <p className="skill-tool-label">{TOOL.label}</p>
          <h3 className="skill-tool-name">{TOOL.name}</h3>
          <p className="skill-tool-text">{TOOL.text}</p>
        </div>
        <p className="skill-tool-presence">{TOOL.presence}</p>
      </motion.div>

      <ul className="skill-index">
        {DISCIPLINES.map((item, i) => (
          <SkillRow item={item} index={i} key={item.name} />
        ))}
      </ul>
    </section>
  )
}
