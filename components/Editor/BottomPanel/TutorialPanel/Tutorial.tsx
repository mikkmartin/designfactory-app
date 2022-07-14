import { observer } from 'mobx-react-lite'
import { Close } from 'components/icons'
import styled from '@emotion/styled'
import { Button } from 'components/ui'
import { Image } from './Image'
import { Code } from './Code'
import { store } from 'data'

export const TutorialPanel = observer(() => {
  const { size } = store.content.template.theme
  const { toggleTutorialPanel } = store.ui
  const isPortrait = size.width <= size.height

  return (
    <Container isPortrait={isPortrait}>
      <Code />
      <div className="content">
        <div className="text">
          <h4>How to use it on your site?</h4>
          <p>
            You can download the image directly from the image thumnbail below, or you can embed the
            code here to generate it on-demand for any page on your site.
          </p>
        </div>
        <Image />
      </div>
      <Button onClick={toggleTutorialPanel}>
        <Close width="16" />
      </Button>
    </Container>
  )
})

const Container = styled.div<{ isPortrait: boolean }>`
  background: rgba(40, 44, 52, 0.6);
  display: grid;
  grid-template-columns: 2fr 1.2fr 40px;
  grid-template-areas: 'code content close';
  width: 100%;
  padding: 8px;
  .content {
    padding: 32px 0;
    grid-area: content;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 16px;
    .text {
      h4 {
        margin-bottom: 10px;
      }
      p {
        opacity: 0.5;
      }
    }
  }
  > pre {
    grid-area: code;
  }
  > button {
    grid-area: close;
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
