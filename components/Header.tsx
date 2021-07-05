import { useEditor } from './Editor'
import styled from 'styled-components'
import { Download } from './Icons'
import { Button } from './Common/Button'
import { Drawer } from './Editor/Drawer'
import { DrawerProvider } from './Drawer/DrawerContext'
import { TabButton } from './Drawer/TabButton'
import { objectToParams } from 'lib/urlEncoder'
import baseURL from 'static/baseURL'

export const Header = () => {
  const { fileName, data } = useEditor()
  const buttonLabels = [
  //  'templates',
  //  'info',
  //  'donation'
  ]

  const handleDownload = () => {
    //logInvoiceDownload(json.template)
  }

  const getUrl = () => {
    const extension = 'png'
    const query = objectToParams(data)
    return `${baseURL}/files/${fileName}.${extension}?${query}`
  }

  return (
    <DrawerProvider
      panels={[
        'addtemplate',
        ...buttonLabels,
        'payment',
        'subscription-cancel',
        'unsubscribed',
        'thank you',
      ]}>
      <Container>
        <h1>{fileName}</h1>
        <div className="buttons">
          {buttonLabels.map(name => (
            <TabButton key={name} name={name} />
          ))}
          <a href={getUrl()} download="og-image.png">
            <Button primary onTap={handleDownload}>
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
    width: 1fr;
    text-overflow: ellipsis;
    overflow: hidden;
    height: 1.2em;
    white-space: nowrap;
    padding-right: 4px;
  }
  .buttons {
    display: flex;
    svg {
      pointer-events: none;
    }
  }
`
