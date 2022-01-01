import { withTheme } from '@rjsf/core'
import styled from 'styled-components'
import { useForm } from '../FormContext'
import { ObjectField } from './ObjectField'
import { ArrayField } from './ArrayField'
import { store } from 'data'
import { Input, Dropdown, DropdownSelector } from 'components/Common'
import { observer } from 'mobx-react-lite'

const Form = withTheme({
  widgets: {
    TextWidget: ({ onChange, value }) => (
      <Input type="text" onChange={ev => onChange(ev.target.value)} value={value} />
    ),
    SelectWidget: ({ value, onChange, options }) => {
      return (
        <Dropdown fullWidth onChange={onChange} options={options.enumOptions}>
          <DropdownSelector>{value}</DropdownSelector>
        </Dropdown>
      )
    },
    'image-picker': props => <Input type="image" value={props.value} onValueChange={props.onChange} {...props} />,
  },
})

export const Fields = observer(() => {
  const { value, schema, handleChange } = useForm()
  return (
    <Container
      formData={value}
      ObjectFieldTemplate={ObjectField}
      ArrayFieldTemplate={ArrayField}
      onChange={({ formData }) => handleChange(formData)}
      uiSchema={store.file.uiSchema}
      schema={schema}
      children={<></>}
    />
  )
})

const Container = styled(Form)``
