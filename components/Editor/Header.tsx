import { useEditor } from '../Editor'
import { defaults } from '../../static/invoice'
import styled from 'styled-components'
import { Download } from '../Icons'
import { Button } from './Button'
import { Drawer } from './Drawer'
import { DrawerProvider } from './Drawer/DrawerContext'
import { TabButton } from './Drawer/TabButton'

export const Header = () => {
  const { json, blobUrl } = useEditor()
  const fileName = json.fileName || defaults.fileName
  const linkAttributes = blobUrl ? { href: blobUrl, download: fileName } : {}
  const buttonLabels = ['info', 'templates']

  return (
    <DrawerProvider panels={[...buttonLabels, 'addtemplate']}>
      <Container>
        <h1>{fileName}</h1>
        <div className="buttons">
          {['info', 'templates'].map(name =>
            <TabButton key={name} name={name} />
          )}
          <a {...linkAttributes}>
            <Button primary>
              <Download />
            </Button>
          </a>
        </div>
        <Drawer />
      </Container>
    </DrawerProvider>
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
    svg {
      pointer-events: none;
    }
  }
`