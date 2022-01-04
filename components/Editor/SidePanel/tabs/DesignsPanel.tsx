import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { Tab, tabContentStyle } from './Tab'
import { NewTemplateItem, TemplateItem } from '../designs'
import { store } from 'data'
import Link from 'next/link'

export const DesignPanel = observer(() => {
  const { templates } = store.editor
  const { slug: selectedSlug } = store.file

  return (
    <Container value="designs">
      <div className="header">
        <p>Design templates</p>
        <NewTemplateItem small={false} />
      </div>
      <div className="grid">
        {templates.map(({ slug, title, thumbnail_url, loading }) => (
          <Link key={slug} href={slug}>
            <TemplateItem
              selected={selectedSlug === slug}
              slug={slug}
              title={title}
              thumbnail={thumbnail_url}
              loading={loading}
            />
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
