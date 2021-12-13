import { Root, Content } from '@radix-ui/react-tabs'
import { observer } from 'mobx-react-lite'
import { store } from 'data'
import styled, { css } from 'styled-components'

type Tab = typeof store.editor.tabs[number]

export const Tabs = observer(({ children }) => {
  const { currentTab, setCurrentTab } = store.editor
  return (
    <Container
      value={currentTab}
      onValueChange={setCurrentTab}
      activationMode="manual"
      orientation="horizontal">
      {children}
    </Container>
  )
})

const Container = styled(Root)`
  grid-area: sidepanel;
  display: flex;
  position: relative;
  background: #282c34;
  flex-direction: column;
  width: 420px;
  height: 100%;
  > [data-state='inactive'] {
    display: none;
  }
`

export const Tab = styled(Content)<{ value: Tab }>`
  height: 100%;
  overflow: auto;
`

export const tabContentStyle = css`
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`
