import { Dropdown } from 'components/Common/Dropdown'
import { FigmaLogo, More } from 'components/Icons'
import { store } from 'data'
import { observer } from 'mobx-react-lite'
import { FC, useState } from 'react'
import styled, { css } from 'styled-components'
import Link from 'next/link'

type Props = {
  slug: string
  title: string
  thumbnail: string
  selected: boolean
  loading: boolean
}

export const TemplateItem: FC<Props> = observer(({ slug, title, selected, loading, thumbnail }) => {
  const { templateHovered, templateBlurred } = store.editorStore
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
    <Link href={slug}>
      <Container
        className={isFocused && 'focused'}
        selected={selected}
        onMouseEnter={() => templateHovered(slug)}
        onMouseLeave={templateBlurred}>
        <li>
          <div className="overlay">
            <div className="header">
              <FigmaLogo />
              {loading && 'Loading...'}
              <Dropdown onChange={console.log} onOpenChange={handleOpenChange} options={options}>
                <More />
              </Dropdown>
            </div>
            <h3>{title}</h3>
          </div>
          {thumbnail && <img src={thumbnail} alt={title} />}
        </li>
      </Container>
    </Link>
  )
})

const Container = styled.a<{ selected: boolean }>`
  padding: 4px 0;
  cursor: pointer;
  color: white;
  li {
    user-select: none;
    display: flex;
    flex-direction: column;
    width: 100%;
    aspect-ratio: 16 / 9;
    background: #00000075;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    .overlay {
      opacity: 0;
      padding: 12px 8px 12px 12px;
    }
    .overlay {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background-color: #353c5079;
      backdrop-filter: blur(30px);
      z-index: 2;
      > .header {
        display: flex;
        width: 100%;
        justify-content: space-between;
        > svg {
          margin-left: -4px;
        }
        button {
          width: 32px;
          height: 32px;
          margin-top: -6px;
          margin-right: -2px;
          outline: none;
          border: none;
          background: none;
          border-radius: 2px;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          &:hover {
            background: rgba(255, 255, 255, 0.1);
          }
          svg {
            width: 16px;
          }
        }
      }
    }
    &.new {
      aspect-ratio: 16 / 4;
      justify-content: center;
      align-items: center;
      &:hover {
        background: #ffffff22;
      }
    }
    img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      opacity: 0.5;
      z-index: 1;
    }
    ${props => props.selected && selected}
  }
  &:hover,
  &:active,
  &:focus,
  &.focused {
    li .overlay {
      opacity: 1;
    }
    img {
      opacity: 1;
    }
  }
`

const selected = css`
  outline: 2px solid var(--highlight);
`
