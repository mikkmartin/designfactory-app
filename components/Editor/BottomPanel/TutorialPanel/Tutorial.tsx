import { observer } from 'mobx-react-lite'
import { Close } from 'components/icons'
import styled from 'styled-components'
import { Button } from 'components/ui'
import { Image } from './Image'
import { Code } from './Code'
import { store } from 'data'

export const TutorialPanel = observer(() => {
  const { size } = store.content.template.theme
  const { toggleTutorialPanel } = store.ui
  const isPortrait = size.width <= size.height
  console.log({ size, isPortrait })
  return (
    <Container isPortrait={isPortrait}>
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

const portrait = "'code image close'"
const landscape = "'code code close'"
const Container = styled.div<{ isPortrait: boolean }>`
  background: rgba(40, 44, 52, 0.6);
  width: 100%;
  display: grid;
  grid-template-columns: 1fr minmax(auto, 140px) 40px;
  grid-template-rows: 1fr auto;
  gap: 8px 8px;
  grid-template-areas: 'content image close' ${p => (p.isPortrait ? portrait : landscape)};
  padding: 32px 0 24px 32px;
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
