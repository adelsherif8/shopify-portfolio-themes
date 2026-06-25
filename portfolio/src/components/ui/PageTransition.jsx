import { useEffect, useRef } from 'react'
import s from './PageTransition.module.css'

export default function PageTransition() {
  const ref = useRef(null)

  useEffect(() => {
    window.__filmTransition = (cb) => {
      const el = ref.current
      if (!el) { cb(); return }
      el.style.transition = 'transform .45s cubic-bezier(.76,0,.24,1)'
      el.style.transform = 'translateX(0%)'
      setTimeout(() => {
        cb()
        setTimeout(() => {
          el.style.transform = 'translateX(100%)'
        }, 100)
      }, 450)
    }
  }, [])

  return <div ref={ref} className={s.overlay} />
}
