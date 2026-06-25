import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useSection } from '../../context/SectionContext'
import { timeline } from '../../data'
import useLang from '../../hooks/useLang'
import s from './Timeline.module.css'

export default function Timeline() {
  const ref    = useRef(null)
  const slider = useRef(null)
  const { registerSection } = useSection()
  const t = useLang()
  useEffect(() => registerSection('Timeline', ref.current), [])

  // Drag scroll
  useEffect(() => {
    const el = slider.current; if (!el) return
    let isDown=false, startX, scrollLeft
    const md = e => { isDown=true; startX=e.pageX-el.offsetLeft; scrollLeft=el.scrollLeft; el.classList.add(s.drag) }
    const mu = ()  => { isDown=false; el.classList.remove(s.drag) }
    const mm = e => { if(!isDown) return; e.preventDefault(); el.scrollLeft=scrollLeft-(e.pageX-el.offsetLeft-startX)*1.3 }
    el.addEventListener('mousedown',md); el.addEventListener('mouseleave',mu)
    el.addEventListener('mouseup',mu);   el.addEventListener('mousemove',mm)
    return () => { el.removeEventListener('mousedown',md); el.removeEventListener('mouseleave',mu); el.removeEventListener('mouseup',mu); el.removeEventListener('mousemove',mm) }
  }, [])

  return (
    <section ref={ref} id="timeline" className={`${s.tl} section`} dir={t.dir}>
      <div className="s-label">{t.timeline.label}</div>
      <motion.h2 className={s.heading}
        initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}}
        transition={{duration:.9}} viewport={{once:true}}>
        {t.timeline.heading[0]}<em>{t.timeline.heading[1]}</em>{t.timeline.heading[2]}
      </motion.h2>
      <div ref={slider} className={s.slider}>
        <div className={s.line} />
        {timeline.map((ev, i) => (
          <motion.div key={i} className={s.item}
            initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}}
            transition={{duration:.7,delay:i*.06}} viewport={{once:true,amount:.3}}>
            <div className={s.dot} />
            <div className={s.year}>{ev.year}</div>
            <div className={s.event}>{ev.event_ar && t.dir === 'rtl' ? ev.event_ar : ev.event}</div>
            <div className={s.desc}>{ev.desc_ar && t.dir === 'rtl' ? ev.desc_ar : ev.desc}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
