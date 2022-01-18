import { Dropdown } from 'components/ui/Dropdown'
import { FigmaLogo, More } from 'components/icons'
import { store } from 'data'
import { ThemeStore } from 'data/stores/content/ThemeStore'
import { observer } from 'mobx-react-lite'
import { FC, useState } from 'react'
import styled, { css } from 'styled-components'
import Link from 'next/link'
import { Button } from 'components/ui/Button'
import { useRouter } from 'next/router'

export const TemplateItem: FC<{ theme: ThemeStore }> = observer(({ theme }) => {
  const { deleteTheme, theme: currentTheme, setPreviewTheme } = store.content.template
  const { title, thumbnailUrl, slug, size, ownerID, figmaID } = theme
  const { width, height } = size

  const router = useRouter()
  const [isFocused, setIsFocused] = useState(false)
  const options = [
    { value: 'Duplicate' },
    { value: 'Open in Figma' },
    { value: 'Delete', disabled: ownerID === null },
  ]

  const handleDropdownSelection = (value: string) => {
    if (value === 'Duplicate') {
      openDesign()
    } else if (value === 'Open in Figma') {
      openDesign(false)
    } else if (value === 'Delete') {
      //setPreviewSlug(null)
      deleteTheme(slug, newSlug => router.replace(`/files/${newSlug}`, undefined, { shallow: true }))
    }
  }

  const handleOpenChange = focus => {
    if (focus) setIsFocused(focus)
    else setTimeout(() => setIsFocused(focus), 200)
  }

  const openDesign = (duplicate = true) => {
    const url = `https://www.figma.com/file/${figmaID}` + (duplicate ? '/duplicate' : '')
    window.open(url, '_blank').focus()
  }

  return (
    <Container
      style={{ aspectRatio: `${width} / ${height}` }}
      selected={currentTheme.slug === slug}
      onMouseEnter={() => setPreviewTheme(theme.slug)}
      onMouseLeave={() => setPreviewTheme(null)}
      focused={isFocused}
      className={isFocused && 'focused'}>
      {thumbnailUrl && (
        <img style={{ aspectRatio: `${width} / ${height}` }} src={thumbnailUrl} alt={title} />
      )}

      <Link key={slug} href={`/files/${slug}`} shallow={true}>
        <Button />
      </Link>

      <div className="overlay">
        <FigmaLogo />
        <div className="buttons">
          <Button small className="edit" onClick={() => openDesign()}>
            Edit
          </Button>
          <Dropdown
            onChange={handleDropdownSelection}
            onOpenChange={handleOpenChange}
            options={options}>
            <Button small>
              <More />
            </Button>
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
  width: 100%;
  height: 100%;
  border-radius: 4px;
  overflow: hidden;
  color: white;
  > * {
    grid-area: 1 / 1;
  }
  img {
    display: block;
    width: 100%;
    height: auto;
  }
  > button {
    width: 100%;
    height: 100%;
  }
  &.focused,
  :focus-within,
  &:hover {
    .overlay {
      transition: all 0.1s ease-in-out;
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
    background-color: rgba(75, 75, 75, 0.75);
    pointer-events: none;
    overflow: hidden;
    > svg {
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
      &:hover,
      :focus-within {
        background: rgba(150, 150, 150, 0.1);
      }
      button:last-child {
        height: 100%;
        width: 24px;
        padding: 0;
      }
    }
  }
  h3 {
    font-weight: 200;
    font-size: 15px;
  }
  ${props => props.selected && selected}
`

const selected = css`
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 1);
  &:hover {
    transition: box-shadow 0.1s ease-in-out;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.5);
  }
`
