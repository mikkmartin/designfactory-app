import { observer } from 'mobx-react-lite'
import styled, { css } from 'styled-components'
import { FigmaLogo, More } from 'components/Icons'
import { store } from 'data'
import { FC } from 'react'

type Props = {
  slug: string
  title: string
  thumbnail: string
  selected: boolean
  loading: boolean
}

export const TemplateItem: FC<Props> = observer(({ slug, title, selected, loading, thumbnail }) => {
  const { templateHovered, templateBlurred } = store.editorStore

  const handleMore = ev => {
    ev.stopPropagation()
    ev.preventDefault()
  }
  return (
    <Container
      selected={selected}
      onMouseEnter={() => templateHovered(slug)}
      onMouseLeave={templateBlurred}>
      <li>
        <div className="overlay">
          <div className="header">
            <FigmaLogo />
            {loading && 'Loading...'}
            <button onClick={handleMore}>
              <More />
            </button>
          </div>
          <h3>{title}</h3>
        </div>
        {thumbnail && <img src={thumbnail} alt={title} />}
      </li>
    </Container>
  )
})

const Container = styled.a<{ selected: boolean }>`
  padding: 4px 0;
  cursor: pointer;
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
      display: none;
      padding: 14px;
    }
    .overlay {
      position: absolute;
      inset: 0;
      background-color: #282c34b5;
      backdrop-filter: blur(10px);
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
          margin: -8px;
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
  &:hover {
    li .overlay {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    img {
      opacity: 1;
    }
  }
`

const selected = css`
  outline-offset: 2px;
  outline: 1px solid rgba(255, 255, 255, 0.75);
`
