import { useRef, useCallback } from 'react'

export function useSound() {
  const ctxRef    = useRef(null)
  const projRef   = useRef(null)

  const getCtx = () => {
    if (!ctxRef.current)
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)()
    return ctxRef.current
  }

  const startProjector = useCallback(() => {
    const ctx = getCtx()

    // Low mechanical hum
    const osc = ctx.createOscillator()
    const g   = ctx.createGain()
    osc.type = 'sawtooth'; osc.frequency.value = 48
    g.gain.value = 0.018
    osc.connect(g); g.connect(ctx.destination)

    // White noise layer
    const buf  = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate)
    const data = buf.getChannelData(0)
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1
    const noise = ctx.createBufferSource()
    noise.buffer = buf; noise.loop = true
    const ng = ctx.createGain(); ng.gain.value = 0.006
    noise.connect(ng); ng.connect(ctx.destination)

    osc.start(); noise.start()
    projRef.current = { osc, g, noise, ng }
  }, [])

  const stopProjector = useCallback(() => {
    const p = projRef.current
    if (!p) return
    const ctx = getCtx()
    p.g.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3)
    p.ng.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3)
    setTimeout(() => { p.osc.stop(); p.noise.stop() }, 350)
    projRef.current = null
  }, [])

  const playClick = useCallback(() => {
    const ctx = getCtx()
    const osc = ctx.createOscillator()
    const g   = ctx.createGain()
    osc.type = 'square'; osc.frequency.value = 1200
    g.gain.setValueAtTime(0.04, ctx.currentTime)
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06)
    osc.connect(g); g.connect(ctx.destination)
    osc.start(); osc.stop(ctx.currentTime + 0.06)
  }, [])

  const playWhoosh = useCallback(() => {
    const ctx = getCtx()
    const buf  = ctx.createBuffer(1, ctx.sampleRate * 0.3, ctx.sampleRate)
    const data = buf.getChannelData(0)
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length)
    const src = ctx.createBufferSource()
    src.buffer = buf
    const g = ctx.createGain(); g.gain.value = 0.05
    src.connect(g); g.connect(ctx.destination)
    src.start()
  }, [])

  return { startProjector, stopProjector, playClick, playWhoosh }
}
