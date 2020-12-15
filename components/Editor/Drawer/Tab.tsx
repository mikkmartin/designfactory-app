import { FC } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { snappy } from '../../../static/transitions'

type Props = {
  initial: boolean
  previousPanel: null | string
  panels: string[]
  panel: string | false
}

export const Tab: FC<Props> = ({ children, panels, panel, previousPanel, initial }) => {
  const tabProps = (initial = false) => ({
    transition: snappy,
    custom: panel,
    exit: 'exit',
    initial: [!initial && 'enter', initial && 'hidden'],
    animate: ['in', 'revealed'],
    variants: {
      enter: (p) => directionVariant(panels.indexOf(p) > panels.indexOf(previousPanel)),
      exit: (p) => directionVariant(panels.indexOf(p) < panels.indexOf(panel as string)),
      in: { x: '0%' },
      revealed: { transition: { staggerChildren: 0.05 } }
    }
  })

  const directionVariant = (dir: boolean) => ({
    x: dir ? "100%" : "-100%"
  });

  return <Container {...tabProps(initial)}>{children}</Container>
}

export const childAnimations = {
  variants: {
    hidden: { scale: 1, y: -25, opacity: 0 },
    revealed: { scale: 1, y: 0, opacity: 1 }
  },
  transition: { ...snappy, opacity: { duration: 0.2 } }
}
export const Content = styled.div`
  padding: 16px 16px 0;
  p {
    margin: 8px 8px;
  }
`
export const ButtonStack = styled(motion.div)`
  display: flex;
  width: 100%;
  gap: 1px;
  button {
    flex: 1;
  }
`
const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`