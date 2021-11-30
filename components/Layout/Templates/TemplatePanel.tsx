import styled from 'styled-components'
import { Close } from 'components/Icons'
import { Button } from 'components/Common'
import { observer } from 'mobx-react-lite'
import { store } from 'data'
import { useRouter } from 'next/router'

export const TemplatePanel = observer(() => {
  const router = useRouter()
  const { templates, slug: selectedSlug } = store.editorStore
  const { templatePanelIsOpen: isOpen, toggleTemplatePanel } = store.editorStore

  const handleSelect = (slug: string) => {
    router.push(slug)
  }

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
        {templates.map(({ slug, title, thumbnail_url }) => (
          <li
            onClick={() => handleSelect(slug)}
            key={slug}
            className={selectedSlug === slug ? 'selected' : ''}>
            {thumbnail_url && <img src={thumbnail_url} alt={title} />}
            {selectedSlug === slug ? (
              <small>selected</small>
            ) : (
              <>
                <small>{slug}</small>
                <h4>{title}</h4>
              </>
            )}
          </li>
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
    gap: 8px;
    padding-right: 12px;
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
        opacity: 0;
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
