import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useSection } from '../../context/SectionContext'
import { process } from '../../data'
import useLang from '../../hooks/useLang'
import s from './Process.module.css'

const icons = {
  pen:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
  camera: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M14.5 4h-5L7 7H4a2 2 0 00-2 2v9a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>,
  film:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 17h5M17 7h5"/></svg>,
}

export default function Process() {
  const ref = useRef(null)
  const { registerSection } = useSection()
  const t = useLang()
  useEffect(() => registerSection('Process', ref.current), [])

  return (
    <section ref={ref} id="process" className={`${s.proc} section`} dir={t.dir}>
      <div className="s-label">{t.process.label}</div>
      <h2 className={s.heading}>
        {t.process.heading[0]}<em>{t.process.heading[1]}</em>
      </h2>
      <div className={s.steps}>
        {process.map((p, i) => (
          <motion.div key={p.num} className={s.step}
            initial={{opacity:0,y:50}} whileInView={{opacity:1,y:0}}
            transition={{duration:.9,delay:i*.15,ease:[.16,1,.3,1]}} viewport={{once:true}}>
            <div className={s.stepTop}>
              <span className={s.stepNum}>{p.num}</span>
              <div className={s.stepIcon}>{icons[p.icon]}</div>
              {i < process.length - 1 && <div className={s.connector}><div className={s.connDot}/></div>}
            </div>
            <h3 className={s.stepTitle}>{t.dir === 'rtl' && p.title_ar ? p.title_ar : p.title}</h3>
            <p className={s.stepDesc}>{t.dir === 'rtl' && p.desc_ar ? p.desc_ar : p.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
