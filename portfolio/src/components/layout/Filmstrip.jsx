import s from './Filmstrip.module.css'

export default function Filmstrip() {
  return (
    <div className={s.strip}>
      <div className={s.perf}>{[0,1,2].map(i=><div key={i} className={s.hole}/>)}</div>
      {Array.from({length:20}).map((_,i)=><div key={i} className={s.frame}/>)}
      <div className={s.perf}>{[0,1,2].map(i=><div key={i} className={s.hole}/>)}</div>
    </div>
  )
}
