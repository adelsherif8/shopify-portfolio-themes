import { useEffect, useRef, useState } from 'react'
import s from './Cursor.module.css'

const TRAIL = 7

export default function Cursor() {
  const ringRef = useRef(null)
  const dotRef  = useRef(null)
  const trailRefs = useRef([])
  const pos  = useRef({ mx:0, my:0, cx:0, cy:0 })
  const trail= useRef(Array(TRAIL).fill({ x:0, y:0 }))
  const [label, setLabel] = useState('')
  const [big,   setBig]   = useState(false)

  useEffect(() => {
    const onMove = e => { pos.current.mx = e.clientX; pos.current.my = e.clientY }
    window.addEventListener('mousemove', onMove)

    // Hover detection
    const addHover = (sel, lbl = '') => {
      document.querySelectorAll(sel).forEach(el => {
        el.addEventListener('mouseenter', () => { setBig(true); setLabel(lbl) })
        el.addEventListener('mouseleave', () => { setBig(false); setLabel('') })
      })
    }

    const interval = setInterval(() => {
      addHover('a, button, .hoverable', '')
      addHover('.film-card-el', 'DRAG')
      addHover('.gallery-el', 'VIEW')
      addHover('.reel-play-el', 'PLAY')
    }, 800)

    let raf
    function tick() {
      const p = pos.current
      p.cx += (p.mx - p.cx) * 0.1
      p.cy += (p.my - p.cy) * 0.1
      if (ringRef.current) {
        ringRef.current.style.left = p.cx + 'px'
        ringRef.current.style.top  = p.cy + 'px'
      }
      if (dotRef.current) {
        dotRef.current.style.left = p.mx + 'px'
        dotRef.current.style.top  = p.my + 'px'
      }
      // Trail
      let px = p.cx, py = p.cy
      trail.current = trail.current.map((t, i) => {
        const nx = t.x + (px - t.x) * 0.28
        const ny = t.y + (py - t.y) * 0.28
        const el = trailRefs.current[i]
        if (el) {
          el.style.left = nx + 'px'
          el.style.top  = ny + 'px'
          el.style.opacity = ((1 - i / TRAIL) * 0.22).toString()
          el.style.transform = `translate(-50%,-50%) scale(${1 - i / TRAIL * 0.55})`
        }
        px = nx; py = ny
        return { x: nx, y: ny }
      })
      raf = requestAnimationFrame(tick)
    }
    tick()
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); clearInterval(interval) }
  }, [])

  return (
    <>
      <div ref={ringRef} className={`${s.ring} ${big ? s.big : ''}`} data-label={label} />
      <div ref={dotRef}  className={s.dot} />
      {Array.from({ length: TRAIL }).map((_, i) => (
        <div key={i} ref={el => trailRefs.current[i] = el} className={s.trail} />
      ))}
    </>
  )
}
