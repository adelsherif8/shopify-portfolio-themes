import { useEffect, useRef } from 'react'
import s from './ProgressBar.module.css'

export default function ProgressBar() {
  const ref = useRef(null)
  useEffect(() => {
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight
      if (ref.current) ref.current.style.width = (window.scrollY / max * 100).toFixed(2) + '%'
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <div ref={ref} className={s.bar} />
}
