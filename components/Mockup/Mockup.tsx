import styled from 'styled-components'
import { useState } from 'react'
import { useEditorData } from 'components/Editor/EditorContext'
import { useRouter } from 'next/router'
import { Distplacement } from './Displacement'
import { Overlay } from './Overlay'
import { Text } from './Text'

export const Mockup = ({ editable = true, image = '/images/temp.jpeg' }) => {
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

  const fabricDistortion = 25
  const gravityDistortion = 30
  const distortion = { fabricDistortion, gravityDistortion }
  const offset = (fabricDistortion + gravityDistortion) / 4

  return (
    <Container>
      <svg {...size} viewBox={`0 0 ${width} ${height}`}>
        
        <filter id="contrast">
          <feImage
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            xlinkHref="/mockups/tshirt-white-front.png"
            preserveAspectRatio="xMidYMid meet"
            crossOrigin="anonymous"
            result="image"
          />
          <feColorMatrix type="saturate" values="0" in="image" result="colormatrix" />
          <feComponentTransfer in="colormatrix" result="componentTransfer1">
            <feFuncR type="gamma" amplitude="1.37" exponent="5" offset="0" />
            <feFuncG type="gamma" amplitude="1.37" exponent="5" offset="0" />
            <feFuncB type="gamma" amplitude="1.37" exponent="5" offset="0" />
            <feFuncA type="gamma" amplitude="1.37" exponent="5" offset="0" />
          </feComponentTransfer>
          <feBlend mode="multiply" in="SourceGraphic" in2="componentTransfer1" result="blend" />
        </filter>
        <image href="/mockups/tshirt-white-front.png" width="450" height="600" />
        <Distplacement {...distortion} />

        <g filter="url(#contrast)">
          <g filter="url(#displacement)">
            <g transform={`translate(${127 + offset} ${190 + offset})`}>
              <image xlinkHref={url} width="200" height="250" preserveAspectRatio="xMidYMin meet" />
            </g>
          </g>
          <g filter="url(#displacement)">
            <Text>{text}</Text>
          </g>
        </g>
        {false && (
          <rect
            x="127"
            y="190"
            width="200"
            height="250"
            stroke="rgba(255, 0, 0, 0.5)"
            fill="transparent"
          />
        )}
      </svg>
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
