import styled from 'styled-components'
import { Button, Input as InputBase, Loader } from 'components/ui'
import { Trigger, Content, Popover } from 'components/ui/Popover'
import { Plus, Close, FigmaLogo } from 'components/Icons'
import { useState, useRef, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { store } from 'data/stores_v2'
import { useRouter } from 'next/router'

export const NewTemplateItem = observer<any>(props => {
  const { addTheme, loadTheme, cancelAdd } = store.content.template
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const [loading, setLoading] = useState(false)
  const [figmaID, setFigmaID] = useState('')
  const [fileName, setFileName] = useState('')

  const handleChange = ev => {
    try {
      const { value } = ev.target
      if (value.length >= 22) {
        const [id] = ev.target.value.split('/file/')[1].split('/')
        if (id) loadPreview(id)
      }
    } catch (e) {}
  }

  const loadPreview = async id => {
    setLoading(true)
    setFigmaID(id)
    const { data } = await loadTheme(id)
    setFileName(data.file.name)
    setLoading(false)
  }

  const handleSubmit = async ev => {
    ev.preventDefault()
    setLoading(true)
    await addTheme(fileName).then(slug =>
      router.push(`/files/${slug}`, undefined, { shallow: true })
    )
    setIsOpen(false)
    setFigmaID('')
    setFileName('')
    setLoading(false)
  }

  useEffect(() => {
    if (isOpen) return
    setIsOpen(false)
    cancelAdd()
  }, [isOpen])

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <Trigger>
        <ButtonNew small {...props}>
          <Plus />
        </ButtonNew>
      </Trigger>
      <Content>
        <Container>
          <div className="header">
            {loading ? <Loader /> : <FigmaLogo />}
            <span>{loading ? 'Loading...' : 'Paste the Figma link'}</span>
            <Button onClick={() => setIsOpen(false)}>
              <Close />
            </Button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="inputs">
              <Input
                type="text"
                autoFocus
                disabled={loading && !Boolean(figmaID)}
                onChange={handleChange}
                placeholder="https://www.figma.com/file/QFHu9..."
              />
              {Boolean(fileName) && (
                <Input
                  type="text"
                  placeholder="Name..."
                  value={fileName}
                  onChange={ev => setFileName(ev.target.value)}
                />
              )}
            </div>
            <Button primary type="submit" disabled={!Boolean(figmaID) || loading}>
              Import
            </Button>
          </form>
        </Container>
      </Content>
    </Popover>
  )
})

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
  height: 100%;
  border-radius: 4px;
  min-width: 48px;
  svg {
    opacity: 0.5;
  }
  &:hover svg {
    opacity: 1;
  }
`
