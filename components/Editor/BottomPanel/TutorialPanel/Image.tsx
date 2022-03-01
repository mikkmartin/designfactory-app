import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { store } from 'data'
import { Button } from 'components/ui'
import { Download, Copy } from 'components/icons'

export const Image = observer(() => {
  const { theme, inputData } = store.content.template
  const { size, thumbnailUrl } = theme
  const url = store.ui.downloadUrl

  const noProps = inputData && Object.keys(inputData).length === 0

  const handleCopy = () => {
    navigator.clipboard.writeText(url)
  }

  return (
    <Container key={url} style={{ aspectRatio: `${size.width} / ${size.height}` }}>
      <img src={noProps ? thumbnailUrl : url} alt="Image preview" />
      <div className="buttons">
        <Button small onClick={handleCopy}>
          <Copy />
        </Button>
        <Button small>
          <Download />
        </Button>
      </div>
    </Container>
  )
})

const Container = styled.div`
  grid-area: image;
  border-radius: 3px;
  width: 12rem;
  background: rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: grid;
  &:hover .buttons {
    opacity: 1;
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
    grid-area: 1 / 1;
  }
  .buttons {
    opacity: 0;
    grid-area: 1 / 1;
    place-self: end center;
    display: flex;
    flex-direction: row;
    margin: 8px 4px;
    gap: 2px;
    button {
      border-radius: 99rem;
      background: rgba(0, 0, 0, 0.15);
      backdrop-filter: blur(20px);
      padding: 10px;
      color: white;
      svg {
        width: 14px;
        height: 14px;
        stroke-width: 2px;
      }
      &:hover {
        background: rgba(0, 0, 0, 0.25);
      }
    }
  }
`
