import { Overlay } from './Overlay'
import styled from 'styled-components'
import { useState, useEffect } from 'react'

export const Mockup = ({ editable = true, image = '/mockups/temp.png', blur = false }) => {
  const [file, setFile] = useState<File>()
  const [url, setUrl] = useState(image)

  useEffect(() => {
    if (!file) return
    const url = URL.createObjectURL(file)
    setUrl(url)
    const data = new FormData()
    data.append('file', file)
    fetch('/api/files/upload', {
      method: 'POST',
      body: data,
    }).catch(error => {
      console.error(error)
    })
  }, [file])

  const width = 450
  const height = 600
  const size = { width, height }

  const darkAmplitude = '1.3'
  const darkExponent = '2.6'
  const lightAmplitude = '2.1'
  const lightExponent = '26.8'

  const tshirtUrl = '/mockups/tshirt.png'
  const text = ''

  return (
    <Container>
      <svg
        {...size}
        style={blur ? { filter: 'blur(.1px)' } : {}}
        viewBox={`0 0 ${width} ${height}`}>
        <Overlay
          darkAmplitude={darkAmplitude}
          darkExponent={darkExponent}
          lightAmplitude={lightAmplitude}
          lightExponent={lightExponent}
        />
        <ColorFill color="#d65656" />
        <ShirtMask size={size} />
        <Contrast lightAmplitude={lightAmplitude} lightExponent={lightExponent} />
        <ArtWorkMask>
          <ArtWork url={url} text={text} />
        </ArtWorkMask>

        <image href={tshirtUrl} width={width} height={height} />
        <image
          mask="url(#shirt-mask)"
          filter="url(#color-fill)"
          href={tshirtUrl}
          width={width}
          height={height}
          style={{ mixBlendMode: 'multiply' }}
        />
        <image
          mask="url(#shirt-mask)"
          filter="url(#contrast)"
          href={tshirtUrl}
          width={width}
          height={height}
          style={{ mixBlendMode: 'screen' }}
        />
        <g mask="url(#artwork-mask)">
          <ArtWork filter="url(#overlay)" url={url} text={text} />
        </g>
      </svg>
      {editable && (
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={ev => setFile(ev.target.files[0])}
        />
      )}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  input {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    background: none;
  }
`

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
        x="5%"
        y="0"
        width="90%"
        height="100%"
        floodColor={color}
        floodOpacity="1"
      />
    </filter>
  )
}

function ShirtMask(size) {
  return (
    <>
      <filter id="shirt-filter">
        <feImage xlinkHref="/tshirt.png" {...size} />
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
  const width = 165
  const height = 220
  return (
    <>
      <pattern
        id="image"
        patternUnits="userSpaceOnUse"
        width={width}
        height={height}
        x="148"
        y="170">
        <image
          xlinkHref={url}
          x="0"
          y="0"
          width={width}
          height={height}
          preserveAspectRatio="xMidYMin meet"
        />
      </pattern>
      <g filter={filter} mask={mask} fill="url(#image)">
        <rect x="148" y="170" width={width} height={height} fill="url(#image)" />
        {/*
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
        */}
      </g>
    </>
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