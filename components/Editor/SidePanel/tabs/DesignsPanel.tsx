import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { Tab, tabContentStyle } from './Tab'
import { NewTemplateItem, TemplateItem } from '../designs'
import Masonry from 'react-masonry-css'
import { store } from 'data'

export const DesignPanel = observer(() => {
  const { themeOptions } = store.content.template

  return (
    <Container value="designs">
      <div className="header">
        <p>Design templates</p>
        <NewTemplateItem side="top" />
      </div>
      <Masonry
        breakpointCols={2}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column">
        {[...themeOptions]
          .sort((a, b) => +b.modifiedAt - +a.modifiedAt)
          .map(theme => (
            <TemplateItem key={theme.slug} theme={theme} />
          ))}
      </Masonry>
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
  .my-masonry-grid {
    display: flex;
    margin-left: -8px;
    width: auto;
  }
  .my-masonry-grid_column {
    padding-left: 8px;
    background-clip: padding-box;
    > div {
      margin-bottom: 8px;
    }
  }
`
