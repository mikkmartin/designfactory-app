import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { store } from 'data'
import { Form } from 'components/Editor/Form'
import { Tab, tabContentStyle } from './Tab'

export const InputPanel = observer(() => {
  const { description } = store.content.template
  const { inputData, setInputData } = store.content.template
  const { editorSchema, uiSchema } = store.content.template.theme

  return (
    <Container value="inputs">
      <p>{description}</p>
      <Form
        schema={editorSchema}
        uiSchema={uiSchema}
        value={inputData}
        onValueChange={setInputData}
      />
    </Container>
  )
})

const Container = styled(Tab)`
  ${tabContentStyle}
  p {
    opacity: 0.5;
  }
`
