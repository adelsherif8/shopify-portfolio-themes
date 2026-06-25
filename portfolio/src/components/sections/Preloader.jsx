import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import s from './Preloader.module.css'

export default function Preloader({ onDone }) {
  const [phase, setPhase] = useState('idle') // idle → clap → flash → exit

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const t1 = setTimeout(() => setPhase('clap'),  1200)
    const t2 = setTimeout(() => setPhase('flash'), 1560)
    const t3 = setTimeout(() => setPhase('exit'),  2000)
    const t4 = setTimeout(() => { document.body.style.overflow = ''; onDone() }, 2800)
    return () => [t1,t2,t3,t4].forEach(clearTimeout)
  }, [])

  return (
    <AnimatePresence>
      {phase !== 'gone' && (
        <motion.div
          className={s.wrap}
          exit={{ opacity: 0 }}
          transition={{ duration: .5, ease: 'easeInOut' }}
          onAnimationComplete={() => phase === 'exit' && setPhase('gone')}
        >
          {/* Curtains opening */}
          <motion.div className={s.curtainL}
            animate={phase === 'exit' ? { scaleX: 0 } : { scaleX: 1 }}
            transition={{ duration: .85, ease: [.76,0,.24,1] }}
          />
          <motion.div className={s.curtainR}
            animate={phase === 'exit' ? { scaleX: 0 } : { scaleX: 1 }}
            transition={{ duration: .85, ease: [.76,0,.24,1] }}
          />

          {/* Flash frame */}
          <motion.div className={s.flash}
            animate={{ opacity: phase === 'flash' ? [0,1,0] : 0 }}
            transition={{ duration: .25, times:[0,.3,1] }}
          />

          {/* Clapper Board */}
          <div className={s.board}>
            <motion.div
              className={s.clapTop}
              animate={phase === 'clap' || phase === 'flash' ? { rotateX: [0, -28, 0] } : {}}
              transition={{ duration: .22, ease: 'easeIn' }}
            >
              <div className={s.stripes}/>
              <div className={s.clapInfo}>
                <span>TAKE: 01</span>
                <span>ROLL: A</span>
              </div>
            </motion.div>
            <div className={s.clapBody}>
              <div className={s.field}><label>Director</label><span>Omar Emad</span></div>
              <div className={s.field}><label>Scene</label><span>001</span></div>
              <div className={s.field}><label>Production</label><span>2024</span></div>
              <div className={s.field}><label>Camera</label><span>A-Roll</span></div>
            </div>
          </div>

          <motion.div
            className={s.action}
            animate={{ opacity: phase === 'flash' || phase === 'exit' ? 1 : 0, scale: phase === 'flash' || phase === 'exit' ? 1 : 0.8 }}
            transition={{ duration: .25 }}
          >
            ACTION
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
