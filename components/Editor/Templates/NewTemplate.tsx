import styled from 'styled-components'
import { Button, Input as InputBase, Dropdown, DropdownSelector } from 'components/Common'
import { Plus, Close, FigmaLogo } from 'components/Icons'
import { useState } from 'react'

export const NewTemplate = () => {
  const [set, setState] = useState<'new' | 'link' | 'select'>('new')
  const [pages, setPages] = useState(['Page 1', 'Page 2'])
  const [page, setPage] = useState(pages[0])
  const [frames, setFrames] = useState(['knowlagebase-library', 'two'])
  const [frame, setFrame] = useState(frames[0])

  const handleImport = (ev) => {
    ev.preventDefault()
    console.log('submit')
  }

  switch (set) {
    case 'new':
      return (
        <ButtonNew onClick={() => setState('link')}>
          <Plus />
        </ButtonNew>
      )
    case 'link':
      return (
        <Container>
          <div className="header">
            <FigmaLogo />
            <span>Paste the Figma link</span>
            <Button onClick={() => setState('new')}>
              <Close />
            </Button>
          </div>
          <form onSubmit={handleImport}>
            <Input type="text" placeholder="https://www.figma.com/file/PCnEW..." />
            <Button onClick={() => setState('select')}>Import</Button>
          </form>
        </Container>
      )
    case 'select':
      return (
        <Container>
          <div className="header">
            <FigmaLogo />
            <span>Import frame</span>
            <Button onClick={() => setState('new')}>
              <Close />
            </Button>
          </div>
          <form onSubmit={handleImport}>
            <Dropdown fullWidth options={pages}>
              <DropdownSelector>{page}</DropdownSelector>
            </Dropdown>
            <Dropdown fullWidth options={frames}>
              <DropdownSelector>{frame}</DropdownSelector>
            </Dropdown>
            <Button onClick={handleImport}>Import</Button>
          </form>
        </Container>
      )
  }
}

const Input = styled(InputBase)`
  height: 40px;
  input {
    font-size: 12px;
    padding-left: 12px;
  }
`

const Container = styled.div`
  background: #1a1e25;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 4px;
  gap: 4px;
  .header {
    display: grid;
    grid-template-columns: auto 1fr auto;
    place-items: center start;
    gap: 8px;
    > svg {
      margin-left: 6px;
    }
    span {
      opacity: 0.5;
    }
    button {
      width: 32px;
      height: 32px;
      border-radius: 2px;
      svg {
        width: 16px;
        opacity: 0.5;
      }
      :hover svg {
        opacity: 1;
      }
    }
  }
  form {
    display: contents;
    > button {
      height: 40px;
      background: rgba(255, 255, 255, 0.1);
      width: 100%;
      &:hover {
        background: rgba(255, 255, 255, 0.15);
        svg {
          opacity: 1;
        }
      }
    }
  }
`

const ButtonNew = styled(Button)`
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  svg {
    width: 18px;
    opacity: 0.5;
  }
  &:hover svg {
    opacity: 1;
  }
`
