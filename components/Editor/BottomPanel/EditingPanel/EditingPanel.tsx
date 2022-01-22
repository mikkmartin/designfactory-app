import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { Button } from 'components/ui'
import { store } from 'data'
import { AnimatePresence, motion } from 'framer-motion'
import { Refresh, FigmaLogo } from 'components/icons'
import { bouncy, fast } from 'lib/static/transitions'
import useSWR from 'swr'

export const EditingPanel = observer(() => {
  const { figmaID, title, discardData, saveData } = store.content.template.theme
  const url = `figma.com/file/${figmaID}`

  const handleSave = async () => {
    store.content.setIsEditing(false)
    saveData()
  }
  const handleCancel = () => {
    discardData()
    store.content.setIsEditing(false)
  }

  const { loading, mutate } = useRefreshTemplate()

  return (
    <Container>
      <div className="info">
        <Button highlight onClick={mutate}>
          <div className="center-icon">
            <AnimatePresence>
              {!loading ? (
                <FigmaLogo
                  key="f"
                  className="figma"
                  transition={{ default: bouncy, opacity: { duration: 0.1 } }}
                  initial={{ rotate: -90, opacity: 0, scale: 1 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1.5 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0, transition: fast }}
                />
              ) : (
                <Refresh
                  key="l"
                  initial="initial"
                  animate="shown"
                  exit="exit"
                  style={{ scale: 0.8 }}
                  transition={{ opacity: { duration: 0.1 } }}
                  variants={{
                    hidden: { rotate: 0, opacity: 0 },
                    shown: {
                      rotate: 180,
                      opacity: 1,
                      transition: {
                        rotate: {
                          ...bouncy,
                          mass: 1.7,
                          repeat: Infinity,
                        },
                      },
                    },
                    exit: { rotate: 360, opacity: 0 },
                  }}
                />
              )}
            </AnimatePresence>
          </div>
        </Button>
        <div>
          <a target="_blank" href={`https://${url}`}>
            {url}
          </a>
          <h4>
            {title} - {loading ? 'Loading...' : 'Waiting for changes'}
          </h4>
        </div>
      </div>

      <div className="buttons">
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

const fetcher = templateId => fetch('/api/figma?template=' + templateId).then(res => res.json())
const useRefreshTemplate = () => {
  const { figmaID, setPreviewData } = store.content.template.theme
  const { isValidating, mutate } = useSWR(figmaID, fetcher, {
    focusThrottleInterval: 1000,
    onSuccess: ({ error, data }) => {
      if (error) return console.error(error)
      setPreviewData(data)
    },
  })
  return { loading: isValidating, mutate }
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
  .info {
    display: flex;
    gap: 8px;
    button {
      padding: 0;
      aspect-ratio: 1 / 1;
      .center-icon {
        display: grid;
        place-items: center;
        > * {
          grid-area: 1 / 1;
        }
        svg {
          &.figma {
            opacity: 1;
            fill: white;
          }
        }
      }
    }
    > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 4px;
      a {
        color: white;
        opacity: 0.65;
        font-size: 11px;
        &:hover {
          text-decoration: underline;
          opacity: 1;
        }
      }
    }
  }
  .buttons {
    display: flex;
    height: 100%;
    gap: 4px;
    justify-content: center;
    button {
      padding: 0 56px;
      svg {
        height: 18px;
      }
      &:last-child {
        background: white;
        color: rgb(var(--highlight));
      }
    }
  }
`