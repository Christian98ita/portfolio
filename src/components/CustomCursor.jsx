import { useEffect, useRef, useState } from 'react'
import './CustomCursor.css'

function getBgLuminance(el) {
  let node = el
  while (node && node !== document.documentElement) {
    const bg = window.getComputedStyle(node).backgroundColor
    if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
      const m = bg.match(/(\d+),\s*(\d+),\s*(\d+)/)
      if (m) {
        return (0.299 * +m[1] + 0.587 * +m[2] + 0.114 * +m[3]) / 255
      }
    }
    node = node.parentElement
  }
  return 0
}

export default function CustomCursor() {
  const dotRef   = useRef(null)
  const ringRef  = useRef(null)
  const [isLink,    setIsLink]    = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isCoarse,  setIsCoarse]  = useState(true)
  const [isLight,   setIsLight]   = useState(false)

  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)').matches
    setIsCoarse(coarse)
    if (coarse) return undefined

    const ring = { x: 0, y: 0 }
    const dot  = { x: 0, y: 0 }
    let raf
    let lastCheck = 0

    const onMove = (e) => {
      dot.x = e.clientX
      dot.y = e.clientY
      setIsVisible(true)

      const target = e.target.closest('a, button, [data-cursor="link"]')
      setIsLink(Boolean(target))

      const now = Date.now()
      if (now - lastCheck > 80) {
        lastCheck = now
        const el = document.elementFromPoint(e.clientX, e.clientY)
        if (el) setIsLight(getBgLuminance(el) > 0.5)
      }
    }

    const onLeave = () => setIsVisible(false)

    const tick = () => {
      ring.x += (dot.x - ring.x) * 0.16
      ring.y += (dot.y - ring.y) * 0.16
      if (dotRef.current)  dotRef.current.style.transform  = `translate3d(${dot.x}px,${dot.y}px,0)`
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${ring.x}px,${ring.y}px,0)`
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (isCoarse) return null

  return (
    <div
      className={[
        'cursor-layer',
        isVisible ? 'is-visible' : '',
        isLink    ? 'is-link'    : '',
        isLight   ? 'is-light'   : '',
      ].join(' ')}
      aria-hidden="true"
    >
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />
    </div>
  )
}
