import { Info, Droplet, Thanks } from '../Icons'
import { Button } from '../Common/Button'
import { useDrawer } from './DrawerContext'

export const TabButton = ({ name }) => {
  const { panel, setPanel } = useDrawer()

  const icon = () => {
    switch (name) {
      case 'info':
        return <Info />
      case 'templates':
        return <Droplet />
      case 'donation':
        return <Thanks />
    }
  }

  const handleClick = () => {
    if (panel === name) setPanel(false)
    else setPanel(name)
  }

  const isSelected = panel === name
    || name === 'templates' && panel === 'addtemplate'
    || name === 'donation' && ['payment', 'subscription-cancel', 'thank you'].includes(panel as string)

  return (
    <Button onClick={handleClick} selected={isSelected}>
      {icon()}
    </Button>
  )
}