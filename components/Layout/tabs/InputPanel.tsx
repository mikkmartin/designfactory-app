import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { store } from 'data'
import { Tab, tabContentStyle } from './Tabs'
import { Form } from 'components/Editor/Form'

export const InputPanel = observer(() => {
  const { schema, uiSchema } = store.file
  const { data, setData } = store.editor
  return (
    <Container value="inputs">
      <h4>Link image generator</h4>
      <p>Automate link preview images with one line of code.</p>
      <Form schema={schema} uiSchema={uiSchema} value={data} onValueChange={setData} />
    </Container>
  )
})

const Container = styled(Tab)`
  ${tabContentStyle}
  h4 {
    margin-bottom: 8px;
    font-weight: normal;
  }
  p {
    margin-bottom: 16px;
    opacity: 0.5;
  }
`
