import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { observer } from 'mobx-react-lite'
import { BottomPanel } from 'components/Editor/BottomPanel'
import { SidePanel } from 'components/Editor/SidePanel'
import { Version } from 'components/Editor/Version'
import { Dialogue } from 'components/ui'
import { store } from 'data'
import React from 'react'

export const Layout = observer<{ children: React.ReactNode }>(({ children }) => {
  const { isEditing } = store.ui

  return (
    <Container outline={isEditing}>
      <SidePanel />
      <div className="container">
        <div className="canvas">{children}</div>
        <Version />
        <BottomPanel />
      </div>
      <Dialogue />
    </Container>
  )
})

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
    transition: box-shadow 0.05s ease-in-out;
    ${p =>
      p.outline &&
      css`
        box-shadow: inset 0 0 0 1px rgb(var(--highlight));
      `}
    > .canvas {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      overflow: auto;
      padding: 4rem 4rem 7rem 4rem;
      width: 100%;
      height: 100%;
      grid-area: canvas;
    }
  }
`

export default Layout
