import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useSection } from '../../context/SectionContext'
import useLang from '../../hooks/useLang'
import s from './Contact.module.css'

export default function Contact() {
  const ref   = useRef(null)
  const cvRef = useRef(null)
  const magRef= useRef(null)
  const { registerSection } = useSection()
  const t = useLang()
  useEffect(() => registerSection('Contact', ref.current), [])

  // Ripple canvas
  useEffect(() => {
    const cv = cvRef.current; if (!cv) return
    const ctx = cv.getContext('2d')
    let W, H, rings = [], raf
    const resize = () => { W = cv.width = cv.offsetWidth; H = cv.height = cv.offsetHeight }
    resize(); window.addEventListener('resize', resize)
    const spawn = () => rings.push({ r:0, o:.2, spd:.45 })
    const tid = setInterval(spawn, 2800); spawn()
    function draw() {
      ctx.clearRect(0,0,W,H)
      rings = rings.filter(r => r.o > 0)
      rings.forEach(r => {
        r.r+=r.spd; r.o-=.0007
        ctx.beginPath(); ctx.arc(W/2,H/2,r.r,0,Math.PI*2)
        ctx.strokeStyle=`rgba(184,151,58,${Math.max(0,r.o)})`; ctx.lineWidth=1; ctx.stroke()
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); clearInterval(tid); window.removeEventListener('resize', resize) }
  }, [])

  // Magnetic
  const onMagMove = e => {
    const el = magRef.current; if (!el) return
    const r  = el.getBoundingClientRect()
    el.style.transform = `translate(${(e.clientX-r.left-r.width/2)*.2}px,${(e.clientY-r.top-r.height/2)*.2}px)`
    el.style.transition = 'transform .1s'
  }
  const onMagLeave = () => {
    const el = magRef.current; if (!el) return
    el.style.transform = 'translate(0,0)'
    el.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1)'
  }

  return (
    <section ref={ref} id="contact" className={s.contact} dir={t.dir}>
      <canvas ref={cvRef} className={s.canvas} />
      <div className="s-label" style={{justifyContent:'center',position:'relative',zIndex:1}}>{t.contact.label}</div>

      <motion.div className={s.availBadge}
        initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:.7}} viewport={{once:true}}>
        <span className={s.availDot} />
        {t.contact.badge}
      </motion.div>

      <motion.h2 className={s.heading}
        initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}}
        transition={{duration:.9}} viewport={{once:true}}>
        {t.contact.heading[0]}<br /><em>{t.contact.heading[1]}</em> {t.contact.heading[2]}
      </motion.h2>

      <motion.p className={s.sub}
        initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
        transition={{duration:.8,delay:.1}} viewport={{once:true}}>
        {t.contact.sub}
      </motion.p>

      <motion.a
        ref={magRef}
        href="mailto:omar16emad@gmail.com"
        className={`${s.email} hoverable`}
        initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
        transition={{duration:.8,delay:.2}} viewport={{once:true}}
        onMouseMove={onMagMove} onMouseLeave={onMagLeave}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
        {t.contact.cta}
      </motion.a>

      <motion.div className={s.loc}
        initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:.7,delay:.3}} viewport={{once:true}}>
        {t.contact.loc} <em>{t.contact.locSep}</em> {t.contact.locSub}
      </motion.div>
    </section>
  )
}
