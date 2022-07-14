import { fast } from 'lib/static/transitions'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { Flags } from './Flags'
import { TutorialButton as Tutorial } from './TutorialButton'
import { EditButton as Edit } from './EditButton'
import { CopyButton as Copy } from './CopyButton'
import { DownloadButton } from './DownloadButton'
import { useRef } from 'react'

export const CanvasButtons = observer(() => {
  const imageRef = useRef<HTMLImageElement>(null)
  return (
    <Container
      initial="hidden"
      animate="shown"
      exit="hidden"
      transition={fast}
      variants={{
        shown: { opacity: 1, scale: 1, y: '0%' },
        hidden: { opacity: 0, scale: 0.9, y: '50%' },
      }}>
      <div className="wrapper">
        <Flags />
        <Tutorial />
        <Edit />
        <hr />
        <Copy imageRef={imageRef} />
        <DownloadButton imageRef={imageRef} />
      </div>
    </Container>
  )
})

const Container = styled(motion.div)`
  height: 0;
  display: flex;
  align-items: end;
  .wrapper {
    display: flex;
    flex-direction: row;
    gap: 4px;
    padding: 4px;
    background: rgba(40, 44, 52, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 8px;
    margin-bottom: 4vh;
    hr {
      width: 1px;
      border: none;
      background: rgba(255, 255, 255, 0.1);
      margin: 6px -2px;
    }
    button {
      height: 44px;
      min-width: 60px;
      svg {
        opacity: 0.5;
      }
      > .flip-icon-containter {
        display: grid;
        > svg {
          grid-area: 1 / 1;
        }
      }
      &:hover svg {
        opacity: 1;
      }
    }
    svg {
      height: 18px;
      stroke-width: 1.5px;
    }
  }
`
