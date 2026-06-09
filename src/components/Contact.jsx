import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Contact.css'

const EMAIL = 'paradisochristian1926@gmail.com'
const SOCIALS = [
  { label: 'YouTube',   href: 'https://www.youtube.com/@christianparadiso2089' },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/christian-paradiso-784713185/' },
  { label: 'Instagram', href: 'https://www.instagram.com/rastyboyartmovement/' },
  { label: 'Behance',   href: 'https://www.behance.net/christiparadis/moodboards' },
]

// registrati su formspree.io e sostituisci XXXXXXXX con il tuo ID form
const FORMSPREE = 'https://formspree.io/f/mzdqgvlv'

const ICONS = {
  youtube: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <polygon points="10,9 16,12 10,15" fill="currentColor" stroke="none" />
    </>
  ),
  linkedin: <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />,
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  behance: (
    <>
      <path d="M2 6h7.5c2 0 3.5 1.3 3.5 3.2S11.5 12.5 9.5 12.5H2V6zM2 12.5H10c2.3 0 4 1.4 4 3.5S12.3 19.5 10 19.5H2v-7z" />
      <path d="M15.5 7.5h6M14 12.5h7.5" />
      <circle cx="17.5" cy="15" r="3.5" />
    </>
  ),
}

function SocialIcon({ id }) {
  return (
    <svg className="social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[id]}
    </svg>
  )
}

export default function Contact() {
  const [status, setStatus] = useState('idle')
  const [data, setData] = useState({ nome: '', email: '', messaggio: '' })

  const onChange = (e) => setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      })
      setStatus(res.ok ? 'ok' : 'err')
    } catch {
      setStatus('err')
    }
  }

  return (
    <section id="contatti" className="contact-section">
      <div className="contact-inner">

        <motion.div
          className="contact-info"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="contact-kicker">
            <span className="contact-kicker-dot" /> 05 — contatti
          </p>
          <h2 className="contact-heading">Parliamo.</h2>
          <p className="contact-lede">
            Hai un progetto in mente, stai cercando un collaboratore 3D&nbsp;/&nbsp;web,
            o vuoi semplicemente conoscermi? Scrivimi — rispondo sempre.
          </p>

          <a className="contact-email-link" href={'mailto:' + EMAIL} data-cursor="link">
            {EMAIL}
          </a>

          <div className="contact-avail">
            <span className="avail-pulse" aria-hidden="true" />
            Disponibile per nuovi progetti
          </div>

          <ul className="contact-socials">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" data-cursor="link" aria-label={s.label}>
                  <SocialIcon id={s.label.toLowerCase()} />
                  <span>{s.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="contact-form-wrap"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <AnimatePresence mode="wait">
            {status === 'ok' ? (
              <motion.div
                key="ok"
                className="contact-success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="success-check">✓</span>
                <p className="success-title">Messaggio inviato.</p>
                <p className="success-sub">Ti rispondo presto — promesso.</p>
              </motion.div>
            ) : (
              <motion.form key="form" className="contact-form" onSubmit={onSubmit} initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="nome">Nome</label>
                    <input id="nome" name="nome" className="form-input" type="text" required value={data.nome} onChange={onChange} autoComplete="name" />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input id="email" name="email" className="form-input" type="email" required value={data.email} onChange={onChange} autoComplete="email" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="messaggio">Messaggio</label>
                  <textarea id="messaggio" name="messaggio" className="form-textarea" rows="6" required value={data.messaggio} onChange={onChange} />
                </div>
                {status === 'err' && (
                  <p className="form-err">Qualcosa e' andato storto. Riprova o scrivimi direttamente via email.</p>
                )}
                <button className="form-submit" type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Invio in corso…' : 'Invia il messaggio →'}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <footer className="contact-footer">
        <p>© 2026 Christian Paradiso</p>
        <p className="contact-footer-tag">Fatto con cura, frame per frame.</p>
      </footer>
    </section>
  )
}
