import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useSection } from '../../context/SectionContext'
import { skills } from '../../data'
import useLang from '../../hooks/useLang'
import s from './Craft.module.css'

const frameIcons = [
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M14.5 4h-5L7 7H4a2 2 0 00-2 2v9a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8"/></svg>,
]

const radarData = [
  { name: 'Script Writing',    val: 0.95 },
  { name: 'Story Dev',         val: 0.90 },
  { name: 'Creative Dir',      val: 0.88 },
  { name: 'Visual Story',      val: 0.84 },
  { name: 'Film Production',   val: 0.80 },
  { name: 'Sound Recording',   val: 0.78 },
  { name: 'Set Collaboration', val: 0.82 },
  { name: 'Directing',         val: 0.76 },
]

function RadarChart({ radarNote }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true })
  const [vals, setVals] = useState(radarData.map(() => 0))

  useEffect(() => {
    if (!inView) return
    let frame = 0
    const total = 70
    const tick = () => {
      frame++
      const t = Math.min(frame / total, 1)
      const ease = 1 - Math.pow(1 - t, 3)
      setVals(radarData.map(d => d.val * ease))
      if (frame < total) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView])

  const cx = 200, cy = 200, maxR = 138
  const n = radarData.length
  const angle = i => (i * 2 * Math.PI / n) - Math.PI / 2
  const pt    = (r, i) => ({ x: cx + r * Math.cos(angle(i)), y: cy + r * Math.sin(angle(i)) })
  const rings = [0.25, 0.5, 0.75, 1.0]
  const polyPoints = vals.map((v, i) => { const p = pt(v * maxR, i); return `${p.x},${p.y}` }).join(' ')

  return (
    <svg ref={ref} viewBox="0 0 400 400" className={s.radar}>
      {rings.map((r, ri) => (
        <polygon key={ri}
          points={radarData.map((_, i) => { const p = pt(r * maxR, i); return `${p.x},${p.y}` }).join(' ')}
          fill="none" stroke="rgba(184,151,58,0.09)" strokeWidth="1"
        />
      ))}
      {radarData.map((_, i) => {
        const o = pt(maxR, i)
        return <line key={i} x1={cx} y1={cy} x2={o.x} y2={o.y} stroke="rgba(184,151,58,0.07)" strokeWidth="1" />
      })}
      <circle cx={cx} cy={cy} r="3" fill="rgba(184,151,58,0.3)" />
      <polygon points={polyPoints} fill="rgba(184,151,58,0.07)" stroke="rgba(184,151,58,0.55)" strokeWidth="1.5" />
      {vals.map((v, i) => {
        const p = pt(v * maxR, i)
        return <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="var(--gold)" opacity="0.75" />
      })}
      {radarData.map((d, i) => {
        const p = pt(maxR + 26, i)
        const anchor = p.x < cx - 8 ? 'end' : p.x > cx + 8 ? 'start' : 'middle'
        return (
          <text key={i} x={p.x} y={p.y} textAnchor={anchor} dominantBaseline="middle"
            fontSize="8" fill="rgba(255,255,255,0.38)" fontFamily="var(--font-mono)" letterSpacing="1">
            {d.name.toUpperCase()}
          </text>
        )
      })}
      <text x={cx} y={390} textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.12)"
        fontFamily="var(--font-mono)" letterSpacing="1.5">
        {radarNote}
      </text>
    </svg>
  )
}

export default function Craft() {
  const ref = useRef(null)
  const { registerSection } = useSection()
  const t = useLang()
  useEffect(() => registerSection('Craft', ref.current), [])

  return (
    <section ref={ref} id="craft" className={`${s.craft} section`} dir={t.dir}>
      <div className="s-label">{t.craft.label}</div>
      <div className={s.top}>
        <motion.h2 className={s.heading}
          initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}}
          transition={{duration:.9}} viewport={{once:true}}>
          {t.craft.heading[0]}<br />{t.craft.heading[1]}<em>{t.craft.heading[2]}</em>
        </motion.h2>
        <motion.p className={s.desc}
          initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}}
          transition={{duration:.9,delay:.1}} viewport={{once:true}}>
          {t.craft.desc}
        </motion.p>
      </div>

      <div className={s.frames}>
        {t.craft.frames.map((fb, i) => (
          <motion.div key={fb.label} className={s.frame}
            initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}}
            transition={{duration:.8,delay:i*.1}} viewport={{once:true}}>
            <div className={s.frameLines} />
            <div className={s.frameContent}>
              <div className={s.frameIcon}>{frameIcons[i]}</div>
              <div className={s.frameLbl}>{fb.label}</div>
              <div className={s.frameTitle}>{fb.title}</div>
            </div>
            <span className={s.frameCn}>F0{i+1}</span>
          </motion.div>
        ))}
      </div>

      <motion.div className={s.radarWrap}
        initial={{opacity:0,scale:.95}} whileInView={{opacity:1,scale:1}}
        transition={{duration:1,ease:[.16,1,.3,1]}} viewport={{once:true}}>
        <RadarChart radarNote={t.craft.radarNote} />
        <div className={s.radarSkills}>
          {skills.map((sk, i) => (
            <motion.div key={sk.n} className={s.skill}
              initial={{opacity:0,x:-10}} whileInView={{opacity:1,x:0}}
              transition={{duration:.5,delay:i*.04}} viewport={{once:true}}>
              <span className={s.skillDot} />
              <div>
                <div className={s.skillName}>{sk.name}</div>
                <div className={s.skillSub}>{sk.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
