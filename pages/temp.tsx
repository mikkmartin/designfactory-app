import { getUsedFigmaImageRefs } from 'lib/api/getFigmaImages'
import styled from 'styled-components'
import { useState } from 'react'

const Temp = () => {
  const [refs, setRefs] = useState<any>()

  useState(async () => {
    const figmaID = 'N3kddbIfAP7M0R0EweV4gO'
    const file = await fetch(`/api/figma?template=${figmaID}`)
      .then(res => res.json())
      .then(json => json.data)
    const res = await getUsedFigmaImageRefs({ figmaID, file })
    setRefs(res)
  })

  return (
    <Container>
      <div>
        {refs
          ? refs.map(({ imageRef, url, width, height }) => {
              return <img key={imageRef} src={url} style={{ width, height, objectFit: 'cover' }} />
            })
          : 'Loading...'}
      </div>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 380px 380px;
  gap: 16px;
  margin: 4rem;
  pre {
    font-family: inherit;
    line-height: 1.5;
    font-size: 11px;
    p {
      opacity: 0.5;
    }
  }
  .unsupported-field {
    max-width: 100%;
    overflow: auto;
  }
`

export default Temp
