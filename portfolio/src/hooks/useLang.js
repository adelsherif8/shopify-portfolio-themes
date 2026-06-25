import { useTheme } from '../context/ThemeContext'
import { en, ar } from '../translations'

export default function useLang() {
  const { arabicMode } = useTheme()
  return arabicMode ? ar : en
}
