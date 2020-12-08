import { Info, Droplet } from '../../Icons'
import { Button } from '../Button'
import { useDrawer } from "./DrawerContext";

export const TabButton = ({ name }) => {
  const { panel, setPanel } = useDrawer()

  const icon = () => {
    switch (name) {
      case 'info':
        return <Info />
      case 'templates':
        return <Droplet />
    }
  }

  const handleClick = () => {
    if (panel === name) setPanel(false)
    else setPanel(name)
  }

  const isSelected = panel === name || name === 'templates' && panel === 'addtemplate'

  return (
    <Button onClick={handleClick} selected={isSelected}>
      {icon()}
    </Button>
  )
}