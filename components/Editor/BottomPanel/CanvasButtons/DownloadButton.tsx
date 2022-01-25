import { Download } from 'components/icons'
import { Button as ButtonBase, Tooltip } from 'components/ui'
import { store } from 'data'
import { observer } from 'mobx-react-lite'
import { useRef } from 'react'
import styled from 'styled-components'

export const DownloadButton = observer<{ imageRef: { current: HTMLImageElement } }>(
  ({ imageRef }) => {
    const { template } = store.content
    const fileName = template.theme.slug

    const handleDownload = () => {
      const a = document.createElement('a')
      a.href = imageRef.current.src
      a.download = fileName + '.png'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
    return (
      <Tooltip.Root>
        <Tooltip.Trigger>
          <Button onClick={handleDownload}>
            <Download />
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>Download</Tooltip.Content>
      </Tooltip.Root>
    )
  }
)

const Button = styled(ButtonBase)`
  width: 80px;
  background: rgb(var(--highlight));
  svg {
    opacity: 1 !important;
    path {
      stroke-width: 2px;
    }
  }
  &:hover {
    background: #208cff !important;
  }
  &:active {
    background: #0063cc;
    svg {
      opacity: 0.5;
    }
  }
`
