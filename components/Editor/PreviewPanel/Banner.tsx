import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { Info } from 'components/Icons'
import { store } from 'data'
import { Button } from 'components/Common'

export const Banner = observer(() => {
  const { togglePreviewPanel } = store.editor
  return (
    <Container onClick={togglePreviewPanel}>
      <Button className="banner">
        <Info strokeWidth="1" />
        <p>How to use it on my site?</p>
      </Button>
    </Container>
  )
})

const Container = styled.div`
  grid-area: preview;
  height: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  .banner {
    position: absolute;
    bottom: 0;
    bottom: 16px;
    gap: 12px;
    border-radius: 4px;
    height: 48px;
    padding: 8px 16px;
    cursor: pointer;
    background-color: rgba(40, 44, 52, 0.8);
    backdrop-filter: blur(20px);
    p {
      opacity: 0.5;
    }
    &:hover, &:focus {
      background-color: rgba(61, 67, 80, 0.8);
      p {
        transition: opacity 0.1s ease-out;
        opacity: 1;
      }
    }
  }
`
