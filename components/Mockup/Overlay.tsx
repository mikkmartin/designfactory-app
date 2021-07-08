export const Overlay = ({ darkAmplitude, darkExponent, lightAmplitude, lightExponent }) => {
  return (
    <filter id="overlay" colorInterpolationFilters="sRGB">
      <DisplacementMap />
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

const DisplacementMap = () => {
  return (
    <>
      <feImage
        xlinkHref="/mockups/tshirt-displacement.png"
        x="0"
        y="0"
        width="100%"
        height="100%"
        result="BLEED_MAP"
      />
      <feImage xlinkHref="/mockups/tshirt.png" x="0" y="0" width="100%" height="100%" />
      <feColorMatrix type="saturate" values="0" result="IMAGE" />
      <feGaussianBlur in="IMAGE" stdDeviation="2" result="MAP" />
      <feDisplacementMap
        colorInterpolationFilters="sRGB"
        in="SourceGraphic"
        in2="BLEED_MAP"
        scale={10}
        xChannelSelector="R"
        yChannelSelector="R"
        result="BLED"
      />
      <feDisplacementMap
        colorInterpolationFilters="sRGB"
        in="BLED"
        in2="MAP"
        scale={20}
        xChannelSelector="R"
        yChannelSelector="R"
        result="DISTORTED"
      />
    </>
  )
}
