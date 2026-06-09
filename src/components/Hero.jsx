import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Scene3D from './Scene3D'
import './Hero.css'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const rnd = () => CHARS[Math.floor(Math.random() * CHARS.length)]

function ScrambleText({ text, startDelay = 0, ready = true }) {
  const [chars, setChars] = useState(() => text.split('').map(c => (c === ' ' ? ' ' : rnd())))

  useEffect(() => {
    if (!ready) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setChars(text.split(''))
      return
    }
    let locked = 0
    let intervalId
    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        setChars(text.split('').map((c, i) => {
          if (i < locked) return c
          if (c === ' ') return ' '
          return rnd()
        }))
        if (Math.random() < 0.28) locked++
        if (locked >= text.length) {
          setChars(text.split(''))
          clearInterval(intervalId)
        }
      }, 48)
    }, startDelay)
    return () => { clearTimeout(timeoutId); clearInterval(intervalId) }
  }, [text, startDelay, ready])

  return <>{chars.join('')}</>
}

const NAV = [
  { label: 'Storia', href: '#storia', index: '01' },
  { label: 'Progetti', href: '#progetti', index: '02' },
  { label: 'Competenze', href: '#competenze', index: '03' },
  { label: 'Contatti', href: '#contatti', index: '04' },
]

const reveal = {
  hidden: { opacity: 0, y: '100%' },
  visible: (i = 0) => ({
    opacity: 1,
    y: '0%',
    transition: { duration: 0.9, delay: 0.15 + i * 0.09, ease: [0.16, 1, 0.3, 1] },
  }),
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.5 + i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function Hero({ pointer, ready = false }) {
  return (
    <header className="hero" id="top">
      <div className="hero-scene" aria-hidden="true">
        <Scene3D pointer={pointer} />
      </div>
      <div className="hero-scrim" aria-hidden="true" />

      {/* collage backdrop: soft blurred forms, layered behind type & 3D object */}
      <div className="hero-collage" aria-hidden="true">
        <span className="blob blob-lime" />
        <span className="blob blob-paper" />
        <span className="blob blob-ring" />
      </div>

      <nav className="hero-nav">
        <a className="hero-mark" href="#top">
          <span className="hero-mark-dot" />
          Christian Paradiso
        </a>
        <ul className="hero-nav-list">
          {NAV.map((item) => (
            <li key={item.href}>
              <a href={item.href}>
                <span className="hero-nav-index">{item.index}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="hero-stage">
        <p className="hero-kicker">
          <span className="hero-kicker-mark">＊</span> portfolio personale — edizione 2026
        </p>

        <h1 className="hero-display" aria-label="Christian Paradiso">
          <span className="hero-line-mask">
            <motion.span className="hero-line" custom={0} variants={reveal} initial="hidden" animate={ready ? "visible" : "hidden"}>
              <ScrambleText text="Christian" startDelay={300} ready={ready} />
            </motion.span>
          </span>
          <span className="hero-line-mask">
            <motion.span className="hero-line hero-line-outline" custom={1} variants={reveal} initial="hidden" animate={ready ? "visible" : "hidden"}>
              <ScrambleText text="Paradiso" startDelay={600} ready={ready} />
            </motion.span>
          </span>
        </h1>

        <motion.p className="hero-role" custom={2} variants={fadeUp} initial="hidden" animate={ready ? "visible" : "hidden"}>
          Sviluppo <span className="hero-role-divider">·</span> design digitale{' '}
          <span className="hero-role-divider">·</span> contenuti creativi
        </motion.p>
      </div>

      {/* scattered editorial details — numerals, captions, marks */}
      <motion.span
        className="hero-scatter hero-scatter-index"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 1.1 }}
      >
        01—05
      </motion.span>

      <motion.span
        className="hero-scatter hero-scatter-caption"
        initial={{ opacity: 0, x: -12 }}
        animate={ready ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
        transition={{ duration: 0.8, delay: 1.05 }}
      >
        oggetto scultoreo, render 3D — studio digitale, 2026
      </motion.span>

      <motion.div
        className="hero-cta-row"
        initial={{ opacity: 0, y: 16 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.7, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
      >
        <a className="hero-cta hero-cta-fill" href="#progetti">
          Vedi i progetti <span className="hero-cta-arrow">→</span>
        </a>
        <a className="hero-cta hero-cta-line" href="#storia">
          La mia storia
        </a>
      </motion.div>

      <motion.div
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 1.3 }}
      >
        <span className="hero-scroll-label">scroll</span>
        <span className="hero-scroll-mark">↓</span>
      </motion.div>
    </header>
  )
}
