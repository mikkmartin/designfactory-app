import { useEditor } from '../Editor'
import { defaults } from '../../static/invoice'
import styled from 'styled-components'
import { Info, Download } from '../Icons'

export const Header = () => {
  const { json } = useEditor()

  return (
    <Container>
      <h1>{json.fileName || defaults.fileName}</h1>
      <div className="buttons">
        <Button>
          <Info />
        </Button>
        <Button>
          <Download />
        </Button>
      </div>
    </Container>
  )
}

const Container = styled.div`
  height: 54px;
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 16px;
  h1 {
    font-size: 18px;
    font-weight: 300;
  }
  .buttons {
    display: flex;
    gap: 1px;
  }
`

const Button = styled.button`
  width: 56px;
  height: 56px;
  border: 0;
  color: white;
  background: rgba(255, 255, 255, 0.05);
  cursor: pointer;
  :hover {
    background: rgba(255, 255, 255, 0.1);
  }
  :active {
    background: var(--highlight);
  }
  outline: none;
`
