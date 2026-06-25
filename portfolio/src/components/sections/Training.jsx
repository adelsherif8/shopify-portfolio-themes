import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useSection } from '../../context/SectionContext'
import { training } from '../../data'
import useLang from '../../hooks/useLang'
import s from './Training.module.css'

export default function Training() {
  const ref = useRef(null)
  const { registerSection } = useSection()
  const t = useLang()
  useEffect(() => registerSection('Training', ref.current), [])

  return (
    <section ref={ref} id="training" className={`${s.tr} section`} dir={t.dir}>
      <div className="s-label">{t.training.label}</div>
      <motion.h2 className={s.heading}
        initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}}
        transition={{duration:.9}} viewport={{once:true}}>
        {t.training.heading[0]}<em>{t.training.heading[1]}</em>
      </motion.h2>
      <div className={s.list}>
        {training.map((item, i) => (
          <motion.div key={i} className={`${s.item} ${item.active ? s.active : ''}`}
            initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}}
            transition={{duration:.8,delay:i*.1,ease:[.16,1,.3,1]}} viewport={{once:true}}>
            <div className={s.dot} />
            <div className={s.body}>
              <div className={s.school}>{item.school}</div>
              <div className={s.prog}>{item.program}</div>
            </div>
            <div className={`${s.badge} ${item.active ? s.badgeActive : ''}`}>
              {item.active && <span className={s.pulse}/>}
              {t.training.statuses[item.status] || item.status}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
