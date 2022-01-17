import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { Tab, tabContentStyle } from './Tab'
import { NewTemplateItem, TemplateItem } from '../designs'
import { store } from 'data'

export const DesignPanel = observer(() => {
  const { themeOptions } = store.content.template

  return (
    <Container value="designs">
      <div className="header">
        <p>Design templates</p>
        <NewTemplateItem small={false} />
      </div>
      <div className="grid">
        {[...themeOptions]
          .sort((a, b) => +b.modifiedAt - +a.modifiedAt)
          .map(theme => (
            <TemplateItem key={theme.slug} theme={theme} />
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
    place-items: center;
    margin-bottom: 8px;
  }
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px;
  }
`
