import { Overlay } from './Overlay'

export const Mockup = () => {
  const darkAmplitude = '1.3'
  const darkExponent = '3.6'
  const lightAmplitude = '2.1'
  const lightExponent = '24.8'

  return (
    <svg width="500" height="500" viewBox="0 0 500 500">
      <Overlay
        darkAmplitude={darkAmplitude}
        darkExponent={darkExponent}
        lightAmplitude={lightAmplitude}
        lightExponent={lightExponent}
      />
      <image href="/mockups/tshirt.png" height="500" width="500" />
    </svg>
  )
}
