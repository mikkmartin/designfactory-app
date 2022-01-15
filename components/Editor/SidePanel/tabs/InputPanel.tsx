import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { store } from 'data/stores_v2'
import { Form } from 'components/Editor/Form'
import { Tab, tabContentStyle } from './Tab'

export const InputPanel = observer(() => {
  const { description } = store.content.template
  /*
  const { schema, uiSchema } = store.file
  const { data, setData } = store.editor
  */

  return (
    <Container value="inputs">
      <p>{description}</p>
      {/*<Form schema={schema} uiSchema={uiSchema} value={data} onValueChange={setData} />*/}
    </Container>
  )
})

const Container = styled(Tab)`
  ${tabContentStyle}
`
