import { AnimatePresence, motion } from 'framer-motion'
import { Refresh, FigmaLogo } from 'components/icons'
import { bouncy, fast } from 'lib/static/transitions'
import Router, { useRouter } from 'next/router'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { Button } from 'components/ui'
import { store } from 'data'
import { useEffect } from 'react'
import useSWR from 'swr'

export const EditingPanel = observer(() => {
  const { figmaID, title, discardData, saveData } = store.content.template.theme
  const { asPath: currentPath, push } = useRouter()
  const { isEditing, setIsEditing } = store.ui
  const url = `figma.com/file/${figmaID}`

  const handleSave = async () => {
    setIsEditing(false)
    saveData()
  }
  const handleCancel = () => {
    discardData()
    setIsEditing(false)
  }

  const { loading, mutate } = useRefreshTemplate()

  useRouteChangeCallback(isEditing, currentPath, (path, options) => {
    store.ui
      .showDialogue({
        title: 'Unsaved changes',
        contentText: 'Changes you made will be lost.',
        actionLabel: 'Discard changes',
        warning: true,
      })
      .then(() => {
        setIsEditing(false)
        push(path, undefined, options)
      })
      .catch(_ => {
        if (!path.includes(Router.query.slug)) {
          Router.replace(currentPath, undefined, options)
        }
      })
    return false
  })

  return (
    <Container loading={loading}>
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

const useRouteChangeCallback = (
  unsavedChanges: boolean,
  currentPath: string,
  callback: (route, opts) => boolean
) => {
  useEffect(() => {
    if (unsavedChanges) {
      const routeChangeStart = (path, options) => {
        if (currentPath === path) return true
        const ok = callback(path, options)
        if (!ok) {
          Router.events.emit('routeChangeError')
          throw 'Abort route change. Please ignore this error.'
        }
      }
      Router.events.on('routeChangeStart', routeChangeStart)
      return () => Router.events.off('routeChangeStart', routeChangeStart)
    }
  }, [unsavedChanges])
}

const Container = styled(motion.div)<{ loading: boolean }>`
  grid-area: canvas;
  place-self: start end;
  display: flex;
  justify-content: space-between;
  gap: 4px;
  padding: 6px;
  height: 56px;
  width: 100%;
  ${({ loading }) =>
    !loading
      ? 'background: rgb(var(--highlight));'
      : css`
          animation-duration: 1s;
          animation-fill-mode: forwards;
          animation-iteration-count: infinite;
          animation-name: placeHolderShimmer;
          animation-timing-function: linear;
          background: linear-gradient(
            90deg,
            rgb(var(--highlight)) 0%,
            rgb(60, 154, 255) 12.5%,
            rgb(var(--highlight)) 25%
          );
          background-size: 100vw;
          @keyframes placeHolderShimmer {
            0% {
              background-position: -100vw 0;
            }
            100% {
              background-position: 100vw 0;
            }
          }
        `}
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
