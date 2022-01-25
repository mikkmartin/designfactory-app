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
        <Button onClick={handleCopy}>
          <Copy />
        </Button>
        <span className="purple">{'<meta property'}</span>
        <span className="white">=</span>
        <span className="green">"og:image" </span>
        <span className="purple">content</span>
        <span className="white">=</span>
        <span className="green">"{url}”</span>
        <span className="purple">{`>`}</span>
        <span className="gray">{` // Open Graph / Facebook`}</span>
        <br />
        <span className="purple">{'<meta property'}</span>
        <span className="white">=</span>
        <span className="green">"twitter:image" </span>
        <span className="purple">content</span>
        <span className="white">=</span>
        <span className="green">"{url}”</span>
        <span className="purple">{`>`}</span>
        <span className="gray">{` // Twitter`}</span>
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
  padding: 12px 16px;
  background: #1a1e25;
  border-radius: 4px;
  overflow: auto;
  position: relative;
  > code button {
    position: absolute;
    right: 3px;
    top: 3px;
    width: 32px;
    height: 32px;
    border-radius: 2px;
    background: rgba(40, 44, 52, 0.6);
    svg {
      width: 14px;
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
