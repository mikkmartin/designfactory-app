import styled from 'styled-components'
import { Close, FigmaLogo } from 'components/Icons'
import { Button } from 'components/Common'
import { observer } from 'mobx-react-lite'
import { store } from 'data'
import Link from 'next/link'

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
    templateHovered,
    templateBlurred,
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
            <a onMouseEnter={() => templateHovered(slug)} onMouseLeave={templateBlurred}>
              <li className={selectedSlug === slug ? 'selected' : ''}>
                {thumbnail_url && <img src={thumbnail_url} alt={title} />}
                {selectedSlug === slug ? (
                  <small>selected</small>
                ) : (
                  <>
                    <FigmaLogo />
                    <h4>{title}</h4>
                    <pre>{JSON.stringify({ loading, slug }, null, 2)}</pre>
                  </>
                )}
              </li>
            </a>
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
  .header {
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
      padding: 4px 0;
      background: none;
    }
    li {
      user-select: none;
      display: flex;
      flex-direction: column;
      width: 100%;
      aspect-ratio: 16 / 9;
      background: #00000075;
      cursor: pointer;
      padding: 8px;
      position: relative;
      border-radius: 4px;
      overflow: hidden;
      h4,
      small {
        z-index: 2;
      }
      &:hover {
        h4,
        small {
          opacity: 1;
        }
        img {
          opacity: 0.3;
        }
      }
      &.new {
        aspect-ratio: 16 / 4;
        justify-content: center;
        align-items: center;
        &:hover {
          background: #ffffff22;
        }
      }
      img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        opacity: 0.5;
        z-index: 1;
      }
      &.selected {
        justify-content: center;
        align-items: center;
        small {
          opacity: 1;
          opacity: 0.5;
          font-style: italic;
        }
        img {
          opacity: 0.15;
        }
      }
    }
  }
`
