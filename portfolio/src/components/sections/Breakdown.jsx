import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSection } from '../../context/SectionContext'
import { breakdown } from '../../data'
import useLang from '../../hooks/useLang'
import s from './Breakdown.module.css'

const lineClass = { slug: s.slug, action: s.action, char: s.char, paren: s.paren, dialogue: s.dialogue }

export default function Breakdown() {
  const ref = useRef(null)
  const { registerSection } = useSection()
  const [active, setActive] = useState(null)
  const t = useLang()
  useEffect(() => registerSection('Breakdown', ref.current), [])

  return (
    <section ref={ref} id="breakdown" className={`${s.wrap} section`} dir={t.dir}>
      <div className="s-label">{t.breakdown.label}</div>
      <div className={s.header}>
        <motion.h2 className={s.heading}
          initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}}
          transition={{duration:.9}} viewport={{once:true}}>
          {breakdown.title} <em>{breakdown.arabic}</em>
        </motion.h2>
        <motion.p className={s.sub}
          initial={{opacity:0}} whileInView={{opacity:1}}
          transition={{duration:.8,delay:.1}} viewport={{once:true}}>
          {breakdown.subtitle}
        </motion.p>
      </div>

      <div className={s.body}>
        {/* Screenplay column — always LTR */}
        <motion.div className={s.script} dir="ltr"
          initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}}
          transition={{duration:.9,ease:[.16,1,.3,1]}} viewport={{once:true}}>
          <div className={s.scriptHeader}>
            <span className={s.scriptTitle}>{breakdown.title}</span>
            <span className={s.scriptMeta}>Written by Omar Emad El Din</span>
          </div>
          <div className={s.page}>
            {breakdown.excerpt.map((line, i) => {
              const isAnnotated = breakdown.annotations.some(a => a.anchor === line.text)
              const isActive    = active === line.text
              return (
                <div key={i}
                  className={`${lineClass[line.type] || s.action} ${isAnnotated ? s.annotated : ''} ${isActive ? s.highlighted : ''}`}
                  onClick={() => isAnnotated && setActive(v => v === line.text ? null : line.text)}>
                  {line.text}
                  {isAnnotated && <i className={`fa-solid fa-circle-dot ${s.pin}`} />}
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Annotations column */}
        <motion.div className={s.annotations}
          initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}}
          transition={{duration:.9,delay:.1,ease:[.16,1,.3,1]}} viewport={{once:true}}>
          <div className={s.annotTitle}>
            <i className="fa-solid fa-pen-nib" />
            {t.breakdown.writerNote}
          </div>
          {breakdown.annotations.map((a, i) => (
            <motion.div key={i} className={`${s.note} ${active === a.anchor ? s.noteActive : ''}`}
              onClick={() => setActive(v => v === a.anchor ? null : a.anchor)}
              whileHover={{x: 4}} transition={{duration:.2}}>
              <div className={s.noteNum}>0{i + 1}</div>
              <div>
                <div className={s.noteAnchor}>&ldquo;{a.anchor}&rdquo;</div>
                <AnimatePresence>
                  {active === a.anchor && (
                    <motion.p className={s.noteText}
                      initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}}
                      exit={{opacity:0,height:0}} transition={{duration:.35}}>
                      {a.note}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
          <p className={s.hint}>{t.breakdown.hint}</p>
        </motion.div>
      </div>
    </section>
  )
}
