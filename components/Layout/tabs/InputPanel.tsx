import styled from 'styled-components'
import { Input } from 'components/Common'
import { TextArea } from 'components/Common/TextArea'
import { Dropdown, DropdownSelector } from 'components/Common'
import { observer } from 'mobx-react-lite'
import { store } from 'data'
import { toJS } from 'mobx'
import { Tab, tabContentStyle } from './Tabs'

export const InputPanel = observer(() => {
  const properties = store.file.schema.properties
  const setData = store.editor.setData

  const handleDataChange = (obj: Object) =>
    Object.entries(obj).forEach(([key, value]) => {
      if (!Boolean(value)) {
        const newData = toJS(store.editor.data)
        delete newData[key]
        setData(newData)
      } else {
        setData(prev => ({ ...prev, ...obj }))
      }
    })

  return (
    <Container value="inputs">
      <h4>Link image generator</h4>
      <p>Automate link preview images with one line of code.</p>
      {properties &&
        Object.entries(properties).map(([key, obj]) => {
          if (obj.type !== 'string') return null
          const value = store.editor.data[key]
          switch (true) {
            case !!obj.enum:
              return (
                <Dropdown
                  label={key}
                  options={obj.enum}
                  onChange={v => handleDataChange({ [key]: v })}
                  fullWidth>
                  <DropdownSelector placeholder={obj.default}>{value}</DropdownSelector>
                </Dropdown>
              )
            case obj.default?.length > 20:
              return (
                <TextArea
                  label={key}
                  value={value}
                  placeholder={obj.default}
                  onChange={v => handleDataChange({ [key]: v })}
                />
              )
            case !!obj.default:
              return (
                <Input
                  label={key}
                  value={value}
                  autoComplete="off"
                  placeholder={obj.default}
                  onChange={ev => handleDataChange({ [key]: ev.target.value })}
                />
              )
            case obj.type === 'string' && !obj.default:
              return (
                <Input
                  label={key}
                  value={value}
                  autoComplete="off"
                  placeholder="Image url..."
                  onChange={ev => handleDataChange({ [key]: ev.target.value })}
                />
              )
          }
        })}
    </Container>
  )
})

const Container = styled(Tab)`
  ${tabContentStyle}
  h4 {
    margin-bottom: 8px;
    font-weight: normal;
  }
  p {
    margin-bottom: 16px;
    opacity: 0.5;
  }
`
