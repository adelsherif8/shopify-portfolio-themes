import s from './PlaceholderImg.module.css'

export default function PlaceholderImg({ className = '', icon = 'fa-film', label = '', sublabel = '', style }) {
  return (
    <div className={`${s.placeholder} ${className}`} style={style}>
      <div className={s.inner}>
        <i className={`fa-solid ${icon} ${s.faIcon}`} />
        {label    && <span className={s.label}>{label}</span>}
        {sublabel && <span className={s.sub}>{sublabel}</span>}
      </div>
      <div className={s.grain} />
      {['tl','tr','bl','br'].map(p => <div key={p} className={`${s.corner} ${s['c_'+p]}`} />)}
    </div>
  )
}
