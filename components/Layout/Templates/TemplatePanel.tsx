import styled from 'styled-components'
import { Close } from 'components/Icons'
import { Button } from 'components/Common'
import { observer } from 'mobx-react-lite'
import { store } from 'data'
import { useRouter } from 'next/router'

export const TemplatePanel = observer(() => {
  const router = useRouter()
  const { templates } = store.editorStore
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
        <li key={0} className="new">Add</li>
        {templates.map(({ slug, title, thumbnail_url }) => (
          <li onClick={() => handleSelect(slug)} key={slug}>
            <pre>{JSON.stringify({ title, slug, thumbnail_url }, null, 2)}</pre>
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
      align-items: center;
      width: 100%;
      aspect-ratio: 16 / 9;
      background: black;
      cursor: pointer;
      &:hover {
        background: #ffffff22;
      }
      &.new {
        aspect-ratio: 16 / 4;
        justify-content: center;
      }
    }
  }
`
