import { createContext, useContext, useState, useRef, useCallback } from 'react'

const SectionContext = createContext()

export const SECTIONS = [
  'Hero','About','Reel','Films','Process',
  'Gallery','Influences','Testimonials','Craft',
  'Timeline','Training','Breakdown','Press','Next Project','Contact',
]

export function SectionProvider({ children }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const observers = useRef({})

  const registerSection = useCallback((name, el) => {
    if (!el) return
    const idx = SECTIONS.indexOf(name)
    if (idx === -1) return

    if (observers.current[name]) observers.current[name].disconnect()

    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setCurrentIndex(idx) },
      { threshold: 0.35 }
    )
    obs.observe(el)
    observers.current[name] = obs
  }, [])

  return (
    <SectionContext.Provider value={{ currentIndex, currentName: SECTIONS[currentIndex], registerSection, total: SECTIONS.length }}>
      {children}
    </SectionContext.Provider>
  )
}

export const useSection = () => useContext(SectionContext)
