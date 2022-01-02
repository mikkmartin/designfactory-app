import { JSONSchema7Object } from 'json-schema'
import { withTheme } from '@rjsf/core'
import { ObjectField } from './Fields/ObjectField'
import { ArrayField } from './Fields/ArrayField'
import { store } from 'data'
import { Input, Dropdown, DropdownSelector } from 'components/Common'
import { observer } from 'mobx-react-lite'
import { FieldContainer } from './Fields/FieldContainer'
import { FormProvider } from './FormContext'

export interface Props {
  value: Object
  schema: JSONSchema7Object
  onValueChange?: (value: any) => void
}

const FormBase = withTheme({
  widgets: {
    TextWidget: ({ onChange, value, label }) => (
      <Input type="text" id={label} onChange={ev => onChange(ev.target.value)} value={value} />
    ),
    SelectWidget: ({ value, onChange, options }) => {
      return (
        <Dropdown fullWidth onChange={onChange} options={options.enumOptions}>
          <DropdownSelector>{value}</DropdownSelector>
        </Dropdown>
      )
    },
    'image-picker': props => (
      <Input type="image" value={props.value} onValueChange={props.onChange} {...props} />
    ),
  },
})

export const Form = observer<Props>(props => {
  return (
    <FormProvider {...props}>
      <FormBase
        formData={props.value}
        ObjectFieldTemplate={ObjectField}
        ArrayFieldTemplate={ArrayField}
        FieldTemplate={FieldContainer}
        onChange={({ formData }) => props.onValueChange(formData)}
        uiSchema={store.file.uiSchema}
        schema={props.schema}
        children={<></>}
      />
    </FormProvider>
  )
})
