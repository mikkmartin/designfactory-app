import { useEditor } from '../Editor'
import { defaults } from '../../static/invoice'
import styled from 'styled-components'
import { Info, Droplet, Download } from '../Icons'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { InfoPanel } from './InfoPanel'
import { Button } from './Button'

export const Header = () => {
  const { json, blobUrl } = useEditor()
  const [infoOpen, setInfoOpen] = useState(false)
  const [designOpen, setDesignOpen] = useState(false)
  const fileName = json.fileName || defaults.fileName
  const linkAttributes = blobUrl ? { href: blobUrl, download: fileName } : {}

  return (
    <Container>
      <h1>{fileName}</h1>
      <div className="buttons">
        <Button onClick={() => setInfoOpen(!infoOpen)}>
          <Info />
        </Button>
        <Button onClick={() => setDesignOpen(!designOpen)}>
          <Droplet />
        </Button>
        <a {...linkAttributes}>
          <Button background={'var(--highlight)'}>
            <Download />
          </Button>
        </a>
      </div>
      <AnimatePresence>
        {designOpen && <InfoPanel close={() => setDesignOpen(!designOpen)} />}
        {infoOpen && <InfoPanel close={() => setInfoOpen(!infoOpen)} />}
      </AnimatePresence>
    </Container>
  )
}

const Container = styled.div`
  height: 56px;
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 24px;
  h1 {
    font-size: 16px;
    font-weight: 300;
  }
  .buttons {
    display: flex;
    gap: 1px;
  }
`
