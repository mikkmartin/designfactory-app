import { createContext, useContext, useState, FC } from 'react'
import { Props } from './Form'

interface Context extends Props {
  editing: boolean
  setEditing: (editing: boolean) => void
  value: Object
  handleChange: (value: Object) => void
}

const FormContext = createContext<Context | null>(null)

export const FormProvider: FC<Props> = ({ schema, onValueChange, children }) => {
  const [value, setValue] = useState({})
  const [editing, setEditing] = useState(false)

  const handleChange = (value: Object) => {
    setValue(value)
    onValueChange && onValueChange(value)
  }

  return (
    <FormContext.Provider value={{ editing, setEditing, schema, value, handleChange }}>
      {children}
    </FormContext.Provider>
  )
}

export const useForm = () => {
  const context = useContext(FormContext)
  if (!context) throw new Error('FormContext must be called from within the XContextProvider')
  return context
}
