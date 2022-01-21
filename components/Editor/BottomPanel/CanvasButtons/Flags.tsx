import { Button, Dropdown } from 'components/ui'
import { Flag } from 'components/icons'
import { observer } from 'mobx-react-lite'
import { store } from 'data'
import { useLocalStorage } from 'react-use'
import { useEffect } from 'react'

export const Flags = observer(() => {
  const [showHiddenFlags, setFlagMenu] = useLocalStorage('df:showHiddenFlags', false)
  const { toggleTemplatePanel } = store.ui

  useEffect(() => {
    if (process.browser) window['toggleFlagMenu'] = () => setFlagMenu(!showHiddenFlags)
  }, [showHiddenFlags])

  if (!showHiddenFlags) return null

  const flags = [
    {
      value: 'toggle-template-panel',
      label: 'Show Template Panel',
    },
    {
      value: 'hide-flags',
      label: 'Hide flags button',
    },
  ]

  const handleChange = value => {
    if (value === 'toggle-template-panel') toggleTemplatePanel()
    if (value === 'hide-flags') setFlagMenu(false)
  }

  return (
    <Dropdown options={flags} onChange={handleChange}>
      <Button type="reset">
        <Flag style={{ width: 18 }} />
      </Button>
    </Dropdown>
  )
})
