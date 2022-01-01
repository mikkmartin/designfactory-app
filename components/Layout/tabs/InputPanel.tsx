import styled from 'styled-components'
import { Input } from 'components/Common'
import { TextArea } from 'components/Common/TextArea'
import { Dropdown, DropdownSelector } from 'components/Common'
import { observer } from 'mobx-react-lite'
import { store } from 'data'
import { toJS } from 'mobx'
import { Tab, tabContentStyle } from './Tabs'
import { Form } from 'components/Editor/Form'

export const InputPanel = observer(() => {
  console.log(toJS(store.file.uiSchema))
  return (
    <Container value="inputs">
      <h4>Link image generator</h4>
      <p>Automate link preview images with one line of code.</p>
      <Form schema={store.file.schema} onValueChange={store.editor.setData} />
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
