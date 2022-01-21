import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { Button } from 'components/ui'
import { store } from 'data'
import { motion } from 'framer-motion'
import { Refresh } from 'components/icons'
import { bouncy } from 'lib/static/transitions'

export const EditingPanel = observer<{ loading: boolean }>(({ loading }) => {
  const { figmaID, title } = store.content.template.theme
  const url = `figma.com/file/${figmaID}`

  const handleSave = () => {
    store.content.setIsEditing(false)
  }
  const handleCancel = () => {
    store.content.setIsEditing(false)
  }

  return (
    <Container style={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
      <div>
        <h4>
          {title} - {loading ? 'Loading...' : 'Waiting for changes'}
        </h4>
        <a target="_blank" href={`https://${url}`}>
          {url}
        </a>
      </div>
      <div>
        <Button highlight>
          <Refresh
            style={{ rotate: 0, opacity: loading ? 1 : 0.5 }}
            transition={loading ? { ...bouncy, mass: 2, repeat: Infinity } : { duration: 0 }}
            animate={loading ? { rotate: 180 } : {}}
          />
        </Button>
        <Button highlight onClick={handleCancel}>
          Cancel
        </Button>
        <Button highlight onClick={handleSave}>
          Save
        </Button>
      </div>
    </Container>
  )
})

const Container = styled(motion.div)`
  grid-area: canvas;
  place-self: start end;
  display: flex;
  justify-content: space-between;
  gap: 4px;
  padding: 12px;
  background: rgb(var(--highlight));
  height: 64px;
  width: 100%;
  a {
    color: white;
    opacity: 0.65;
    font-size: 11px;
    &:hover {
      text-decoration: underline;
      opacity: 1;
    }
  }
  > div {
    display: flex;
    height: 100%;
    gap: 4px;
    &:first-child {
      padding-left: 8px;
      flex-direction: column;
      justify-content: center;
    }
  }
  button {
    padding: 0 16px;
    svg {
      height: 18px;
    }
    &:last-child {
      background: white;
      color: rgb(var(--highlight));
    }
  }
`
