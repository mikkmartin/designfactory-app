import { store } from 'data/stores_v2'
import styled from 'styled-components'
import { Logo } from 'components/Icons'
import { Drawer } from '../../Drawer'
import { DrawerProvider } from '../../Drawer/DrawerContext'
import { TabButton } from '../../Drawer/TabButton'
import { observer } from 'mobx-react-lite'

export const Header = observer(() => {
  const { title: fileName } = store.content.template
  const buttonLabels = [
    'templates',
    //  'info',
    //  'donation'
  ]

  const handleDownload = () => {
    //logInvoiceDownload(json.template)
  }

  return (
    <DrawerProvider
      panels={[
        ...buttonLabels,
        'addtemplate',
        'payment',
        'subscription-cancel',
        'unsubscribed',
        'thank you',
      ]}>
      <Container>
        <div className="title">
          <Logo className="logo" />
          <h1>{fileName}</h1>
        </div>
        <div className="buttons">
          {buttonLabels.map(name => (
            <TabButton key={name} name={name} />
          ))}
          {/*
          <a href={downloadUrl} download={`${fileName}.png`}>
            <Button primary onTap={handleDownload}>
              <Download />
            </Button>
          </a>
            */}
        </div>
        <Drawer />
      </Container>
    </DrawerProvider>
  )
})

const Container = styled.div`
  height: 56px;
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .title {
    height: 100%;
    display: flex;
    align-items: center;
    .logo {
      height: 100%;
      width: auto;
    }
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
  }
`
