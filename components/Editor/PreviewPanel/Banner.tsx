import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { Info } from 'components/Icons'
import { store } from 'data'

export const Banner = observer(() => {
  const { togglePreviewPanel } = store.editor
  return (
    <Container onClick={togglePreviewPanel}>
      <div className="banner">
        <Info strokeWidth="1" />
        <p>How to use it on my site?</p>
      </div>
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
    display: flex;
    align-items: center;
    gap: 8px;
    background: #282c34;
    border-radius: 3px;
    padding: 10px 16px;
    cursor: pointer;
    p {
      opacity: 0.5;
    }
    &:hover {
      background: #3e4c59;
      p {
        opacity: 1;
      }
    }
  }
`
