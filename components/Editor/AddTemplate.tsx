import { Button } from './Button'
import styled from 'styled-components'
import { drawerContent } from './Drawer'

export const AddTemplate = ({ onCancel }) => {
  return (
    <>
      <Content>
        <h1>Paste in the figma file url</h1>
        <input type="text" placeholder="https://www.figma.com/file/QFHu9LnnywkAKOdpuTZcgE..." />
        <p>
          If the template uses custom fonts – make sure you add them in the parematers (fonts: [])
        </p>
      </Content>
      <Footer>
        <Button width="inherit" onClick={onCancel}>Cancel</Button>
        <Button width="inherit" primary>Add template</Button>
      </Footer>
    </>
  )
}

const Content = styled.div`
  ${drawerContent}
  text-align: center;
  p {
    opacity: 0.4;
    padding: 16px 32px;
  }
`

const Footer = styled.div`
  display: flex;
  width: 100%;
`