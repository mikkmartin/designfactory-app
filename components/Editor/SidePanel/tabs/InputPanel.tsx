import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import { store } from 'data'
import { Form } from 'components/Editor/Form'
import { Tab } from './Tab'

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
  overflow: auto;
  padding-bottom: 32px;
  p {
    opacity: 0.5;
    padding: 16px 16px 8px 16px;
  }
`
