export const Distplacement = ({ gravityDistortion, fabricDistortion }) => {
  return (
    <filter id="displacement" colorInterpolationFilters="sRGB">
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
        in2="MAP"
        scale={fabricDistortion}
        yChannelSelector="R"
        result="BLED"
      />
      <feDisplacementMap
        colorInterpolationFilters="sRGB"
        in="BLED"
        in2="BLEED_MAP"
        scale={gravityDistortion}
        xChannelSelector="R"
        yChannelSelector="R"
        result="BLED2"
      />
      
      <feGaussianBlur
        stdDeviation="0.5"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        in="BLED2"
        edgeMode="none"
        result="BLUR"
      />
      <feColorMatrix
        type="matrix"
        values="1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 3 -1.5"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        in="blur"
        result="CMATRIX"
      />
      <feComposite
        in="BLED2"
        in2="CMATRIX"
        operator="atop"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        result="DISTORTED"
      />
    </filter>
  )
}
