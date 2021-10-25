import { Button } from '../../Common/Button'
import { ButtonStack, Content } from '../Tab'
import styled from 'styled-components'
import { useRef, useState } from 'react'
import { logTemplateAdded } from 'data/analytics'
import { store } from 'data'
import { useRouter } from 'next/dist/client/router'

export const AddTemplate = ({ onCancel, onAdd }) => {
  const ref = useRef<HTMLInputElement>(null)
  const [hasInput, setHasInput] = useState(false)
  const router = useRouter()

  const handleChange = () => {
    if (ref.current.value.length >= 22) setHasInput(true)
    else setHasInput(false)
  }

  const handleConfirm = async () => {
    const str = ref.current.value
    const [id] = str.split('/file/')[1].split('/')
    const { data, error } = await store.pages.addTempTemplate(id)
    if (error) return console.error(error)
    logTemplateAdded()
    onAdd()
    router.push(data.slug, undefined, { shallow: true })
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
