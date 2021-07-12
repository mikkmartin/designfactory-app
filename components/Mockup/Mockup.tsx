import styled from 'styled-components'
import { useState } from 'react'
import { useEditorData } from 'components/Editor/EditorContext'
import { useRouter } from 'next/router'
import { Distplacement } from './Displacement'
import { Overlay } from './Overlay'
import { Text } from './Text'

export const Mockup = ({ editable = false, image = '/images/temp.jpeg' }) => {
  const editorData = useEditorData()
  const { query } = useRouter()

  const [url, setUrl] = useState(image)
  const [uploading, setUploading] = useState(false)
  const { color, text } = editorData?.data ? editorData.data : query
  const isWhite = color === 'white'

  const width = 450
  const height = 600
  const size = { width, height }

  const tshirtUrl = '/mockups/' + (isWhite ? 'tshirt-white-front.png' : 'tshirt-black-front.png')

  const uploadPhoto = async e => {
    const file = e.target.files[0]
    setUrl(URL.createObjectURL(file))
    setUploading(true)

    const filename = encodeURIComponent(file.name)
    const res = await fetch(`/api/files/mockup/upload?file=${filename}`)
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

    setUploading(false)
    if (upload.ok) {
      console.log('Uploaded successfully!')
    } else {
      console.error('Upload failed.')
    }
  }

  const fabricDistortion = 15
  const gravityDistortion = 15
  const distortion = { fabricDistortion, gravityDistortion }
  const offset = (fabricDistortion + gravityDistortion) / 2.5

  return (
    <Container>
      <svg {...size} viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <filter id="artwork-flood">
            <feFlood floodColor="white" floodOpacity="1" result="flood" />
            <feComposite in="flood" in2="SourceAlpha" operator="in" result="composite" />
          </filter>
          <Distplacement {...distortion} />
          <Overlay id="contrast" />
          <g id="artwork">
            <g filter="url(#displacement)">
              <g transform={`translate(${127 + offset} ${190 + offset})`}>
                <image
                  xlinkHref={url}
                  width="200"
                  height="250"
                  preserveAspectRatio="xMidYMin meet"
                />
              </g>
            </g>
            <g filter="url(#displacement)">
              <Text>{text}</Text>
            </g>
          </g>
        </defs>

        <mask id="artwork-mask">
          <use filter="url(#artwork-flood)" href="#artwork" />
        </mask>

        <image href="/mockups/tshirt-white-front.png" width="450" height="600" />
        <use mask="url(#artwork-mask)" filter="url(#contrast)" href="#artwork" />

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
      {editable && uploading ? (
        <small>Uploading...</small>
      ) : (
        <input onChange={uploadPhoto} type="file" accept="image/png, image/jpeg" />
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
    opacity: 0;
  }
  small {
    position: absolute;
    background: black;
    left: 50%;
    top: 50%;
    transform: translateX(-50%);
  }
`
