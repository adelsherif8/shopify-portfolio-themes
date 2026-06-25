import { useEffect, useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import s from './Grain.module.css'

export default function Grain() {
  const { theme } = useTheme()
  const [scrollRatio, setScrollRatio] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight
      setScrollRatio(max > 0 ? window.scrollY / max : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const base = theme === 'dc' ? 0.055 : 0.022
  const opacity = base + scrollRatio * 0.07

  return (
    <>
      <div className={s.grain} style={{ opacity }} />
      {theme === 'dc' && (
        <div className={s.dcOverlay}>
          <div className={s.dcVignette} />
          <div className={s.dcWatermark}>DIRECTOR&apos;S CUT</div>
          <div className={s.dcScanline} />
        </div>
      )}
    </>
  )
}
