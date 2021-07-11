export const Overlay = ({ darkAmplitude, darkExponent, lightAmplitude, lightExponent }) => {
  return (
    <filter id="overlay" colorInterpolationFilters="sRGB">
      <DisplacementMap />
    </filter>
  )
}

const DisplacementMap = () => {
  return (
    <>
      <feImage
        xlinkHref="/mockups/tshirt-displacement-front.jpg"
        x="0"
        y="0"
        width="100%"
        height="100%"
        result="BLEED_MAP"
      />
      <feImage xlinkHref="/mockups/tshirt-white-front.png" x="0" y="0" width="100%" height="100%" />
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
        result="BLED2"
      />
      <feGaussianBlur
        stdDeviation="1 1"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        in="BLED2"
        edgeMode="none"
        result="BLUR"
      />
      <feComposite
        in="BLED2"
        in2="BLUR"
        operator="atop"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        result="DISTORTED"
      />
    </>
  )
}
