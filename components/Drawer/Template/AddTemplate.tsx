import { Button } from '../../Common/Button'
import { ButtonStack, Content } from '../Tab'
import styled from 'styled-components'
import { useRef, useState } from 'react'
import { logTemplateAdded } from 'data/analytics'
import { store } from 'data'

export const AddTemplate = ({ onCancel, onAdd }) => {
  const ref = useRef<HTMLInputElement>(null)
  const [hasInput, setHasInput] = useState(false)

  const handleChange = () => {
    if (ref.current.value.length >= 22) setHasInput(true)
    else setHasInput(false)
  }

  const handleConfirm = () => {
    const str = ref.current.value
    try {
      const [id] = str.split('/file/')[1].split('/')
      store.pages.addTempTemplate(id)
      logTemplateAdded()
      onAdd()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <Container>
        <h4>Paste in the figma file url</h4>
        <input
          ref={ref}
          onChange={handleChange}
          type="text"
          placeholder="https://www.figma.com/file/QFHu9LnnywkAKOdpuTZcgE..."
        />
        <p>
          If the template uses custom fonts – make sure you add them in the parematers (fonts: [])
        </p>
      </Container>
      <ButtonStack>
        <Button width="inherit" highlight onClick={onCancel}>
          Cancel
        </Button>
        <Button width="inherit" primary disabled={!hasInput} onClick={handleConfirm}>
          Add template
        </Button>
      </ButtonStack>
    </>
  )
}

const Container = styled(Content)`
  margin-top: 8px;
  text-align: center;
  h4 {
    margin-bottom: 16px;
  }
  p {
    opacity: 0.5;
  }
  input {
    width: 100%;
    padding: 16px 0 16px 24px;
  }
`
