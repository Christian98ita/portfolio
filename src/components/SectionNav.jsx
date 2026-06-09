import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './SectionNav.css'

/* A floating "table of contents" — lets anyone (a recruiter in a hurry, a
   curious visitor) jump straight to the part they care about instead of
   scrolling through the whole story, while always showing where they are. */
const SECTIONS = [
  { id: 'storia', n: '01', label: 'Storia' },
  { id: 'progetti', n: '02', label: 'Progetti' },
  { id: 'competenze', n: '03', label: 'Competenze' },
  { id: 'contatti', n: '04', label: 'Contatti' },
]

export default function SectionNav() {
  const [active, setActive] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches
    if (isCoarse) return undefined

    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-44% 0px -44% 0px', threshold: 0 }
    )
    els.forEach((el) => observer.observe(el))

    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          className="section-nav"
          aria-label="Naviga rapidamente tra le sezioni"
          initial={{ opacity: 0, x: 22 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 22 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <ul className="section-nav-list">
            {SECTIONS.map((s) => (
              <li key={s.id} className={s.id === active ? 'is-active' : ''}>
                <a href={`#${s.id}`} data-cursor="link">
                  <span className="section-nav-n">{s.n}</span>
                  <span className="section-nav-dot" />
                  <span className="section-nav-label">{s.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
