import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useSection } from '../../context/SectionContext'
import PlaceholderImg from '../ui/PlaceholderImg'
import useLang from '../../hooks/useLang'
import s from './Reel.module.css'

// ── Replace with actual YouTube video ID ──
const YOUTUBE_ID = 'YOUR_VIDEO_ID'

export default function Reel() {
  const ref     = useRef(null)
  const cvRef   = useRef(null)
  const [open, setOpen] = useState(false)
  const { registerSection } = useSection()
  const t = useLang()
  useEffect(() => registerSection('Reel', ref.current), [])

  // Bokeh canvas
  useEffect(() => {
    const cv = cvRef.current; if (!cv) return
    const ctx = cv.getContext('2d')
    let W, H, raf
    const resize = () => { W = cv.width = cv.offsetWidth; H = cv.height = cv.offsetHeight }
    resize(); window.addEventListener('resize', resize)
    const bk = Array.from({length:16}, () => ({
      x:Math.random()*2000, y:Math.random()*1000, r:25+Math.random()*80,
      vx:(Math.random()-.5)*.2, vy:(Math.random()-.5)*.15,
      o:.04+Math.random()*.06, phase:Math.random()*Math.PI*2
    }))
    function draw() {
      ctx.clearRect(0,0,W,H)
      bk.forEach(b => {
        b.x+=b.vx; b.y+=b.vy; b.phase+=.007
        const a = b.o*(.6+.4*Math.sin(b.phase))
        const gr = ctx.createRadialGradient(b.x/2000*W,b.y/1000*H,0,b.x/2000*W,b.y/1000*H,b.r)
        gr.addColorStop(0,`rgba(184,151,58,${a})`); gr.addColorStop(1,'rgba(184,151,58,0)')
        ctx.fillStyle=gr; ctx.beginPath(); ctx.arc(b.x/2000*W,b.y/1000*H,b.r,0,Math.PI*2); ctx.fill()
        if(b.x<-b.r*2000/W) b.x=2000+b.r; if(b.x>2000+b.r) b.x=-b.r
        if(b.y<-b.r*1000/H) b.y=1000+b.r; if(b.y>1000+b.r) b.y=-b.r
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  const handlePlay = () => {
    if (YOUTUBE_ID === 'YOUR_VIDEO_ID') { alert('Add your YouTube video ID to the YOUTUBE_ID constant in Reel.jsx'); return }
    setOpen(true)
  }

  return (
    <section ref={ref} id="reel" className={s.reel} dir={t.dir}>
      <canvas ref={cvRef} className={s.canvas} />
      <div className={s.lb} />
      <div className={s.lbBot} />
      <div className={s.center}>
        <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} transition={{duration:.9}} viewport={{once:true}}>
          <div className={s.eyebrow}>{t.reel.eyebrow}</div>
          <h2 className={s.title}>{t.reel.title[0]}<em>{t.reel.title[1]}</em></h2>
          <div className={s.playerWrap}>
            <div className={`${s.thumb} reel-play-el`} onClick={handlePlay}>
              <PlaceholderImg className={s.thumbImg} icon="fa-play" label="Showreel" sublabel="Add YouTube ID" />
              <div className={s.overlay} />
              <div className={s.scanlines} />
              <div className={s.play}>
                <motion.div className={s.playRing} whileHover={{scale:1.1}} transition={{type:'spring',stiffness:300}}>
                  <svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21" fill="var(--gold2)"/></svg>
                </motion.div>
                <span className={s.playLbl}>{t.reel.play}</span>
              </div>
              <span className={s.dur}>{t.reel.dur}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {open && (
        <motion.div className={s.modal} initial={{opacity:0}} animate={{opacity:1}}
          onClick={() => setOpen(false)}>
          <div onClick={e => e.stopPropagation()}>
            <iframe
              src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0`}
              className={s.iframe} allowFullScreen allow="autoplay" title="Showreel"
            />
          </div>
          <button className={s.close} onClick={() => setOpen(false)}>{t.reel.close}</button>
        </motion.div>
      )}
    </section>
  )
}
