import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { Button } from 'components/ui'
import { store } from 'data'
import { AnimatePresence, motion } from 'framer-motion'
import { Refresh, FigmaLogo } from 'components/icons'
import { bouncy, fast } from 'lib/static/transitions'
import { useState } from 'react'
import useSWR from 'swr'

export const EditingPanel = observer(() => {
  const { figmaID, title } = store.content.template.theme
  const url = `figma.com/file/${figmaID}`

  const handleSave = () => {
    store.content.setIsEditing(false)
  }
  const handleCancel = () => {
    store.content.setIsEditing(false)
  }

  const [loading, setLoading] = useState(false)

  return (
    <Container>
      <div className="info">
        <Button highlight onClick={() => setLoading(!loading)}>
          <div className="center-icon">
            <AnimatePresence>
              {!loading ? (
                <FigmaLogo
                  key="f"
                  className="figma"
                  transition={{ default: fast, opacity: { duration: 0.3 } }}
                  variants={{
                    initial: { rotate: -90, opacity: 0, scale: 1 },
                    shown: { rotate: 0, opacity: 1, scale: 1.5 },
                    exit: { rotate: 180, opacity: 0, scale: 0 },
                  }}
                />
              ) : (
                <Refresh
                  key="l"
                  initial="initial"
                  animate="shown"
                  exit="exit"
                  style={{ scale: 0.8 }}
                  transition={{ opacity: { duration: 0.2 } }}
                  variants={{
                    hidden: { rotate: 0, opacity: 0 },
                    shown: {
                      rotate: 180,
                      opacity: 1,
                      transition: {
                        rotate: {
                          ...bouncy,
                          mass: 2,
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
