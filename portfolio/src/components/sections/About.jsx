import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useSection } from '../../context/SectionContext'
import useLang from '../../hooks/useLang'
import PlaceholderImg from '../ui/PlaceholderImg'
import s from './About.module.css'

function CountUp({ target, suffix = '' }) {
  const [n, setN] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView || !target) return
    let cur = 0; const step = Math.ceil(target / 30)
    const iv = setInterval(() => { cur = Math.min(cur + step, target); setN(cur); if (cur >= target) clearInterval(iv) }, 40)
    return () => clearInterval(iv)
  }, [inView, target])
  return <span ref={ref}>{target ? n + suffix : '∞'}</span>
}

const stats = [
  { target: 3, suffix: '+' },
  { target: 3, suffix: ''  },
  { target: 1, suffix: ''  },
  { target: 0, suffix: ''  },
]

const enBio = [
  <>A filmmaking graduate from the <strong>British University in Egypt</strong>, Omar Emad El Din has spent years developing a voice rooted in authentic human experience — stories drawn from culture, memory, and the quiet tensions of everyday life.</>,
  <>From writing the graduation film <em>Qahwet El Mayteen</em> to directing brand campaigns and recording on documentary sets, Omar works at every layer of the filmmaking process with precision and deep passion.</>,
]

const arBio = [
  <>خريج <strong>الجامعة البريطانية في مصر</strong>، تخصص الإعلام وصناعة الأفلام. عمر عماد الدين مخرج وكاتب سيناريو يبني صوته على التجربة الإنسانية الحقيقية — قصص مستمدة من الثقافة، والذاكرة، وتوترات الحياة اليومية الهادئة.</>,
  <>من كتابة فيلم تخرجه <em>قهوة الميتين</em> إلى إخراج الحملات الإبداعية والتسجيل في موقع التصوير الوثائقي — يعمل عمر في كل طبقات العملية السينمائية بدقة وشغف عميق.</>,
]

export default function About() {
  const ref = useRef(null)
  const { registerSection } = useSection()
  const t = useLang()
  useEffect(() => registerSection('About', ref.current), [])

  const isAr = t.dir === 'rtl'
  const bio  = isAr ? arBio : enBio

  return (
    <section ref={ref} id="about" className={`${s.about} section`} dir={t.dir}>
      <div className="s-label">01 — {t.nav.about}</div>
      <div className={s.grid}>
        <motion.div className={s.imgWrap}
          initial={{opacity:0,x:-40}} whileInView={{opacity:1,x:0}}
          transition={{duration:1,ease:[.16,1,.3,1]}} viewport={{once:true}}>
          <PlaceholderImg className={s.img} icon="fa-camera" label="Omar Emad El Din" sublabel={t.about.imgTag} />
          <div className={s.imgFrame} />
          <span className={s.imgTag}>{t.about.imgTag}</span>
        </motion.div>

        <motion.div
          initial={{opacity:0,x:40}} whileInView={{opacity:1,x:0}}
          transition={{duration:1,delay:.15,ease:[.16,1,.3,1]}} viewport={{once:true}}>

          <AnimatePresence mode="wait">
            <motion.h2 key={t.dir} className={s.heading}
              initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}}
              transition={{duration:.45}}>
              {t.about.heading[0]}<br /><em>{t.about.heading[1]}</em>
            </motion.h2>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div key={t.dir + '-bio'}
              initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              transition={{duration:.4}}>
              {bio.map((p, i) => <p key={i} className={s.body}>{p}</p>)}
            </motion.div>
          </AnimatePresence>

          <div className={s.stats}>
            {stats.map((st, i) => (
              <div key={i} className={s.stat}>
                <div className={s.statN}>
                  <CountUp target={st.target} suffix={st.suffix} />
                </div>
                <div className={s.statD}>{t.about.stats[i]}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
