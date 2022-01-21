import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { Button } from 'components/ui'
import { store } from 'data'
import { motion } from 'framer-motion'
import { Refresh } from 'components/icons'
import { bouncy } from 'lib/static/transitions'
import useSWR from 'swr'

export const EditingPanel = observer(() => {
  const { figmaID, title } = store.content.template.theme
  const loading = false
  const url = `figma.com/file/${figmaID}`

  const handleSave = () => {
    store.content.setIsEditing(false)
  }
  const handleCancel = () => {
    store.content.setIsEditing(false)
  }

  return (
    <Container>
      <div>
        <a target="_blank" href={`https://${url}`}>
          {url}
        </a>
        <h4>
          {title} - {loading ? 'Loading...' : 'Waiting for changes'}
        </h4>
      </div>
      <div>
        <Button highlight onClick={handleCancel}>
          Cancel
        </Button>
        <Button highlight onClick={handleSave}>
          Save
        </Button>
        <Button highlight>
          <Refresh
            style={{ rotate: 0, opacity: loading ? 1 : 0.5 }}
            transition={loading ? { ...bouncy, mass: 2, repeat: Infinity } : { duration: 0 }}
            animate={loading ? { rotate: 180 } : {}}
          />
        </Button>
      </div>
    </Container>
  )
})

const fetcher = templateId => fetch('/api/figma?template=' + templateId).then(res => res.json())
const useRefreshTemplate = (poll: boolean) => {
  const { figmaID } = store.content.template.theme
  const { isValidating } = useSWR(figmaID, poll ? fetcher : null, {
    revalidateOnMount: false,
    focusThrottleInterval: 1000,
    onSuccess: data => console.log(data),
  })
  return { loading: isValidating }
}

const Container = styled(motion.div)`
  grid-area: canvas;
  place-self: start end;
  display: flex;
  justify-content: space-between;
  gap: 4px;
  padding: 6px;
  background: rgb(var(--highlight));
  height: 56px;
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
    padding: 0 56px;
    svg {
      height: 18px;
    }
    &:nth-child(2) {
      background: white;
      color: rgb(var(--highlight));
    }
    &:last-child {
      padding: 0;
      min-width: 64px;
    }
  }
`
