import styled from 'styled-components'
import { useState } from 'react'
import { Distplacement } from './Displacement'
import { Overlay } from './Overlay'
import { Text } from './Text'
import { observer } from 'mobx-react-lite'
import { store } from 'data'

export const Mockup = observer<any>(
  ({ editable = false, image = '/images/temp.jpeg', query = {} }) => {
    const editorData = store.editorStore
    const [url, setUrl] = useState(image)
    const [uploading, setUploading] = useState(false)
    const { color, template, text } = editorData?.data ? editorData.data : query

    const isSweatShirt = template === 'sweatshirt'
    const isWhite = color === 'white'

    const width = 450
    const height = 600
    const size = { width, height }
    const posX = isSweatShirt ? 124 : 137

    const getFileName = () => {
      if (isSweatShirt) return isWhite ? 'sweatshirt-white-front' : 'sweatshirt-black-front'
      else return isWhite ? 'tshirt-white-front' : 'tshirt-black-front'
    }

    const tshirtUrl = '/mockups/' + getFileName() + '.png'
    const displacementUrl =
      '/mockups/' + (isSweatShirt ? 'sweatshirt-white-front' : 'tshirt-white-front') + '.png'

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

    const artworkSize = { width: 180, height: isSweatShirt ? 260 : 240 }

    const highLights = {
      amplitude: isSweatShirt ? 0.5 : 15,
      exponent: isSweatShirt ? 20 : 30
    }
    const shadows = {
      amplitude: isSweatShirt ? 1.2 : 2,
      exponent: isSweatShirt ? 2 : 5
    }

    return (
      <Container>
        <svg {...size} viewBox={`0 0 ${width} ${height}`}>
          <defs>
            <filter id="artwork-flood">
              <feFlood floodColor="white" floodOpacity="1" result="flood" />
              <feComposite in="flood" in2="SourceAlpha" operator="in" result="composite" />
            </filter>
            <Distplacement {...distortion} />
            <Overlay id="contrast" highLights={highLights} shadows={shadows} displacementUrl={displacementUrl} />
            <g id="artwork">
              <g filter="url(#displacement)">
                <g transform={`translate(${posX + offset} ${190 + offset})`}>
                  <image xlinkHref={url} {...artworkSize} preserveAspectRatio="xMidYMin meet" />
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

          <image href={tshirtUrl} width="450" height="600" />
          <use mask="url(#artwork-mask)" filter="url(#contrast)" href="#artwork" />

          {false && (
            <rect
              x="137"
              y="190"
              {...artworkSize}
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
)

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
