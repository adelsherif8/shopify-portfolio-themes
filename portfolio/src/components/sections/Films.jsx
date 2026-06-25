import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useSection } from '../../context/SectionContext'
import { films } from '../../data'
import PlaceholderImg from '../ui/PlaceholderImg'
import useLang from '../../hooks/useLang'
import s from './Films.module.css'

export default function Films() {
  const ref    = useRef(null)
  const slider = useRef(null)
  const { registerSection } = useSection()
  const t = useLang()
  useEffect(() => registerSection('Films', ref.current), [])

  // Drag scroll
  useEffect(() => {
    const el = slider.current; if (!el) return
    let isDown = false, startX, scrollLeft
    const md = e => { isDown=true; el.classList.add(s.dragging); startX=e.pageX-el.offsetLeft; scrollLeft=el.scrollLeft }
    const mu = ()  => { isDown=false; el.classList.remove(s.dragging) }
    const mm = e => { if(!isDown) return; e.preventDefault(); const x=e.pageX-el.offsetLeft; el.scrollLeft=scrollLeft-(x-startX)*1.4 }
    el.addEventListener('mousedown',md); el.addEventListener('mouseleave',mu)
    el.addEventListener('mouseup',mu);   el.addEventListener('mousemove',mm)
    return () => { el.removeEventListener('mousedown',md); el.removeEventListener('mouseleave',mu); el.removeEventListener('mouseup',mu); el.removeEventListener('mousemove',mm) }
  }, [])

  return (
    <section ref={ref} id="films" className={s.films} dir={t.dir}>
      <div className={s.header}>
        <div className="s-label">{t.films.label}</div>
        <p className={s.intro}>{t.films.intro}</p>
      </div>
      <div ref={slider} className={s.slider}>
        {films.map((f, i) => (
          <motion.div key={f.id} className={`${s.card} film-card-el`}
            initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}}
            transition={{duration:.9,delay:i*.1,ease:[.16,1,.3,1]}} viewport={{once:true}}>
            <PlaceholderImg className={s.cardImg} icon={f.icon} label={f.title} sublabel={f.role} />
            <div className={s.cardBg} />
            <div className={s.cardOverlay} />
            <div className={s.scanlines} />
            {['tl','tr','bl','br'].map(p=><div key={p} className={`${s.corner} ${s['c_'+p]}`}/>)}
            <span className={s.cardNum}>{f.num}</span>
            <div className={s.cardInfo}>
              <div className={s.cardTags}>
                {f.tags.map(tag=><span key={tag} className={s.tag}>{tag}</span>)}
                <span className={s.role}>{f.role}</span>
              </div>
              <h3 className={s.cardTitle}>{f.title}</h3>
              {f.arabic && <div className={s.cardArabic}>{f.arabic}</div>}
              <p className={s.logline}>{f.logline}</p>
              <div className={s.cardSub}>{f.subtitle}</div>
              <p className={s.cardDesc}>{f.desc}</p>
            </div>
            <div className={s.cardLine}/>
          </motion.div>
        ))}
      </div>
      <div className={s.hint}>
        <svg viewBox="0 0 40 20" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M0 10h36M28 3l8 7-8 7"/>
        </svg>
        {t.films.hint}
      </div>
    </section>
  )
}
