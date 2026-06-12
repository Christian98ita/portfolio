import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './Stats.css'

const STATS = [
  { value: 8,  suffix: '',  label: 'render & animazioni' },
  { value: 5,  suffix: '+', label: 'anni di esperienza'  },
  { value: 12, suffix: '+', label: 'progetti completati' },
  { value: 0,  suffix: '',  label: 'compromessi'         },
]

function Counter({ target, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    if (target === 0) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 1400
        const steps = target
        const interval = duration / steps
        let current = 0
        const timer = setInterval(() => {
          current++
          setCount(current)
          if (current >= target) clearInterval(timer)
        }, interval)
      }
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target])

  return <span ref={ref}>{target === 0 ? '0' : count}{suffix}</span>
}

export default function Stats() {
  return (
    <section className="stats-section" aria-label="Numeri">
      <div className="stats-inner">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            className="stats-item"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="stats-value">
              <Counter target={s.value} suffix={s.suffix} />
            </p>
            <p className="stats-label">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
