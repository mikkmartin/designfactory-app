import { JSONSchema7Object } from 'json-schema'
import { withTheme, UiSchema } from '@rjsf/core'
import { ObjectField } from './Fields/ObjectField'
import { ArrayField } from './Fields/ArrayField'
import { Input, Dropdown, DropdownSelector, Toggle } from 'components/ui'
import { Select } from 'components/ui/Select'
import { observer } from 'mobx-react-lite'
import { FieldContainer } from './Fields/FieldContainer'
import { FormProvider } from './FormContext'
import { useState } from 'react'

export interface Props {
  value?: Object
  editing?: boolean
  schema: JSONSchema7Object
  uiSchema?: UiSchema
  onUiSchemaChange?: (value: any) => void
  onValueChange?: (value: any) => void
}

const FormBase = withTheme({
  widgets: {
    TextWidget: ({ onChange, value, label, placeholder }) => {
      return (
        <Input
          type="text"
          id={label}
          value={value}
          placeholder={placeholder}
          onChange={ev => onChange(ev.target.value)}
        />
      )
    },
    CheckboxWidget: ({ value, onChange }) => <Toggle value={value} onValueChange={onChange} />,
    SelectWidget: ({ value, onChange, options, placeholder }) => {
      const items = (options as any).enumOptions.map(({ value }) => value)
      const [selectedValue, setSelectedValue] = useState(value)

      const handleChange = val => {
        setSelectedValue(val)
        onChange(val)
      }

      return (
        <Select
          items={items}
          onValueChange={handleChange}
          onFocus={onChange}
          onBlur={() => onChange(selectedValue)}
          onEscapeKeyDown={() => onChange(selectedValue)}
        />
      )
    },
    'image-picker': ({ label, value, placeholder, onChange }) => (
      <Input
        type="image"
        id={label}
        value={value}
        placeholder={placeholder}
        onValueChange={onChange}
      />
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
        onChange={({ formData }) => props.onValueChange?.(formData)}
        uiSchema={props.uiSchema}
        schema={props.schema}
        children={<></>}
      />
    </FormProvider>
  )
})
