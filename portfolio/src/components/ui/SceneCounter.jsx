import { useSection, SECTIONS } from '../../context/SectionContext'
import s from './SceneCounter.module.css'

export default function SceneCounter() {
  const { currentIndex, total } = useSection()
  const num = String(currentIndex + 1).padStart(2, '0')
  const tot = String(total).padStart(2, '0')
  return (
    <div className={s.wrap}>
      <span className={s.label}>SCENE</span>
      <span className={s.num}>{num}</span>
      <span className={s.sep}>/</span>
      <span className={s.tot}>{tot}</span>
      <div className={s.bar}>
        <div className={s.fill} style={{ height: `${((currentIndex + 1) / total) * 100}%` }} />
      </div>
    </div>
  )
}
