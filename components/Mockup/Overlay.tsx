import { Distplacement } from './Displacement'

export const Overlay = ({ darkAmplitude, darkExponent, lightAmplitude, lightExponent }) => {
  const fabricDistortion = 25
  const gravityDistortion = 30
  return (
    <filter id="overlay" colorInterpolationFilters="sRGB">
      <Distplacement fabricDistortion={fabricDistortion} gravityDistortion={gravityDistortion} />
      <feComponentTransfer in="IMAGE" result="DARKENED">
        <feFuncR
          type="gamma"
          amplitude={darkAmplitude}
          exponent={darkExponent}
          offset="0"></feFuncR>
        <feFuncG
          type="gamma"
          amplitude={darkAmplitude}
          exponent={darkExponent}
          offset="0"></feFuncG>
        <feFuncB
          type="gamma"
          amplitude={darkAmplitude}
          exponent={darkExponent}
          offset="0"></feFuncB>
      </feComponentTransfer>

      <feBlend mode="multiply" in="DISTORTED" in2="DARKENED" result="PREFINAL" />

      <feComponentTransfer in="IMAGE" result="LIGHTENED">
        <feFuncR
          type="gamma"
          amplitude={lightAmplitude}
          exponent={lightExponent}
          offset="0"></feFuncR>
        <feFuncG
          type="gamma"
          amplitude={lightAmplitude}
          exponent={lightExponent}
          offset="0"></feFuncG>
        <feFuncB
          type="gamma"
          amplitude={lightAmplitude}
          exponent={lightExponent}
          offset="0"></feFuncB>
      </feComponentTransfer>

      <feBlend mode="screen" in="PREFINAL" in2="LIGHTENED" />
    </filter>
  )
}
