import styled from 'styled-components'
import { Close, FigmaLogo, More } from 'components/Icons'
import { Button } from 'components/Common'
import { observer } from 'mobx-react-lite'
import { store } from 'data'
import Link from 'next/link'
import { TemplateItem } from './TemplateItem'

type SortProp = { slug: string }
const alphabetically = (a: SortProp, b: SortProp) => {
  if (a.slug < b.slug) return -1
  if (a.slug > b.slug) return 1
  return 0
}

export const TemplatePanel = observer(() => {
  const {
    templates,
    slug: selectedSlug,
    templatePanelIsOpen: isOpen,
    toggleTemplatePanel,
  } = store.editorStore

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
        <li key={0} className="new">
          Add template
        </li>
        {[...templates].sort(alphabetically).map(({ slug, title, thumbnail_url, loading }) => (
          <Link key={slug} href={slug} shallow prefetch={false}>
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
  padding-left: 16px;
  padding-bottom: 16px;
  overflow: auto;
  min-width: 250px;
  > .header {
    align-items: center;
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  ul {
    display: flex;
    flex-direction: column;
    padding-right: 12px;
    a {
      background: none;
    }
  }
`
