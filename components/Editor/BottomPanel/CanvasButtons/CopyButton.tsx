import { Copy, ExternalLink } from 'components/icons'
import { useDebounce, useKeyPressEvent } from 'react-use'
import { store } from 'data'
import { Button, Tooltip } from 'components/ui'
import { useState } from 'react'
import { observer } from 'mobx-react-lite'

export const CopyButton = observer<{ imageRef: { current: HTMLImageElement } }>(({ imageRef }) => {
  const url = store.ui.downloadUrl
  const [metaKeyDown, setMetaKeyDown] = useState(false)

  const preloadImage = () => {
    const img = new Image()
    img.src = url
    imageRef.current = img
  }
  useKeyPressEvent(
    'Meta',
    () => setMetaKeyDown(true),
    () => setMetaKeyDown(false)
  )
  useDebounce(preloadImage, 500, [url])

  const handleCopy = () => {
    if (metaKeyDown) setTimeout(() => window.open(url, '_blank'))
    else navigator.clipboard.writeText(url)
  }

  return (
    <Tooltip.Root>
      <Tooltip.Trigger>
        <Button onClick={handleCopy}>
          <div className="flip-icon-containter">{metaKeyDown ? <ExternalLink /> : <Copy />}</div>
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Content>
        Copy link
        <br />
        <span>⌘ - new tab</span>
      </Tooltip.Content>
    </Tooltip.Root>
  )
})
