import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import Hero from './components/Hero'
import Timeline from './components/Timeline'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Marquee from './components/Marquee'
import Contact from './components/Contact'
import SectionNav from './components/SectionNav'
import CustomCursor from './components/CustomCursor'
import Preloader from './components/Preloader'
import Statement from './components/Statement'
import Stats from './components/Stats'
import './App.css'

function App() {
  const pointer = useRef({ x: 0, y: 0 })
  const [preloaderDone, setPreloaderDone] = useState(false)

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4) })
    let raf
    const tick = (time) => { lenis.raf(time); raf = requestAnimationFrame(tick) }
    raf = requestAnimationFrame(tick)
    return () => { lenis.destroy(); cancelAnimationFrame(raf) }
  }, [])

  useEffect(() => {
    const onMove = (e) => {
      pointer.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      }
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <>
      {!preloaderDone && <Preloader onDone={() => setPreloaderDone(true)} />}

      <CustomCursor />
      <SectionNav />
      <div className="grain-overlay" />

      <main>
        <Hero pointer={pointer} ready={preloaderDone} />

        <Timeline />

        <Projects />

        <Statement />

        <Marquee />

        <Skills />

        <Stats />

        <Contact />
      </main>
    </>
  )
}

export default App
