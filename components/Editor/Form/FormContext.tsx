import { createContext, useContext, FC } from 'react'
import { Props } from './Form'

interface Context extends Props {
  editing?: boolean
  value?: Object
  handleChange: (value: Object) => void
  handleUiSchemaChange: (value: Object) => void
}

const FormContext = createContext<Context | null>(null)

export const FormProvider: FC<Props> = ({ children, ...rest }) => {
  const handleChange = (value: Object) => {
    rest.onValueChange && rest.onValueChange(value)
  }

  const handleUiSchemaChange = (val) => {
    //console.log(val)
    //rest.onUiSchemaChange && rest.onUiSchemaChange(val)
  }

  return (
    <FormContext.Provider value={{ ...rest, handleChange, handleUiSchemaChange }}>
      {children}
    </FormContext.Provider>
  )
}

export const useForm = () => {
  const context = useContext(FormContext)
  if (!context) throw new Error('FormContext must be called from within the XContextProvider')
  return context
}
