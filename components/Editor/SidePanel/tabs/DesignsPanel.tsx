import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { Tab, tabContentStyle } from './Tab'
import { NewTemplateItem, TemplateItem } from '../designs'
import { store } from 'data/stores_v2'
import Link from 'next/link'

export const DesignPanel = observer(() => {
  const { themeOptions } = store.content.template

  return (
    <Container value="designs">
      <div className="header">
        <p>Design templates</p>
        <NewTemplateItem small={false} />
      </div>
      <div className="grid">
        {themeOptions.map(theme => (
          <Link key={theme.slug} href={`/temp/${theme.slug}`}>
            <TemplateItem theme={theme} />
          </Link>
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
