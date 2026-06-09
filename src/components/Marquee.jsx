import './Marquee.css'

const ITEMS = [
  'Blender', '3D Art', 'Web Design', 'Video Editing',
  'Branding', 'Storytelling', 'Creative Direction',
  'Visual Design', 'Lighting', 'World-building',
]

export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS]
  return (
    <div className="marquee-outer" aria-hidden="true">
      <div className="marquee-wrap">
        <div className="marquee-track">
          {doubled.map((item, i) => (
            <span key={i} className="marquee-item">
              {item}<span className="marquee-sep"> ·</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
