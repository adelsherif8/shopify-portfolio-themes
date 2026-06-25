import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme]           = useState('dark')   // 'dark' | 'day' | 'dc'
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [arabicMode, setArabicMode] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleDC     = () => setTheme(t => t === 'dc'  ? 'dark' : 'dc')
  const toggleDay    = () => setTheme(t => t === 'day' ? 'dark' : 'day')
  const toggleArabic = () => setArabicMode(v => !v)

  return (
    <ThemeContext.Provider value={{ theme, toggleDC, toggleDay, soundEnabled, setSoundEnabled, arabicMode, toggleArabic }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
