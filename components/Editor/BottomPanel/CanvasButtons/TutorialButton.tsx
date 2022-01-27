import { Button, Tooltip, Popover } from 'components/ui'
import { Info, Close } from 'components/icons'
import { store } from 'data'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { useLocalStorage } from 'react-use'
import { useEffect } from 'react'
import { useRendersCount } from 'react-use'

export const TutorialButton = observer(() => {
  const [isOpen, setOpen] = useLocalStorage('df:tutorialTooltipIsOpen', true)
  const { toggleTutorialPanel, settings } = store.ui
  const renderCount = useRendersCount()

  useEffect(() => {
    if (renderCount === 1) settings.setTutorialToolTip(isOpen)
    else setOpen(settings.showTutorialToolTip)
  }, [settings.showTutorialToolTip])

  const handleOpen = () => {
    setOpen(false)
    toggleTutorialPanel()
  }

  return (
    <Popover.Popover open={isOpen}>
      <Tooltip.Root disabled={isOpen}>
        <Tooltip.Trigger>
          <Popover.Anchor>
            <Button onClick={handleOpen}>
              <Info strokeWidth="1" />
            </Button>
          </Popover.Anchor>
        </Tooltip.Trigger>
        <Tooltip.Content>How to use</Tooltip.Content>
      </Tooltip.Root>
      <Content sideOffset={0} arrow={{ offset: 25 }}>
        <Button onClick={handleOpen}>How to use it on my site?</Button>
        <Button className="close" small onClick={() => setOpen(false)}>
          <Close />
        </Button>
      </Content>
    </Popover.Popover>
  )
})

const Content = styled(Popover.Content)`
  display: flex;
  justify-content: space-between;
  width: 280px;
  align-items: center;
  > button:first-child {
    padding: 16px;
    width: 100%;
    justify-content: flex-start;
    text-transform: initial;
    border-radius: 8px;
  }
  button.close {
    position: absolute;
    right: 0;
    height: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 0 8px 8px 0;
  }
`
