import styled from 'styled-components'
import { Close } from 'components/Icons'
import { Button } from 'components/Common'
import { observer } from 'mobx-react-lite'
import { store } from 'data'
import Link from 'next/link'
import { TemplateItem } from './TemplateItem'
import { NewTemplate } from './NewTemplate'

type SortProp = { slug: string }
const alphabetically = (a: SortProp, b: SortProp) => {
  if (a.slug < b.slug) return -1
  if (a.slug > b.slug) return 1
  return 0
}

export const TemplatePanel = observer(() => {
  const { templates, templatePanelIsOpen: isOpen, toggleTemplatePanel } = store.editor
  const { slug: selectedSlug } = store.file

  if (!isOpen) return null
  return (
    <Container>
      <div className="header">
        <h3>Templates</h3>
        <Button onTap={toggleTemplatePanel}>
          <Close />
        </Button>
      </div>
      <NewTemplate />
      {[...templates].sort(alphabetically).map(({ slug, title, thumbnail_url, loading }) => (
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
    </Container>
  )
})

const Container = styled.div`
  grid-area: templates;
  display: flex;
  flex-direction: column;
  flex: 0.5;
  background: var(--background);
  overflow: auto;
  width: 250px;
  padding: 16px;
  gap: 4px;
  > .header {
    align-items: center;
    display: flex;
    width: 100%;
    justify-content: space-between;
    h3 {
      margin-left: 4px;
    }
  }
`
