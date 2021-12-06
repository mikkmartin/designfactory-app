import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { store } from 'data'
import { Close } from 'components/Icons'
import { Button } from 'components/Common'
import { Image } from './Image'
import { Code } from './Code'

export const PreviewPanel = observer(() => {
  return (
    <Container>
      <div className="content">
        <h4>How to use it on your site?</h4>
        <p>
          You can download the image with the blue button on top, or you can embed the code below to
          generate it on-demand for every page on your site dynamically:
        </p>
      </div>
      <Image />
      <Code/>
      <Button><Close/></Button>
    </Container>
  )
})

const Container = styled.div`
  background: rgba(40, 44, 52, 0.6);
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto 54px;
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
      opacity: .5;
      max-width: 700px;
    }
  }
  img {
    grid-area: image;
  }
  pre {
    grid-area: code;
  }
  button {
    grid-area: close;
    margin-top: -30px;
    margin-left: -4px;
  }
`
