import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSection } from '../../context/SectionContext'
import { testimonials } from '../../data'
import useLang from '../../hooks/useLang'
import s from './Testimonials.module.css'

export default function Testimonials() {
  const ref = useRef(null)
  const [idx, setIdx] = useState(0)
  const { registerSection } = useSection()
  const t = useLang()
  useEffect(() => registerSection('Testimonials', ref.current), [])
  useEffect(() => {
    const timer = setInterval(() => setIdx(i => (i + 1) % testimonials.length), 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section ref={ref} id="testimonials" className={s.wrap} dir={t.dir}>
      <div className={s.inner}>
        <div className={s.label}>{t.testimonials.label}</div>
        <div className={s.screen}>
          <div className={s.scanlines} />
          <AnimatePresence mode="wait">
            <motion.div key={idx} className={s.subtitle}
              initial={{opacity:0,y:12}} animate={{opacity:1,y:0}}
              exit={{opacity:0,y:-8}} transition={{duration:.55}}>
              <p className={s.text}>&ldquo;{testimonials[idx].text}&rdquo;</p>
              <div className={s.attribution}>
                <span className={s.name}>{testimonials[idx].name}</span>
                <span className={s.role}>{testimonials[idx].role}</span>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className={s.dots}>
            {testimonials.map((_,i) => (
              <button key={i} className={`${s.dot} ${i===idx?s.dotActive:''}`}
                onClick={() => setIdx(i)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
