import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { Tab, tabContentStyle } from './Tabs'

export const BulkEditor = observer(() => {
  return (
    <Container value="bulk">
      <h4>Link image generator</h4>
    </Container>
  )
})

const Container = styled(Tab)`
  ${tabContentStyle}
`
