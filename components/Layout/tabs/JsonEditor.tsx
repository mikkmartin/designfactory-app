import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { Tab } from './Tabs'
import { ApiLink } from 'components/Editor/ApiLink'
import { CodeEditor } from 'components/Editor/CodeEditor'

export const JsonEditor = observer(() => {
  return (
    <Container value="code">
      <CodeEditor />
      <ApiLink />
    </Container>
  )
})

const Container = styled(Tab)`
  display: grid;
  grid-template-rows: 1fr auto;
`
