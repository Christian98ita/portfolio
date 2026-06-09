import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './VideoGallery.css'

const VIDEOS = [
  { id: 1, src: '/videos/FIRE FARM0001-0150.mkv',  title: 'Fire Farm',   cat: 'Animazione 3D' },
  { id: 2, src: '/videos/STATUE0001-0150.mkv',       title: 'Statue',      cat: 'Animazione 3D' },
  { id: 3, src: '/videos/river0001-0150.mkv',        title: 'River',       cat: 'Animazione 3D' },
  { id: 4, src: '/videos/carousel0001-0150.mkv',     title: 'Carousel',    cat: 'Animazione 3D' },
  { id: 5, src: '/videos/window0001-0150.mkv',       title: 'Window',      cat: 'Animazione 3D' },
  { id: 6, src: '/videos/bedfield0001-0150.mkv',     title: 'Bedfield',    cat: 'Animazione 3D' },
  { id: 7, src: '/videos/slotnew0001-0150.mkv',      title: 'Slot Machine',cat: 'Animazione 3D' },
  { id: 8, src: '/videos/0001-0150.mkv',             title: 'Studio',      cat: 'Animazione 3D' },
]

function VideoCard({ video, index, onClick }) {
  const vidRef  = useRef(null)
  const [hovered, setHovered] = useState(false)

  const onEnter = () => {
    setHovered(true)
    vidRef.current?.play().catch(() => {})
  }
  const onLeave = () => {
    setHovered(false)
    const v = vidRef.current
    if (v) { v.pause(); v.currentTime = 0 }
  }

  const featured = index === 0

  return (
    <motion.article
      className={['vg-card', featured ? 'vg-card--featured' : ''].join(' ')}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.07, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={() => onClick(index)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(index)}
      aria-label={`Guarda ${video.title}`}
    >
      <div className="vg-frame">
        <video
          ref={vidRef}
          className="vg-video"
          src={video.src}
          muted
          loop
          playsInline
          preload="metadata"
        />

        <div className={['vg-overlay', hovered ? 'is-hovered' : ''].join(' ')}>
          <span className="vg-n" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>

          <div className="vg-play-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>

          <div className="vg-info">
            <p className="vg-cat">{video.cat}</p>
            <h3 className="vg-title">{video.title}</h3>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

function Lightbox({ videos, index, onClose, onPrev, onNext }) {
  const video = videos[index]

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape')     onClose()
      if (e.key === 'ArrowLeft')  onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  return (
    <motion.div
      className="lb-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
    >
      <motion.div
        className="lb-content"
        initial={{ scale: 0.93, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.93, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <video
          key={video.src}
          className="lb-video"
          src={video.src}
          controls
          autoPlay
          loop
          playsInline
        />

        <div className="lb-bar">
          <div className="lb-meta">
            <p className="lb-cat">{video.cat}</p>
            <h3 className="lb-title">{video.title}</h3>
          </div>
          <div className="lb-nav">
            <button className="lb-nav-btn" onClick={onPrev} aria-label="Precedente">←</button>
            <span className="lb-counter">{index + 1} / {videos.length}</span>
            <button className="lb-nav-btn" onClick={onNext} aria-label="Successivo">→</button>
          </div>
        </div>
      </motion.div>

      <button className="lb-close" onClick={onClose} aria-label="Chiudi">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <div className="lb-arrows">
        <button className="lb-arrow lb-arrow--prev" onClick={onPrev} aria-label="Precedente">←</button>
        <button className="lb-arrow lb-arrow--next" onClick={onNext} aria-label="Successivo">→</button>
      </div>
    </motion.div>
  )
}

export default function VideoGallery() {
  const [activeIdx, setActiveIdx] = useState(null)

  const open  = useCallback((i) => setActiveIdx(i), [])
  const close = useCallback(() => setActiveIdx(null), [])
  const prev  = useCallback(() => setActiveIdx((i) => (i - 1 + VIDEOS.length) % VIDEOS.length), [])
  const next  = useCallback(() => setActiveIdx((i) => (i + 1) % VIDEOS.length), [])

  return (
    <section id="video" className="vg-section">
      <div className="vg-header">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="vg-kicker"><span className="vg-kicker-mark">＊</span> 04 — contenuti creativi</p>
          <h2 className="vg-heading">
            Animazioni<br /><em>& render.</em>
          </h2>
        </motion.div>
      </div>

      <div className="vg-grid">
        {VIDEOS.map((v, i) => (
          <VideoCard key={v.id} video={v} index={i} onClick={open} />
        ))}
      </div>

      <AnimatePresence>
        {activeIdx !== null && (
          <Lightbox
            videos={VIDEOS}
            index={activeIdx}
            onClose={close}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
