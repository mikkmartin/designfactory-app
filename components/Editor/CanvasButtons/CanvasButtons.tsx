import { Button } from 'components/ui'
import { Download, EditPencil, Copy } from 'components/icons'
import styled from 'styled-components'
import { Flags } from './Flags'
import { useDebounce } from 'react-use'
import { store } from 'data'
import { useRef } from 'react'

export const CanvasButtons = () => {
  const url = store.ui.downloadUrl
  const fileName = store.content.template.theme.slug

  const imageRef = useRef<HTMLImageElement>(null)
  const preloadImage = () => {
    const img = new Image()
    img.src = url
    imageRef.current = img
  }
  useDebounce(preloadImage, 500, [url])

  const handleDownload = () => {
    const a = document.createElement('a')
    a.href = imageRef.current.src
    a.download = fileName + '.png'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(url)
  }

  return (
    <Container>
      <Flags />
      <Button highlight>
        <EditPencil />
      </Button>
      <Button highlight onClick={handleCopy}>
        <Copy />
      </Button>
      <ButtonCta onClick={handleDownload}>
        <Download />
      </ButtonCta>
      {/*<RefreshTemplate />*/}
    </Container>
  )
}

const ButtonCta = styled(Button)`
  width: 80px;
  background: rgb(var(--highlight));
  &:hover {
    background: #0063cc !important;
  }
  &:active {
    background: #0063cc;
    svg {
      opacity: 0.5;
    }
  }
`

const Container = styled.div`
  grid-area: canvas;
  place-self: start end;
  display: flex;
  flex-direction: row;
  gap: 4px;
  padding: 8px;
  z-index: 2;
  > button {
    height: 48px;
    min-width: 48px;
  }
  svg {
    height: 20px;
    stroke-width: 1.5px;
  }
`
