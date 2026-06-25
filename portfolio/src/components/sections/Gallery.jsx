import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useSection } from '../../context/SectionContext'
import { gallery } from '../../data'
import PlaceholderImg from '../ui/PlaceholderImg'
import useLang from '../../hooks/useLang'
import s from './Gallery.module.css'

export default function Gallery() {
  const ref = useRef(null)
  const { registerSection } = useSection()
  const t = useLang()
  useEffect(() => registerSection('Gallery', ref.current), [])

  return (
    <section ref={ref} id="gallery" className={`${s.gallery} section`} dir={t.dir}>
      <div className="s-label">{t.gallery.label}</div>
      <motion.h2 className={s.heading}
        initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}}
        transition={{duration:.9}} viewport={{once:true}}>
        {t.gallery.heading[0]}<em>{t.gallery.heading[1]}</em>
      </motion.h2>
      <div className={s.grid}>
        {gallery.map((g, i) => (
          <motion.div key={i} className={`${s.item} gallery-el`}
            initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}}
            transition={{duration:.8,delay:i*.07,ease:[.16,1,.3,1]}} viewport={{once:true}}>
            <PlaceholderImg className={s.img} icon={g.icon} label={g.title} sublabel={g.tag} />
            <div className={s.overlay} />
            <div className={s.frame} />
            <div className={s.caption}>
              <div className={s.captionTitle}>{g.title}</div>
              <div className={s.captionTag}>{g.tag}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
