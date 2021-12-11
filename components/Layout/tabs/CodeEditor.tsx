import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { Tab } from './Tabs'

export const CodeEditor = observer(() => {
  return (
    <Container value="code">
      <h4>Json editor</h4>
    </Container>
  )
})

const Container = styled(Tab)``
