import useLang from '../../hooks/useLang'
import s from './Footer.module.css'

export default function Footer() {
  const t = useLang()
  return (
    <footer className={s.footer} dir={t.dir}>
      <span className={s.copy}>{t.footer.copy}</span>
      <span className={s.mark}>{t.footer.mark}</span>
    </footer>
  )
}
