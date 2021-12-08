import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { Info } from 'components/Icons'
import { store } from 'data'

export const Banner = observer(() => {
  const { togglePreviewPanel } = store.editor
  return (
    <Container onClick={togglePreviewPanel}>
      <div className="banner">
        <Info stroke-width="1" />
        <p>How to use it on my site?</p>
      </div>
    </Container>
  )
})

const Container = styled.div`
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  .banner {
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
