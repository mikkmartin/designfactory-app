import styled from 'styled-components'
import { Button, Input as InputBase, Loader } from 'components/ui'
import { Trigger, Content, Popover } from 'components/ui/Popover'
import { Plus, Close, FigmaLogo } from 'components/Icons'
import { useState, useRef } from 'react'
import { store } from 'data'

export const NewTemplate = () => {
  const ref = useRef<HTMLInputElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [hasInput, setHasInput] = useState(false)

  //const [pages, setPages] = useState(['Page 1', 'Page 2'])
  //const [page, setPage] = useState(pages[0])
  //const [frames, setFrames] = useState(['knowlagebase-library', 'two'])
  //const [frame, setFrame] = useState(frames[0])

  const handleChange = () => {
    if (ref.current.value.length >= 22) {
      setHasInput(true)
      //setLoading(true)
    } else {
      setHasInput(false)
    }
  }

  const handleImport = async ev => {
    ev.preventDefault()
    const str = ref.current.value
    const [id] = str.split('/file/')[1].split('/')
    setLoading(true)
    const { error } = await store.pages.addTempTemplate(id, { type: store.file.type })
    if (!error) {
      setLoading(false)
      setIsOpen(false)
      setHasInput(false)
    } else {
      console.error(error)
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <Trigger>
        <ButtonNew>
          <Plus />
        </ButtonNew>
      </Trigger>
      <Content>
        <Container>
          <div className="header">
            {loading ? <Loader /> : <FigmaLogo />}
            <span>{loading ? 'Loading...' : 'Paste the Figma link'}</span>
            <Button>
              <Close />
            </Button>
          </div>
          <form onSubmit={handleImport}>
            <div className="inputs">
              <Input
                autoFocus
                disabled={loading}
                ref={ref}
                onChange={handleChange}
                type="text"
                placeholder="https://www.figma.com/file/QFHu9..."
              />
              {/*
                  <Dropdown fullWidth options={pages}>
                    <DropdownSelector>{page}</DropdownSelector>
                  </Dropdown>
                  <Dropdown fullWidth options={frames}>
                    <DropdownSelector>{frame}</DropdownSelector>
                  </Dropdown>
              */}
            </div>
            <Button primary disabled={!hasInput || loading} onClick={handleImport}>
              Import
            </Button>
          </form>
        </Container>
      </Content>
    </Popover>
  )
}

const Input = styled(InputBase)`
  height: 40px;
  input {
    font-size: 12px;
    padding-left: 12px;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-radius: 4px;
  overflow: hidden;
  .header {
    display: grid;
    grid-template-columns: auto 1fr auto;
    place-items: center start;
    gap: 8px;
    padding: 8px 8px 4px 8px;
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
    .inputs {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 0 8px 4px;
    }
    > button {
      height: 48px;
      width: 100%;
      &:hover {
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
  border-radius: 6px;
  :focus-visible {
    border-radius: 6px;
  }
  svg {
    width: 18px;
    opacity: 0.5;
  }
  &:hover svg {
    opacity: 1;
  }
`
