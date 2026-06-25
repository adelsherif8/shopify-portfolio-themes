import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useSection } from '../../context/SectionContext'
import useLang from '../../hooks/useLang'
import s from './NextProject.module.css'

export default function NextProject() {
  const ref = useRef(null)
  const { registerSection } = useSection()
  const t = useLang()
  useEffect(() => registerSection('Next Project', ref.current), [])

  return (
    <section ref={ref} id="next" className={`${s.np} section`} dir={t.dir}>
      <div className="s-label">{t.next.label}</div>
      <div className={s.card}>
        <div className={s.stamp}>{t.next.stamp}</div>
        <div className={s.scanlines} />
        <div className={s.cornerTL}/><div className={s.cornerBR}/>
        <motion.div
          initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}}
          transition={{duration:.9}} viewport={{once:true}}>
          <div className={s.ref}>{t.next.ref}</div>
          <h2 className={s.title}>
            <span className={s.redact}>█████████████</span>{t.next.title[0]}
            <span className={s.redact}>████████████</span>
          </h2>
          <div className={s.meta}>
            <div className={s.metaRow}><span className={s.metaKey}>{t.next.keys.STATUS}</span><span className={s.metaVal}>{t.next.status}</span></div>
            <div className={s.metaRow}><span className={s.metaKey}>{t.next.keys.FORMAT}</span><span className={s.metaVal}>{t.next.format} / <span className={s.redact}>███</span></span></div>
            <div className={s.metaRow}><span className={s.metaKey}>{t.next.keys.GENRE}</span><span className={s.metaVal}><span className={s.redact}>█████████</span></span></div>
            <div className={s.metaRow}><span className={s.metaKey}>{t.next.keys.ROLE}</span><span className={s.metaVal}>{t.next.role}</span></div>
          </div>
          <p className={s.desc}>{t.next.desc}</p>
          <a href="#contact" className={s.cta}>{t.next.cta}</a>
        </motion.div>
      </div>
    </section>
  )
}
