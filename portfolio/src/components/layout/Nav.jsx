import { useEffect, useState } from 'react'
import { useSection } from '../../context/SectionContext'
import useLang from '../../hooks/useLang'
import s from './Nav.module.css'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const { currentName } = useSection()
  const t = useLang()

  const links = [
    { label: t.nav.about,     href: '#about'     },
    { label: t.nav.reel,      href: '#reel'      },
    { label: t.nav.films,     href: '#films'     },
    { label: t.nav.gallery,   href: '#gallery'   },
    { label: t.nav.craft,     href: '#craft'     },
    { label: t.nav.breakdown, href: '#breakdown' },
    { label: t.nav.press,     href: '#press'     },
    { label: t.nav.contact,   href: '#contact'   },
  ]

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const handleNav = (e, href) => {
    e.preventDefault()
    if (window.__filmTransition) {
      window.__filmTransition(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
      })
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className={`${s.nav} ${scrolled ? s.scrolled : ''}`} dir={t.dir}>
      <a href="#hero" className={s.logo} onClick={e => handleNav(e, '#hero')}>
        Omar <em>Emad El Din</em>
      </a>
      <ul className={s.links}>
        {links.map(l => (
          <li key={l.href}>
            <a href={l.href} onClick={e => handleNav(e, l.href)}>{l.label}</a>
          </li>
        ))}
      </ul>
      <div className={s.nowPlaying}>
        <span className={s.npDot} />
        <span className={s.npText}>{currentName}</span>
      </div>
    </nav>
  )
}
