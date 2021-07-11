import styled from 'styled-components'
import { useState } from 'react'
import { useEditorData } from 'components/Editor/EditorContext'
import { useRouter } from 'next/router'
import { Distplacement } from './Displacement'

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

  const fabricDistortion = 30
  const gravityDistortion = 20
  const offset = (fabricDistortion + gravityDistortion) / 2.5

  return (
    <Container>
      <svg {...size} viewBox={`0 0 ${width} ${height}`}>
        <image href="/mockups/tshirt-white-front.png" width="450" height="600" />
        <Distplacement fabricDistortion={fabricDistortion} gravityDistortion={gravityDistortion} />
        <g filter="url(#overlay)">
          <g transform={`translate(${127 + offset} ${190 + offset})`}>
            <image xlinkHref={url} width="200" height="250" preserveAspectRatio="xMidYMin meet" />
            <text style={{ fontSize: 84, fill: 'red' }} x={-20} y={100}>
              Hello
            </text>
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
