import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useSection } from '../../context/SectionContext'
import { press } from '../../data'
import useLang from '../../hooks/useLang'
import s from './Press.module.css'

export default function Press() {
  const ref = useRef(null)
  const { registerSection } = useSection()
  const t = useLang()
  useEffect(() => registerSection('Press', ref.current), [])

  return (
    <section ref={ref} id="press" className={`${s.wrap} section`} dir={t.dir}>
      <div className="s-label">{t.press.label}</div>
      <motion.h2 className={s.heading}
        initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}}
        transition={{duration:.9}} viewport={{once:true}}>
        {t.press.heading[0]}<br /><em>{t.press.heading[1]}</em>
      </motion.h2>

      <div className={s.list}>
        {press.map((item, i) => (
          <motion.div key={i}
            className={`${s.item} ${item.placeholder ? s.itemPlaceholder : ''}`}
            initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}}
            transition={{duration:.7,delay:i*.1,ease:[.16,1,.3,1]}} viewport={{once:true}}>
            <div className={s.itemLeft}>
              <div className={s.iconWrap}>
                <i className={`fa-solid ${item.icon}`} />
              </div>
            </div>
            <div className={s.itemRight}>
              <div className={s.itemMeta}>
                <span className={s.itemType}>{t.press.types[item.type] || item.type}</span>
                {item.year !== '—' && <span className={s.itemYear}>{item.year}</span>}
              </div>
              <div className={s.itemVenue}>{item.venue}</div>
              <div className={s.itemProject}>{item.project}</div>
              {item.note && <p className={s.itemNote}>{item.note}</p>}
            </div>
            <div className={s.itemLine} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
