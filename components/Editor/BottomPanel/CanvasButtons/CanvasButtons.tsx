import { Info, Download, EditPencil, Copy, ExternalLink } from 'components/icons'
import { useDebounce, useKeyPressEvent } from 'react-use'
import { fast } from 'lib/static/transitions'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { store } from 'data'
import { Button } from 'components/ui'
import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { Flags } from './Flags'

export const CanvasButtons = observer(() => {
  const { toggleTutorialPanel } = store.ui
  const { template, setIsEditing } = store.content
  const fileName = template.theme.slug
  const url = store.ui.downloadUrl

  const handleEdit = () => {
    //const { figmaID } = template.theme
    //const url = `https://www.figma.com/file/${figmaID}`
    //setTimeout(() => window.open(url, '_blank'))
    setIsEditing(true)
  }

  const [metaKeyDown, setMetaKeyDown] = useState(false)
  useKeyPressEvent(
    'Meta',
    () => setMetaKeyDown(true),
    () => setMetaKeyDown(false)
  )

  const imageRef = useRef<HTMLImageElement>(null)
  const preloadImage = () => {
    /*
    const img = new Image()
    img.src = url
    imageRef.current = img
    */
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
    <Container
      initial="hidden"
      animate="shown"
      exit="hidden"
      transition={fast}
      variants={{
        shown: { opacity: 1, scale: 1, y: '0%' },
        hidden: { opacity: 0, scale: 0.9, y: '50%' },
      }}>
      <div className="wrapper">
        <Flags />
        <Button onClick={toggleTutorialPanel}>
          <Info strokeWidth="1" />
        </Button>
        <Button onClick={handleEdit}>
          <EditPencil />
        </Button>
        <hr />
        <Button onClick={handleCopy}>
          <div className="flip-icon-containter">{metaKeyDown ? <ExternalLink /> : <Copy />}</div>
        </Button>
        <ButtonCta onClick={handleDownload}>
          <Download />
        </ButtonCta>
      </div>
    </Container>
  )
})

const Container = styled(motion.div)`
  height: 0;
  display: flex;
  align-items: end;
  .wrapper {
    display: flex;
    flex-direction: row;
    gap: 4px;
    padding: 4px;
    background: rgba(40, 44, 52, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 8px;
    margin-bottom: 18px;
    hr {
      width: 1px;
      border: none;
      background: rgba(255, 255, 255, 0.1);
      margin: 6px -2px;
    }
    button {
      height: 44px;
      min-width: 60px;
      svg {
        opacity: 0.5;
      }
      > .flip-icon-containter {
        display: grid;
        > svg {
          grid-area: 1 / 1;
        }
      }
      &:hover svg {
        opacity: 1;
      }
    }
    svg {
      height: 18px;
      stroke-width: 1.5px;
    }
  }
`

const ButtonCta = styled(Button)`
  width: 80px;
  background: rgb(var(--highlight));
  svg {
    opacity: 1 !important;
    path {
      stroke-width: 2px;
    }
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
