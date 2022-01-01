import { FC, useState } from 'react'
import styled, { css } from 'styled-components'
import { useDrop, useDropArea } from 'react-use'
import { TextInput } from './TextInput'
import { Button } from '../Button'
import type { InputBase } from './Input'
import { Close } from 'components/Icons'

export interface Props extends InputBase {
  type: 'image'
  value?: string
  onChange?: (value: string | undefined) => void
}

export const ImageInput: FC<Props> = ({ value, onChange }) => {
  const [uri, setUri] = useState(value || '')
  const [fileName, setFileName] = useState('')
  const draggingState = useDrop()
  const hasValue = !!uri || !!fileName

  const handleFile = async (files: File[]) => {
    const file = files[0]
    const base64 = await getBase64(file)
    setUri(base64)
    onchange && onChange(base64)
    setFileName(file.name)
  }
  const [bond, state] = useDropArea({
    onFiles: handleFile,
    onUri: uri => {
      setUri(uri)
      onchange && onChange(uri)
    },
  })

  const handleClear = () => {
    setUri('')
    onchange && onChange(undefined)
    setFileName('')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (value.startsWith('http')) {
      setUri(value)
      onchange && onChange(value)
    }
  }

  return (
    <>
      <Container {...bond} dragging={draggingState.over} over={state.over} hasValue={hasValue}>
        {uri && (
          <div className="image">
            <img src={uri} />
            <Button onClick={handleClear}>
              <Close />
            </Button>
          </div>
        )}
        <TextInput
          type="text"
          placeholder="Image url..."
          onChange={handleInputChange}
          value={fileName || uri}
        />
      </Container>
      <pre>{JSON.stringify({ draggingState, state }, null, 2)}</pre>
    </>
  )
}

function getBase64(file): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = error => reject(error)
  })
}

interface StyleProps {
  dragging: boolean
  over: boolean
  hasValue: boolean
}

const Container = styled.div<StyleProps>`
  display: grid;
  grid-template-columns: 0.5fr 1.5fr;
  .image {
    grid-area: 1 / 1 / 2 / 2;
    position: relative;
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: var(--input-border-radius) 0 0 var(--input-border-radius);
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.5;
      filter: grayscale(100%);
      mix-blend-mode: screen;
    }
    button {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 0;
      opacity: 0;
      svg {
        width: 16px;
        stroke-width: 2px;
      }
      &:hover, &:focus-within {
        backdrop-filter: blur(4px) brightness(0.7);
        opacity: 1;
      }
    }
  }
  &:hover, &:focus-within {
    > .image img {
      opacity: 1;
    }
    > .image img {
      filter: none;
      mix-blend-mode: initial;
    }
  }
  input {
    text-overflow: ellipsis;
    ${p => p.hasValue && hasValue}
    ${props => props.dragging && dragging}
    ${props => props.over && over}
  }
  > *:last-child {
    grid-area: 1 / 1 / 1 / span 2;
  }
  transition: outline 0.2s ease-in-out;
`

const hasValue = css`
  padding-left: calc(25% + 12px);
`
const dragging = css`
  outline: 1px solid rgb(var(--highlight));
`
const over = css`
  background: rgba(var(--highlight), 0.2);
  .image {
    pointer-events: none;
  }
`
