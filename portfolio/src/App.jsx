import { useState, useEffect } from 'react'
import Lenis from 'lenis'

// Context
import { ThemeProvider }   from './context/ThemeContext'
import { SectionProvider, useSection } from './context/SectionContext'

// UI
import Cursor         from './components/ui/Cursor'
import Grain          from './components/ui/Grain'
import ProgressBar    from './components/ui/ProgressBar'
import Letterbox      from './components/ui/Letterbox'
import SceneCounter   from './components/ui/SceneCounter'
import Controls       from './components/ui/Controls'
import PageTransition from './components/ui/PageTransition'

// Layout
import Nav       from './components/layout/Nav'
import Filmstrip from './components/layout/Filmstrip'
import Ticker    from './components/layout/Ticker'
import Footer    from './components/layout/Footer'

// Sections
import Preloader    from './components/sections/Preloader'
import Hero         from './components/sections/Hero'
import About        from './components/sections/About'
import Reel         from './components/sections/Reel'
import Films        from './components/sections/Films'
import Process      from './components/sections/Process'
import Gallery      from './components/sections/Gallery'
import Influences   from './components/sections/Influences'
import Testimonials from './components/sections/Testimonials'
import Craft        from './components/sections/Craft'
import Timeline     from './components/sections/Timeline'
import Training     from './components/sections/Training'
import Breakdown    from './components/sections/Breakdown'
import Press        from './components/sections/Press'
import NextProject  from './components/sections/NextProject'
import Contact      from './components/sections/Contact'

function TitleSync() {
  const { currentName } = useSection()
  useEffect(() => {
    document.title = currentName === 'Hero'
      ? 'Omar Emad El Din — Filmmaker'
      : `Omar — ${currentName}`
  }, [currentName])
  return null
}

export default function App() {
  const [ready, setReady] = useState(false)

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  return (
    <ThemeProvider>
      <SectionProvider>
        <TitleSync />

        {/* Global overlays */}
        <Cursor />
        <Grain />
        <ProgressBar />
        <Letterbox />
        <SceneCounter />
        <Controls />
        <PageTransition />

        {/* Preloader */}
        {!ready && <Preloader onDone={() => setReady(true)} />}

        {/* Site */}
        <Nav />
        <main>
          <Hero ready={ready} />
          <Filmstrip />
          <Ticker />
          <About />
          <Reel />
          <Films />
          <Process />
          <Filmstrip />
          <Gallery />
          <Influences />
          <Testimonials />
          <Craft />
          <Filmstrip />
          <Timeline />
          <Training />
          <Breakdown />
          <Press />
          <NextProject />
          <Contact />
        </main>
        <Filmstrip />
        <Footer />
      </SectionProvider>
    </ThemeProvider>
  )
}
