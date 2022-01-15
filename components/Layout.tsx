import { FC } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { CanvasButtons } from 'components/Editor/CanvasButtons'
import { TutorialPanel } from 'components/Editor/TutorialPanel'
import { SidePanel } from 'components/Editor/SidePanel'
import { Version } from 'components/Editor/Version'
import { motion } from 'framer-motion'
import { fast } from 'lib/static/transitions'

export const Layout: FC = observer(({ children }) => {
  return (
    <Container>
      <SidePanel />
      <div className="container">
        <div className="canvas">
          <motion.div className="pos" transition={fast} layout="position">
            {children}
          </motion.div>
        </div>
      </div>
    </Container>
  )
})

const Container = styled.div`
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
