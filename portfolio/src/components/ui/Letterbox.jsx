import { useEffect, useRef } from 'react'
import s from './Letterbox.module.css'

export default function Letterbox() {
  const topRef = useRef(null)
  const botRef = useRef(null)
  const lastY  = useRef(0)
  const timer  = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      const vel = Math.abs(window.scrollY - lastY.current)
      lastY.current = window.scrollY
      const h = Math.min(70, 32 + vel * 1.8)
      topRef.current && (topRef.current.style.height = h + 'px')
      botRef.current && (botRef.current.style.height = h + 'px')
      clearTimeout(timer.current)
      timer.current = setTimeout(() => {
        topRef.current && (topRef.current.style.height = '32px')
        botRef.current && (botRef.current.style.height = '32px')
      }, 350)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div ref={topRef} className={s.top} />
      <div ref={botRef} className={s.bot} />
    </>
  )
}
