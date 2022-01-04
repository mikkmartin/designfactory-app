import { Dropdown } from 'components/ui/Dropdown'
import { FigmaLogo, More } from 'components/Icons'
import { store } from 'data'
import { observer } from 'mobx-react-lite'
import { FC, useState } from 'react'
import styled, { css } from 'styled-components'
import Link from 'next/link'
import { Button, buttonStyles } from 'components/ui/Button'
import { toJS } from 'mobx'

type Props = {
  slug: string
  title: string
  thumbnail: string
  selected: boolean
  loading: boolean
}

/*
const getSize = (template): { width: number; height: number } => {
  const { width, height } = template.document.children[0].children.find(
    child => child.type === 'FRAME'
  ).absoluteBoundingBox
  return { width, height }
}
*/

const getSize = (_): { width: number; height: number } => ({ width: 16, height: 9 })

export const TemplateItem: FC<Props> = observer(({ slug, title, selected, loading, thumbnail }) => {
  const { templateHovered, templateBlurred } = store.editor
  const { width, height } = getSize(store.file.template)
  const [isFocused, setIsFocused] = useState(false)
  const disabled = true
  const options = [
    { value: 'Duplicate' },
    { value: 'Open in Figma' },
    { value: 'Remove', disabled },
  ]

  const handleOpenChange = focus => {
    if (focus) setIsFocused(focus)
    else setTimeout(() => setIsFocused(focus), 200)
  }

  return (
    <Container
      style={{ aspectRatio: `${width} / ${height}` }}
      selected={selected}
      focused={isFocused}
      className={isFocused && 'focused'}>
      {thumbnail && (
        <img style={{ aspectRatio: `${width} / ${height}` }} src={thumbnail} alt={title} />
      )}

      <Link href={slug}>
        <Button onMouseEnter={() => templateHovered(slug)} onMouseLeave={templateBlurred}></Button>
      </Link>

      <div className="overlay">
        <FigmaLogo />
        <div className="buttons">
          <button className="edit">Edit</button>
          <Dropdown onChange={console.log} onOpenChange={handleOpenChange} options={options}>
            <button>
              <More />
            </button>
          </Dropdown>
        </div>
        <h3>{title}</h3>
      </div>
    </Container>
  )
})

const Container = styled.div<{ selected: boolean; focused: boolean }>`
  display: grid;
  position: relative;
  border-radius: 6px;
  > * {
    grid-area: 1 / 1;
  }
  img {
    display: block;
    border-radius: 6px;
    width: 100%;
    height: auto;
    opacity: 0.5;
    ${p =>
      p.selected &&
      css`
        opacity: 1;
      `}
  }
  > button {
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 6px !important;
    box-shadow: unset !important;
  }
  &.focused,
  :focus-within,
  &:hover {
    .overlay {
      opacity: 1;
    }
  }
  .overlay {
    opacity: 0;
    padding: 12px 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    backdrop-filter: blur(20px);
    background-color: rgba(89, 93, 102, 0.5);
    pointer-events: none;
    border-radius: 6px;
    overflow: hidden;
    svg {
      margin-left: -3px;
      width: 20px;
      height: auto;
    }
    .buttons {
      position: absolute;
      top: 6px;
      right: 6px;
      display: flex;
      height: 28px;
      border-radius: 2px;
      pointer-events: auto;
      background: rgba(100, 100, 100, 0.35);
      //outline: 1px solid rgba(255, 255, 255, 0.1);
      &:hover,
      :focus-within {
        background: rgba(150, 150, 150, 0.35);
      }
      button {
        height: 100%;
        background: none;
        color: currentColor;
        border: none;
        cursor: pointer;
        font-family: inherit;
        font-size: 10px;
        :focus {
          background: rgba(255, 255, 255, 0.1);
          outline: 1px solid rgb(var(--highlight));
        }
      }
      > button {
        padding: 4px 8px;
        :focus {
          border-radius: 2px 0 0 2px;
        }
      }
      > div > button {
        width: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        :focus {
          border-radius: 0 2px 2px 0;
        }
        svg {
          height: 16px;
        }
        &:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      }
    }
  }
  h3 {
    font-weight: 200;
  }
  ${props => props.selected && selected}
`

const selected = css`
  outline: 1px solid white;
  outline-offset: -2px;
`
