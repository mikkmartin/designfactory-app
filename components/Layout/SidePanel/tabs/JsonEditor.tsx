import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { ApiLink } from 'components/Editor/ApiLink'
import { CodeEditor } from 'components/Editor/CodeEditor'
import { Tab } from './Tab'

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
