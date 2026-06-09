import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import './Projects.css'

const PROJECTS = [
  {
    n: '01',
    category: 'scena 3d — ambiente naturale',
    title: 'Fire Farm',
    stack: ['Blender', 'Lighting', 'Environment'],
    video: '/videos/FIRE FARM0001-0150.mkv',
  },
  {
    n: '02',
    category: 'scultura digitale — figura classica',
    title: 'Statue',
    stack: ['Blender', 'Sculpting', 'Lighting'],
    video: '/videos/STATUE0001-0150.mkv',
  },
  {
    n: '03',
    category: 'scena 3d — worldbuilding',
    title: 'River',
    stack: ['Blender', 'Environment', 'World-building'],
    video: '/videos/river0001-0150.mkv',
  },
  {
    n: '04',
    category: 'animazione — composizione surreale',
    title: 'Carousel',
    stack: ['Blender', 'Animation', 'Lighting'],
    video: '/videos/carousel0001-0150.mkv',
  },
  {
    n: '05',
    category: 'architettura — studio di luce',
    title: 'Window',
    stack: ['Blender', 'Lighting', 'Composition'],
    video: '/videos/window0001-0150.mkv',
  },
  {
    n: '06',
    category: 'paesaggio — atmosfera naturale',
    title: 'Bedfield',
    stack: ['Blender', 'Environment', 'Rendering'],
    video: '/videos/bedfield0001-0150.mkv',
  },
  {
    n: '07',
    category: 'product render — art direction',
    title: 'Slot Machine',
    stack: ['Blender', 'Product viz', 'Animation'],
    video: '/videos/slotnew0001-0150.mkv',
  },
  {
    n: '08',
    category: 'studio — composizione astratta',
    title: 'Studio',
    stack: ['Blender', 'Lighting', 'Concept art'],
    video: '/videos/0001-0150.mkv',
  },
]

function ProjectCard({ project, index }) {
  const cardRef = useRef(null)
  const vidRef  = useRef(null)
  const shineRef = useRef(null)
  const rafRef  = useRef(null)
  const target  = useRef({ rx: 0, ry: 0, sx: 50, sy: 50 })
  const current = useRef({ rx: 0, ry: 0, sx: 50, sy: 50 })

  const animate = () => {
    const t = target.current
    const c = current.current
    const lerp = (a, b, n) => a + (b - a) * n
    c.rx = lerp(c.rx, t.rx, 0.1)
    c.ry = lerp(c.ry, t.ry, 0.1)
    c.sx = lerp(c.sx, t.sx, 0.1)
    c.sy = lerp(c.sy, t.sy, 0.1)

    if (cardRef.current) {
      cardRef.current.style.transform =
        `perspective(900px) rotateX(${c.rx}deg) rotateY(${c.ry}deg) scale3d(1.03,1.03,1.03)`
    }
    if (shineRef.current) {
      shineRef.current.style.background =
        `radial-gradient(circle at ${c.sx}% ${c.sy}%, rgba(255,255,255,0.13) 0%, transparent 65%)`
    }

    const stillMoving =
      Math.abs(c.rx - t.rx) > 0.01 ||
      Math.abs(c.ry - t.ry) > 0.01 ||
      Math.abs(c.sx - t.sx) > 0.01 ||
      Math.abs(c.sy - t.sy) > 0.01

    if (stillMoving) rafRef.current = requestAnimationFrame(animate)
    else rafRef.current = null
  }

  useEffect(() => {
    const v = vidRef.current
    if (!v) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {})
        else { v.pause(); v.currentTime = 0 }
      },
      { threshold: 0.25 }
    )
    obs.observe(v)
    return () => obs.disconnect()
  }, [])

  const onMouseEnter = () => {
    vidRef.current?.play().catch(() => {})
  }

  const onMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width  - 0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5
    target.current = {
      rx: -y * 14,
      ry:  x * 14,
      sx: (x + 0.5) * 100,
      sy: (y + 0.5) * 100,
    }
    if (!rafRef.current) rafRef.current = requestAnimationFrame(animate)
  }

  const onMouseLeave = () => {
    target.current = { rx: 0, ry: 0, sx: 50, sy: 50 }
    if (!rafRef.current) rafRef.current = requestAnimationFrame(animate)
    const v = vidRef.current
    if (v) { v.pause(); v.currentTime = 0 }
  }

  return (
    <motion.article
      className="proj-card"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px -8% 0px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
    >
      <div className="proj-frame" ref={cardRef}>
        <video
          ref={vidRef}
          className="proj-img"
          src={project.video}
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div ref={shineRef} className="proj-shine" aria-hidden="true" />
        <div className="proj-overlay">
          <span className="proj-n">{project.n}</span>
          <div className="proj-foot">
            <p className="proj-cat">{project.category}</p>
            <h3 className="proj-title">{project.title}</h3>
            <ul className="proj-stack">
              {project.stack.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  return (
    <section id="progetti" className="projects-section">
      <div className="projects-intro">
        <p className="projects-kicker">
          <span className="projects-kicker-dot" /> 02 — progetti
        </p>
        <h2 className="projects-heading">
          Una selezione di lavori dove <em>idea</em> e <em>tecnica</em> si incontrano.
        </h2>
        <p className="projects-lede">
          Scene sospese, render animati, composizioni surreali e piccoli universi di marca —
          ognuno racconta un momento, un'atmosfera, una storia costruita frame per frame.
        </p>
        <p className="projects-count">— {PROJECTS.length} lavori, scorri per esplorare —</p>
      </div>

      <div className="proj-grid">
        {PROJECTS.map((project, i) => (
          <ProjectCard project={project} index={i} key={project.n} />
        ))}
      </div>
    </section>
  )
}
