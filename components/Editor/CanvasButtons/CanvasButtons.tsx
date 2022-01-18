import { Button } from 'components/ui'
import { Download, EditPencil, Copy, ExternalLink } from 'components/icons'
import styled from 'styled-components'
import { Flags } from './Flags'
import { useDebounce, useKeyPressEvent } from 'react-use'
import { store } from 'data'
import { useRef, useState } from 'react'

export const CanvasButtons = () => {
  const url = store.ui.downloadUrl
  const fileName = store.content.template.theme.slug

  const [metaKeyDown, setMetaKeyDown] = useState(false)
  useKeyPressEvent(
    'Meta',
    () => setMetaKeyDown(true),
    () => setMetaKeyDown(false)
  )

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
    if (metaKeyDown) setTimeout(() => window.open(url, '_blank'))
    else navigator.clipboard.writeText(url)
  }

  return (
    <Container>
      <Flags />
      <Button highlight>
        <EditPencil />
      </Button>
      <Button highlight onClick={handleCopy}>
        <div className="flip-icon-containter">{metaKeyDown ? <ExternalLink /> : <Copy />}</div>
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
  svg path {
    stroke-width: 2px;
  }
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
  padding: 12px;
  z-index: 2;
  button {
    height: 44px;
    min-width: 60px;
    > .flip-icon-containter {
      display: grid;
      > svg {
        opacity: 0.5;
        grid-area: 1 / 1;
      }
    }
    &:hover .flip-icon-containter svg {
      opacity: 1;
    }
  }
  svg {
    height: 18px;
    stroke-width: 1.5px;
  }
`
