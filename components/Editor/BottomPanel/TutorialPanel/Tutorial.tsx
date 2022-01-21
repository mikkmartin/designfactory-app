import { observer } from 'mobx-react-lite'
import { Close } from 'components/icons'
import styled from 'styled-components'
import { Button } from 'components/ui'
import { Image } from './Image'
import { Code } from './Code'
import { store } from 'data'

export const TutorialPanel = observer(() => {
  const { toggleTutorialPanel } = store.ui
  return (
    <Container>
      <div className="content">
        <h4>How to use it on your site?</h4>
        <p>
          You can download the image directly from the image thumnbail, or you can embed the code
          below to generate it on-demand for every page on your site:
        </p>
      </div>
      <Image />
      <Code />
      <Button onClick={toggleTutorialPanel}>
        <Close width="16" />
      </Button>
    </Container>
  )
})

const Container = styled.div`
  background: rgba(40, 44, 52, 0.6);
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto 40px;
  grid-template-rows: auto auto;
  gap: 8px 8px;
  grid-template-areas:
    'content image close'
    'code code close';
  padding: 32px 0 32px 32px;
  .content {
    grid-area: content;
    h4 {
      margin-bottom: 10px;
    }
    p {
      opacity: 0.5;
      max-width: 650px;
    }
  }
  > img {
    grid-area: image;
  }
  > pre {
    grid-area: code;
  }
  > button {
    grid-area: close;
    margin-top: -28px;
    margin-left: -4px;
    width: 40px;
    height: 40px;
    border-radius: 4px;
    svg {
      opacity: 0.5;
    }
    &:hover svg {
      opacity: 1;
    }
  }
`
