import { FC } from 'react'
import styled from 'styled-components'
import { editable } from './editableStyle'
import { motion } from 'framer-motion'
import { store } from 'data'
import { observer } from 'mobx-react-lite'
import { fast } from 'lib/static/transitions'

const getScale = ({ self, parent }) => {
  const { width, height } = self
  if (!parent) return {}
  const isLargerThanParent = width > parent.width || height > parent.height
  if (!isLargerThanParent) return {}

  const minScale = 0.25
  const scale = Math.max(Math.min(parent.width / width, parent.height / height), minScale)
  const marginBottom = (1 - scale) * -100 + '%'

  return {
    scale,
    marginBottom,
  }
}

export const Page: FC = observer(({ children }) => {
  //const parent = store.pages.canvasContainerRef?.getBoundingClientRect()
  //const [ref, self] = useMeasure()
  store.ui.tutorialPanelIsOpen
  store.content.isEditing

  return (
    <Container
      layout="position"
      transition={fast}
      // style={getScale({ self, parent })} ref={ref}
    >
      {children}
    </Container>
  )
})

const Container = styled(motion.div)`
  > div {
    .ProseMirror p {
      line-height: unset;
      outline: none;
    }
    &:hover .ProseMirror {
      ${editable}
    }
    &:hover .ProseMirror:hover {
      transition: background-color 0s;
      background: rgba(0, 102, 255, 0.2);
    }
    &:focus-within .ProseMirror {
      background: unset;
      box-shadow: unset;
      transition: background-color 0;
      box-shadow: background-color 0;
      &:hover,
      &.ProseMirror-focused {
        ${editable}
      }
    }
    &:hover .ProseMirror {
      ${editable}
    }
    &:hover .add-button {
      opacity: 1;
    }
  }
`
