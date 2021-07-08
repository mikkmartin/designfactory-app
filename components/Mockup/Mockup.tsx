import { Overlay } from './Overlay'

export const Mockup = () => {
  const darkAmplitude = '1.3'
  const darkExponent = '2.6'
  const lightAmplitude = '2.1'
  const lightExponent = '26.8'

  const tshirtUrl = '/mockups/tshirt.png'
  const url = 'https://media.voog.com/0000/0044/8982/photos/IMG_0348_block.PNG'
  const text = ''

  return (
    <svg width="500" height="500" viewBox="0 0 500 500">
      <Overlay
        darkAmplitude={darkAmplitude}
        darkExponent={darkExponent}
        lightAmplitude={lightAmplitude}
        lightExponent={lightExponent}
      />
      <ColorFill color="#d65656" />
      <ShirtMask />
      <Contrast lightAmplitude={lightAmplitude} lightExponent={lightExponent} />
      <ArtWorkMask>
        <ArtWork url={url} text={text} />
      </ArtWorkMask>

      <image href={tshirtUrl} height="500" width="500" />
      <image
        mask="url(#shirt-mask)"
        filter="url(#color-fill)"
        href={tshirtUrl}
        height="500"
        width="500"
        style={{ mixBlendMode: 'multiply' }}
      />
      <image
        mask="url(#shirt-mask)"
        filter="url(#contrast)"
        href={tshirtUrl}
        height="500"
        width="500"
        style={{ mixBlendMode: 'screen' }}
      />
      <g mask="url(#artwork-mask)">
        <ArtWork filter="url(#overlay)" url={url} text={text} />
      </g>
    </svg>
  )
}

function DisplacementMap() {
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

function Contrast({ lightAmplitude, lightExponent }) {
  return (
    <filter id="contrast" colorInterpolationFilters="sRGB">
      <feComponentTransfer>
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
    </filter>
  )
}

function ColorFill({ color }) {
  return (
    <filter id="color-fill">
      <feFlood
        result="floodFill"
        x="0"
        y="0"
        width="100%"
        height="100%"
        floodColor={color}
        floodOpacity="1"
      />
    </filter>
  )
}

function ShirtMask() {
  return (
    <>
      <filter id="shirt-filter">
        <feImage xlinkHref="/tshirt.png" width="500" height="500" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0
                  0 0 0 0 0
                  0 0 0 0 0
                  0 0 0 1 0"
        />
        <feComponentTransfer>
          <feFuncA type="table" tableValues="1 0" />
        </feComponentTransfer>
      </filter>
      <mask id="shirt-mask">
        <rect x="0" y="0" width="100%" height="100%" fill="white" />
        <rect filter="url(#shirt-filter)" x="50" y="50" width="100%" height="100%" fill="black" />
      </mask>
    </>
  )
}

function ArtWork({ url, text = '...', filter = '', mask = '' }) {
  return (
    <g filter={filter} mask={mask}>
      <image x="160" y="145" href={url} height="200" width="200" />
      <text
        fill="red"
        x="260"
        y="230"
        textAnchor="middle"
        fontSize="80"
        letterSpacing="-4"
        fontWeight="bold">
        {text}
      </text>
    </g>
  )
}

function ArtWorkMask({ children }) {
  return (
    <mask id="artwork-mask">
      <filter id="temp" colorInterpolationFilters="sRGB">
        <DisplacementMap />
        <feComponentTransfer>
          <feFuncR type="table" tableValues="1 1 1 1" />
          <feFuncG type="table" tableValues="1 1 1 1" />
          <feFuncB type="table" tableValues="1 1 1 1" />
        </feComponentTransfer>
      </filter>
      <g filter="url(#temp)">{children}</g>
    </mask>
  )
}
