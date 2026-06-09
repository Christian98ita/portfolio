import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Preloader.css'

export default function Preloader({ onDone }) {
  const [count,   setCount]   = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    let current = 0
    const timer = setInterval(() => {
      current++
      setCount(current)
      if (current >= 100) {
        clearInterval(timer)
        setTimeout(() => setVisible(false), 320)
      }
    }, 11)
    return () => clearInterval(timer)
  }, [])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          className="preloader"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="preloader-center">
            <motion.span
              className="preloader-count"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {String(count).padStart(3, '0')}
            </motion.span>
          </div>

          <div className="preloader-bar-wrap">
            <div className="preloader-bar">
              <div className="preloader-fill" style={{ transform: `scaleX(${count / 100})` }} />
            </div>
          </div>

          <div className="preloader-footer">
            <span className="preloader-name">Christian Paradiso</span>
            <span className="preloader-year">portfolio 2026</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
