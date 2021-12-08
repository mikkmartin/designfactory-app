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
      <ul>
        <NewTemplate key={0} />
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
      </ul>
    </Container>
  )
})

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.5;
  background: var(--background);
  padding-left: 8px;
  padding-bottom: 16px;
  overflow: auto;
  min-width: 250px;
  > .header {
    align-items: center;
    display: flex;
    width: 100%;
    justify-content: space-between;
    h3 {
      margin-left: 4px;
    }
  }
  ul {
    display: flex;
    flex-direction: column;
    padding-right: 8px;
    > *:nth-child(1) {
      margin-bottom: 4px;
    }
    a {
      background: none;
    }
  }
`
