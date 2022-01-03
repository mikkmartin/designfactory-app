import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { Tab, tabContentStyle } from './Tabs'
import { Button } from 'components/ui'
import { Plus } from 'components/Icons'

export const BulkEditor = observer(() => {
  return (
    <Container value="designs">
      <div className="header">
        <p>Designs</p>
        <Button>
          <Plus />
        </Button>
      </div>
      <div className="item-container">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="item" />
        ))}
      </div>
    </Container>
  )
})

const Container = styled(Tab)`
  ${tabContentStyle}
  .header {
    display: flex;
    justify-content: space-between;
  }
  .item-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    .item {
      aspect-ratio: 16 / 9;
      //aspect-ratio: 210 / 297;
      background: #ffffff1c;
      border-radius: 4px;
      &:hover {
        background: #ffffff1c;
      }
    }
  }
`
