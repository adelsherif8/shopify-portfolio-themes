import useLang from '../../hooks/useLang'
import s from './Ticker.module.css'

export default function Ticker() {
  const t = useLang()
  const doubled = [...t.ticker, ...t.ticker]
  return (
    <div className={s.wrap} dir={t.dir}>
      <div className={s.track}>
        {doubled.map((item, i) => (
          <span key={i} className={s.item}>{item}<i className="fa-solid fa-diamond" /></span>
        ))}
      </div>
    </div>
  )
}
