import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import './Statement.css'

export default function Statement() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], ['5%', '-5%'])
  const y2 = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])

  return (
    <section className="stmt-section" ref={ref} aria-label="Manifesto">
      <div className="stmt-inner">

        <motion.p
          className="stmt-label"
          style={{ y: y1 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
        >
          ＊ &nbsp; il mio approccio
        </motion.p>

        <div className="stmt-text">
          {['Non creo', 'immagini.', 'Creo mondi.'].map((line, i) => (
            <motion.span
              key={line}
              className={`stmt-line stmt-line--${['fill', 'outline', 'lime'][i]}`}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.85, delay: i * 0.13, ease: [0.16, 1, 0.3, 1] }}
            >
              {line}
            </motion.span>
          ))}
        </div>

        <motion.p
          className="stmt-sub"
          style={{ y: y2 }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          Ogni progetto parte da un&apos;idea, cresce in una storia e<br />
          diventa un universo visivo con regole proprie.
        </motion.p>

        <motion.div
          className="stmt-rule"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ originX: 0 }}
        />

      </div>
    </section>
  )
}
