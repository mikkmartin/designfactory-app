import useSWR from 'swr'
import { FC, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { observer } from 'mobx-react-lite'
import { CanvasButtons } from 'components/Editor/CanvasButtons'
import { EditingPanel } from 'components/Editor/EditingPanel'
import { TutorialPanel } from 'components/Editor/TutorialPanel'
import { SidePanel } from 'components/Editor/SidePanel'
import { Version } from 'components/Editor/Version'
import { store } from 'data'
import Router, { useRouter } from 'next/router'
import { Alert } from 'components/ui'

export const Layout: FC = observer(({ children }) => {
  const { isEditing, setIsEditing } = store.content
  const { loading } = useRefreshTemplate(isEditing)
  const router = useRouter()

  useRouteChangeCallback(isEditing, (path, options) => {
    store.ui.showDialogue('Unsaved changes').then(() => {
      setIsEditing(false)
      router.push(path, undefined, options)
    })
    return false
  })

  return (
    <Container outline={isEditing}>
      <SidePanel />
      <div className="container">
        {isEditing && <EditingPanel loading={loading} />}
        <div className="canvas">{children}</div>
        <Version />
        {!isEditing && (
          <>
            <CanvasButtons />
            <TutorialPanel />
          </>
        )}
      </div>
      <Alert />
    </Container>
  )
})

const useRouteChangeCallback = (unsavedChanges: boolean, callback: (route, opts) => boolean) => {
  useEffect(() => {
    if (unsavedChanges) {
      const routeChangeStart = (path, options) => {
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

const Container = styled.div<{ outline: boolean }>`
  display: grid;
  grid-template-columns: auto 3fr;
  grid-template-rows: 1fr auto;
  grid-template-areas: 'sidepanel canvas';
  width: 100vw;
  height: 100vh;
  background: #1a1e25;
  > .container {
    display: grid;
    grid-template-rows: 1fr auto;
    grid-template-areas: 'canvas' 'bar';
    place-items: center;
    max-height: 100vh;
    border-radius: 0 0 10px 0;
    box-shadow: inset 0 0 0 1px transparent;
    transition: box-shadow 0.1s ease-in-out;
    ${p =>
      p.outline &&
      css`
        box-shadow: inset 0 0 0 1px rgb(var(--highlight));
      `}
    > .canvas {
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: auto;
      padding: 2rem;
      width: 100%;
      height: 100%;
      grid-area: canvas;
    }
  }
`

export default Layout
