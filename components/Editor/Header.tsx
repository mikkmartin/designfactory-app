import { useEditor } from '../Editor'
import { defaults } from '../../static/invoice'
import styled from 'styled-components'
import { Info, Droplet, Download } from '../Icons'
import { useState } from 'react'
import { InfoPanel } from './InfoPanel'
import { TemplatePanel } from './TemplatePanel'
import { Button } from './Button'
import { Drawer } from './Drawer'

export const Header = () => {
  const { json, blobUrl } = useEditor()
  const fileName = json.fileName || defaults.fileName
  const linkAttributes = blobUrl ? { href: blobUrl, download: fileName } : {}
  const [openPanel, setOpenPanel] = useState<'templates' | 'info' | false>(false)

  return (
    <Container>
      <h1>{fileName}</h1>
      <div className="buttons">
        <Button onClick={() => setOpenPanel(openPanel !== 'info' ? 'info' : false)}>
          <Info />
        </Button>
        <Button onClick={() => setOpenPanel(openPanel !== 'templates' ? 'templates' : false)}>
          <Droplet />
        </Button>
        <a {...linkAttributes}>
          <Button background={'var(--highlight)'}>
            <Download />
          </Button>
        </a>
      </div>
      <Drawer onClickAway={() => setOpenPanel(false)}>
        {openPanel === 'templates' && <TemplatePanel key={1} />}
        {openPanel === 'info' && <InfoPanel key={2} close={() => setOpenPanel(false)} />}
      </Drawer>
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
