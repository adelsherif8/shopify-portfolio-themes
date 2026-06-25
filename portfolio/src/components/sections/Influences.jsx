import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSection } from '../../context/SectionContext'
import { influences } from '../../data'
import useLang from '../../hooks/useLang'
import s from './Influences.module.css'

export default function Influences() {
  const ref = useRef(null)
  const { registerSection } = useSection()
  const [hovered, setHovered] = useState(null)
  const t = useLang()
  useEffect(() => registerSection('Influences', ref.current), [])

  return (
    <section ref={ref} id="influences" className={`${s.inf} section`} dir={t.dir}>
      <div className="s-label">{t.influences.label}</div>
      <motion.h2 className={s.heading}
        initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}}
        transition={{duration:.9}} viewport={{once:true}}>
        {t.influences.heading[0]}<em>{t.influences.heading[1]}</em>
      </motion.h2>
      <div className={s.grid}>
        {influences.map((film, i) => (
          <motion.div key={film.title}
            className={s.card}
            style={{ background: film.bg }}
            initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}}
            transition={{duration:.8,delay:i*.09,ease:[.16,1,.3,1]}} viewport={{once:true}}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}>
            <div className={s.cardFrame} />
            <div className={s.cardYear}>{film.year}</div>
            <h3 className={s.cardTitle}>{film.title}</h3>
            <div className={s.cardDir}>{t.influences.dir} {film.director}</div>
            <AnimatePresence>
              {hovered === i && (
                <motion.div className={s.quote}
                  initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
                  exit={{opacity:0,y:6}} transition={{duration:.3}}>
                  &ldquo;{film.quote}&rdquo;
                </motion.div>
              )}
            </AnimatePresence>
            <div className={s.cardGlow} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
