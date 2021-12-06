import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { store } from 'data'

export const Code = observer(() => {
  const url = store.editorStore.downloadUrl
  return (
    <Container>
      <code>
        <span className="purple">{'<meta property'}</span>
        <span className="white">=</span>
        <span className="green">"og-image" </span>
        <span className="purple">content</span>
        <span className="white">=</span>
        <span className="green">"{url}”</span>
        <span className="purple">{`>`}</span>
        <br />
        <span className="purple">{'<meta property'}</span>
        <span className="white">=</span>
        <span className="green">"twitter:card" </span>
        <span className="purple">content</span>
        <span className="white">=</span>
        <span className="green">"summary_large_image"</span>
        <span className="purple">{`>`}</span>
      </code>
    </Container>
  )
})

const Container = styled.pre`
  padding: 16px;
  background: #1a1e25;
  border-radius: 4px;
  overflow: auto;
  .purple {
    color: #c594c5;
  }
  .white {
    color: #99c794;
  }
  .green {
    color: #99c794;
  }
`
