import styled from 'styled-components'
import { Close } from 'components/Icons'
import { Button } from 'components/Common'
import { observer } from 'mobx-react-lite'
import { store } from 'data'

export const TemplatePanel = observer(() => {
  const { templates } = store.pages
  const { templatePanelIsOpen: isOpen, toggleTemplatePanel } = store.editorStore
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
        {templates.map(template => (
          <li className="item" key={template.id}>
            <pre>{template.title}</pre>
          </li>
        ))}
        <li className="item">Add</li>
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
    .item {
      display: flex;
      align-items: center;
      width: 100%;
      aspect-ratio: 16 / 9;
      background: black;
      border-radius: 8px;
    }
  }
`
