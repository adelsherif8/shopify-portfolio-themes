import { useEffect } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { useSound } from '../../hooks/useSound'
import s from './Controls.module.css'

export default function Controls() {
  const { theme, toggleDC, toggleDay, soundEnabled, setSoundEnabled, arabicMode, toggleArabic } = useTheme()
  const { startProjector, stopProjector, playClick } = useSound()

  const handleSound = () => {
    playClick()
    if (!soundEnabled) { startProjector(); setSoundEnabled(true) }
    else                { stopProjector();  setSoundEnabled(false) }
  }
  const handleDC     = () => { playClick(); toggleDC() }
  const handleDay    = () => { playClick(); toggleDay() }
  const handleArabic = () => { playClick(); toggleArabic() }

  return (
    <div className={s.panel}>
      <button className={`${s.btn} ${theme === 'dc' ? s.active : ''}`} onClick={handleDC} title="Director's Cut">
        <i className={`fa-solid fa-clapperboard ${s.icon}`} />
        <span className={s.lbl}>DC</span>
      </button>
      <button className={`${s.btn} ${soundEnabled ? s.active : ''}`} onClick={handleSound} title="Projector Sound">
        <i className={`fa-solid ${soundEnabled ? 'fa-volume-high' : 'fa-volume-xmark'} ${s.icon}`} />
        <span className={s.lbl}>SFX</span>
      </button>
      <button className={`${s.btn} ${theme === 'day' ? s.active : ''}`} onClick={handleDay} title="Day / Night">
        <i className={`fa-solid ${theme === 'day' ? 'fa-moon' : 'fa-sun'} ${s.icon}`} />
        <span className={s.lbl}>{theme === 'day' ? 'NIGHT' : 'DAY'}</span>
      </button>
      <button className={`${s.btn} ${arabicMode ? s.active : ''}`} onClick={handleArabic} title="Arabic / English">
        <i className={`fa-solid fa-language ${s.icon}`} />
        <span className={s.lbl}>{arabicMode ? 'EN' : 'AR'}</span>
      </button>
      <a href="../cv.html" target="_blank" className={s.btn} title="Download CV">
        <i className={`fa-solid fa-file-lines ${s.icon}`} />
        <span className={s.lbl}>CV</span>
      </a>
    </div>
  )
}
