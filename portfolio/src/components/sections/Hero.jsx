import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSection } from '../../context/SectionContext'
import useLang from '../../hooks/useLang'
import s from './Hero.module.css'

export default function Hero({ ready }) {
  const canvasRef   = useRef(null)
  const spotRef     = useRef(null)
  const sectionRef  = useRef(null)
  const { registerSection } = useSection()
  const [nameHover, setNameHover] = useState(false)
  const t = useLang()

  useEffect(() => { registerSection('Hero', sectionRef.current) }, [])

  // Canvas: light leaks + particles
  useEffect(() => {
    const cv  = canvasRef.current; if (!cv) return
    const ctx = cv.getContext('2d')
    let W, H, raf
    const resize = () => { W = cv.width = cv.offsetWidth; H = cv.height = cv.offsetHeight }
    resize(); window.addEventListener('resize', resize)

    const pts = Array.from({length:90}, () => ({
      x:Math.random()*1600, y:Math.random()*900,
      r:Math.random()+.15, vx:(Math.random()-.5)*.12, vy:(Math.random()-.5)*.08-.04,
      o:Math.random()*.28+.04, life:Math.random()
    }))
    const leaks = Array.from({length:4}, () => ({
      x:Math.random()*2000, y:Math.random()*1000,
      angle:.18+Math.random()*.28, len:260+Math.random()*320,
      w:45+Math.random()*75, speed:.3+Math.random()*.22,
      o:.03+Math.random()*.032, hue:Math.random()>.5?'184,120,30':'110,55,15'
    }))

    function draw() {
      ctx.clearRect(0,0,W,H)
      leaks.forEach(l => {
        ctx.save(); ctx.translate(l.x/1600*W, l.y/1000*H); ctx.rotate(l.angle)
        const gr = ctx.createLinearGradient(0,0,l.len,0)
        gr.addColorStop(0,`rgba(${l.hue},0)`); gr.addColorStop(.45,`rgba(${l.hue},${l.o})`); gr.addColorStop(1,`rgba(${l.hue},0)`)
        ctx.fillStyle=gr; ctx.fillRect(0,-l.w/2,l.len,l.w); ctx.restore()
        l.x += Math.cos(l.angle)*l.speed*1600/W; l.y += Math.sin(l.angle)*l.speed*1000/H
        if(l.x>1800||l.y>1100) { l.x=-200; l.y=Math.random()*1000 }
      })
      pts.forEach(p => {
        p.x+=p.vx; p.y+=p.vy; p.life+=.003
        const a = p.o*Math.sin(p.life*Math.PI)
        ctx.beginPath(); ctx.arc(p.x/1600*W, p.y/900*H, p.r, 0, Math.PI*2)
        ctx.fillStyle=`rgba(184,151,58,${Math.max(0,a)})`; ctx.fill()
        if(p.y<-5||p.life>1) { p.x=Math.random()*1600; p.y=900; p.life=0 }
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  // Spotlight
  const onMouseMove = e => {
    const r = sectionRef.current?.getBoundingClientRect()
    if (!r || !spotRef.current) return
    spotRef.current.style.setProperty('--sx', ((e.clientX-r.left)/r.width*100).toFixed(1)+'%')
    spotRef.current.style.setProperty('--sy', ((e.clientY-r.top)/r.height*100).toFixed(1)+'%')
  }

  // Parallax
  useEffect(() => {
    const nameEl = document.getElementById('hero-name-el')
    const onScroll = () => { if (nameEl) nameEl.style.transform = `translateY(${window.scrollY*.22}px)` }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section ref={sectionRef} id="hero" className={s.hero} onMouseMove={onMouseMove} dir={t.dir}>
      <canvas ref={canvasRef} className={s.canvas} />
      <div ref={spotRef} className={s.spotlight} />
      <div className={s.vline} />
      {['tl','tr','bl','br'].map(p => <div key={p} className={`${s.fc} ${s['fc_'+p]}`} />)}

      <div className={s.metaRight}>
        <div className={s.metaNum}>001</div>
        <span className={s.metaTag}>{t.hero.metaTag}</span>
      </div>

      <div className={s.content} id="hero-name-el">
        {ready && (
          <>
            <motion.div className={s.eyebrow}
              initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.2,duration:.6}}>
              <span className={s.eyebrowDot} />
              <AnimatePresence mode="wait">
                <motion.span key={t.hero.eyebrow} className={s.eyebrowText}
                  initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.4}}>
                  {t.hero.eyebrow.split('').map((c,i) => (
                    <motion.span key={i} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.3+i*.015,duration:.01}}>
                      {c}
                    </motion.span>
                  ))}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            <h1
              className={`${s.name} ${nameHover ? s.glitch : ''}`}
              onMouseEnter={() => setNameHover(true)}
              onMouseLeave={() => setNameHover(false)}
            >
              <div className={s.nameLine}>
                <motion.span initial={{y:'110%'}} animate={{y:0}} transition={{delay:.4,duration:1.1,ease:[.16,1,.3,1]}}>
                  Omar
                </motion.span>
              </div>
              <div className={`${s.nameLine} ${s.italic}`}>
                <motion.span initial={{y:'110%'}} animate={{y:0}} transition={{delay:.52,duration:1.1,ease:[.16,1,.3,1]}}>
                  Emad El Din
                </motion.span>
              </div>
            </h1>

            <AnimatePresence mode="wait">
              <motion.p key={t.hero.tagline} className={s.tagline}
                initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}
                transition={{delay:.3,duration:.7}}>
                {t.hero.tagline}
              </motion.p>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div key={t.dir} className={s.chips}
                initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{delay:.2,duration:.6}}>
                {t.hero.chips.map(c => (
                  <span key={c} className={`${s.chip} hoverable`}>{c}</span>
                ))}
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </div>

      <div className={s.scrollInd}>
        <div className={s.scrollTrack}><div className={s.scrollThumb}/></div>
        <span className={s.scrollLbl}>{t.hero.scroll}</span>
      </div>
    </section>
  )
}
