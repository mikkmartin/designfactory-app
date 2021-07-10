import { Overlay } from './Overlay'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { useEditorData } from 'components/Editor/EditorContext'
import { useRouter } from 'next/router'
import { Text } from './Text'

export const Mockup = ({ editable = true, image = '/mockups/temp.png', blur = false }) => {
  const editorData = useEditorData()
  const { query } = useRouter()

  const [url, setUrl] = useState(image)
  const { color, text } = editorData?.data ? editorData.data : query
  const isWhite = color === 'white'

  const props = {
    darkAmplitude: '1.37',
    darkExponent: '5',
    lightAmplitude: '8',
    lightExponent: '54',
  }

  const width = 450
  const height = 600
  const size = { width, height }

  const tshirtUrl = '/mockups/' + (isWhite ? 'tshirt-white-front.png' : 'tshirt-black-front.png')

  const uploadPhoto = async e => {
    const file = e.target.files[0]
    setUrl(URL.createObjectURL(file))

    const filename = encodeURIComponent(file.name)
    const res = await fetch(`/api/files/upload?file=${filename}`)
    const { url, fields } = await res.json()
    const formData = new FormData()

    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      //@ts-ignore
      formData.append(key, value)
    })

    const upload = await fetch(url, {
      method: 'POST',
      body: formData,
    })

    if (upload.ok) {
      console.log('Uploaded successfully!')
    } else {
      console.error('Upload failed.')
    }
  }

  return (
    <Container>
      <svg
        {...size}
        style={blur ? { filter: 'blur(.1px)' } : {}}
        viewBox={`0 0 ${width} ${height}`}>
        <Overlay {...props} />
        <ColorFill color="#d65656" />
        <ShirtMask size={size} />
        <Contrast lightAmplitude={props.lightAmplitude} lightExponent={props.lightExponent} />
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
      {editable && <input type="file" accept="image/png, image/jpeg" onChange={uploadPhoto} />}
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
    opacity: 0;
  }
`

function DisplacementMap() {
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
        x="2%"
        y="0"
        width="96%"
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
        <feImage xlinkHref="/mockups/tshirt-black-front.png" {...size} />
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
        <rect x="0" y="0" width="100%" height="100%" fill="black" />
        <rect filter="url(#shirt-filter)" x="50" y="50" width="100%" height="100%" fill="black" />
      </mask>
    </>
  )
}

function ArtWork({ url, text, filter = '', mask = '' }) {
  const pos = { x: 157, y: 200 }
  const size = { width: 165, height: 220 }
  const coords = { ...size, ...pos }
  return (
    <>
      <pattern id="image" patternUnits="userSpaceOnUse" {...coords}>
        <image xlinkHref={url} x="0" y="0" {...size} preserveAspectRatio="xMidYMin meet" />
      </pattern>
      <g filter={filter} mask={mask} fill="url(#image)">
        <rect {...coords} fill="url(#image)" />
        {text && <Text>{text}</Text>}
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
