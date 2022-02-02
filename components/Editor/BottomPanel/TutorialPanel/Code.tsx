import { useRef } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { store } from 'data'
import { Button } from 'components/ui'
import { Copy } from 'components/icons'

export const Code = observer(() => {
  const url = store.ui.downloadUrl
  const codeRef = useRef<HTMLElement>(null)

  const handleCopy = () => {
    if (!codeRef.current) return
    const text = codeRef.current.innerText
    navigator.clipboard.writeText(text)
  }

  return (
    <Container>
      <code ref={codeRef}>
        <span className="purple">{'<meta property'}</span>
        <span className="white">=</span>
        <span className="green">"og:image" </span>
        <span className="purple">content</span>
        <span className="white">=</span>
        <span className="green">"{url}"</span>
        <span className="purple">{`/>`}</span>
        <br />
        <span className="purple">{'<meta property'}</span>
        <span className="white">=</span>
        <span className="green">"twitter:card" </span>
        <span className="purple">content</span>
        <span className="white">=</span>
        <span className="green">"summary_large_image"</span>
        <span className="purple">{`/>`}</span>
      </code>
      <Button small onClick={handleCopy}>
        <Copy />
      </Button>
    </Container>
  )
})

const Container = styled.pre`
  background: #1a1e25;
  border-radius: 4px;
  display: grid;
  code {
    padding: 12px 48px 12px 16px;
    grid-area: 1 / 1;
    overflow: auto;
  }
  button {
    margin: 4px;
    grid-area: 1 / 1;
    place-self: start end;
    border-radius: 2px;
    background: rgba(40, 44, 52, 0.6);
    backdrop-filter: blur(20px);
    svg {
      opacity: 0.5;
    }
    &:hover svg {
      opacity: 1;
    }
  }
  line-height: 130%;
  .gray {
    color: gray;
  }
  .purple {
    color: #c594c5;
  }
  .white {
    color: #ffffff;
  }
  .green {
    color: #99c794;
  }
`
