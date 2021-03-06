import * as React from 'react'
import { styled } from 'linaria/react'
import debounce from 'debounce'
import * as Comlink from 'comlink'
import { withTheme } from '../../theme'

export const StyledBackgroundEffect = withTheme(styled.div`
  background: linear-gradient(
    to bottom,
    ${({ theme }) => theme.backgroundGradient.join(',')}
  );
  width: 100%;
  height: 100%;
  z-index: -1;
  position: fixed;
`)

export const StyledCanvas = styled.canvas`
  transition: opacity 2s ease, transform 4s ease;
  opacity: ${({ loaded }) => (loaded ? 1 : 0)};
  transform: ${({ loaded }) => (loaded ? 'none' : 'scale(1.3)')};
`

export const BackgroundEffectContext = React.createContext([false, () => {}])

export const BackgroundEffect = () => {
  const [paused] = React.useContext(BackgroundEffectContext)
  const [loaded, setLoaded] = React.useState(false)
  const canvasRef = React.useRef(null)

  const EffectRenderer = React.useMemo(
    () =>
      typeof window !== 'undefined' &&
      Comlink.wrap(new Worker('./EffectRenderer.js', { type: 'module' }))
  )

  const effectRef = React.useRef(null)

  React.useEffect(() => {
    const createEffect = async () => {
      const offscreen = canvasRef.current.transferControlToOffscreen()
      const effect = await new EffectRenderer(
        Comlink.transfer(offscreen, [offscreen])
      )

      effectRef.current = effect

      const calculate = async () => {
        const width = window.innerWidth
        const height = window.innerHeight

        await effect.calculate(width, height, devicePixelRatio)
        canvasRef.current.style.width = `${width}px`
        canvasRef.current.style.height = `${height}px`
      }

      await calculate()
      effect.draw().then(() => setLoaded(true))

      const callback = debounce(calculate, 200)
      window.addEventListener('resize', callback)

      return () => {
        effect.stop()
        window.removeEventListener('resize', callback)
      }
    }

    const dispose = createEffect()

    return () => dispose.then(dispose => dispose())
  }, [])

  React.useEffect(() => {
    if (!loaded) return
    effectRef.current.stop()

    if (paused) {
      effectRef.current.stop()
    } else {
      effectRef.current.start()
    }
  }, [effectRef.current, loaded, paused])

  return (
    <StyledBackgroundEffect>
      <StyledCanvas loaded={loaded} ref={canvasRef} />
    </StyledBackgroundEffect>
  )
}

export const BackgroundEffectProvider = ({ children }) => {
  const [paused, setPaused] = React.useState(false)

  return (
    <BackgroundEffectContext.Provider value={[paused, setPaused]}>
      {children}
    </BackgroundEffectContext.Provider>
  )
}
