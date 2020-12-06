import { Button } from '../Button'
import { ButtonStack, Content } from './Tab'

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
      <ButtonStack>
        <Button width="inherit" onClick={onCancel}>Cancel</Button>
        <Button width="inherit" primary>Add template</Button>
      </ButtonStack>
    </>
  )
}