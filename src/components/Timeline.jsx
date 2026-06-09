import { motion } from 'framer-motion'
import './Timeline.css'

const CHAPTERS = [
  {
    n: '01',
    label: 'le prime scintille',
    title: 'La curiosità per il fare',
    text: "Tutto è iniziato con la voglia di capire come nascono le cose — giochi, immagini, storie. Smontare per capire, ricostruire per imparare: da lì è nato il desiderio di creare con le mie mani, e con un computer.",
  },
  {
    n: '02',
    label: 'gli studi — portsmouth, uk',
    title: 'Computer Games Technology',
    text: "Il percorso mi ha portato in Inghilterra, dove ho conseguito una laurea in Computer Games Technology all'Università di Portsmouth — il punto in cui tecnologia e creatività hanno smesso di essere due mondi separati.",
  },
  {
    n: '03',
    label: "l'incontro con il 3D",
    title: 'Dare forma alle idee',
    text: 'Il 3D mi ha aperto un nuovo modo di pensare: non più solo immagini piatte, ma oggetti, scene e mondi che prendono forma e si possono esplorare da ogni angolazione — dove tecnica e immaginazione si incontrano davvero.',
  },
  {
    n: '04',
    label: 'oggi',
    title: 'Design, 3D, storytelling, AI',
    text: "Oggi lavoro tra design, 3D art, visual storytelling, branding e tecnologie AI emergenti — costruendo immagini, concept ed esperienze che uniscono immaginazione e realtà, con un solo obiettivo: lasciare un'impressione.",
  },
  {
    n: '05',
    label: 'il prossimo capitolo',
    title: "Solo l'inizio del viaggio",
    text: "Credo che la creatività sia più di un'estetica: è la capacità di trasformare idee in qualcosa che le persone possano vedere, sentire e ricordare. E questo, per me, è solo l'inizio.",
  },
]

function Chapter({ chapter, index }) {
  return (
    <motion.li
      className="tl-chapter"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.09, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="tl-n" aria-hidden="true">{chapter.n}</span>
      <p className="tl-label">{chapter.label}</p>
      <h3 className="tl-title">{chapter.title}</h3>
      <p className="tl-text">{chapter.text}</p>
    </motion.li>
  )
}

export default function Timeline() {
  return (
    <section id="storia" className="timeline-section">
      <div className="timeline-intro">
        <p className="timeline-kicker">
          <span className="timeline-kicker-dot" /> 02 — la mia storia
        </p>
        <h2 className="timeline-heading">
          La creatività è sempre stata <em>il mio modo</em> di capire il mondo.
        </h2>
        <p className="timeline-lede">
          Cinque capitoli, non in ordine cronologico perfetto ma in ordine di significato —
          ognuno ha cambiato il modo in cui guardo a ciò che costruisco.
        </p>
      </div>

      <ol className="tl-grid">
        {CHAPTERS.map((chapter, i) => (
          <Chapter key={chapter.n} chapter={chapter} index={i} />
        ))}
      </ol>
    </section>
  )
}
