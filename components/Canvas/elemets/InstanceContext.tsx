import { createContext, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { store } from 'data'

const Context = createContext(null)

export const InstanceProvider = observer<any>(({ containerKey, nth, children }) => {
  const { data, setData } = store.editorStore

  function setText(obj) {
    const [key, val] = Object.entries(obj)[0]

    setData(data => {
      const oldvalue = data[containerKey][nth][key]
      const formatedValue = typeof oldvalue === 'number' ? parseFloat(val as string) : val
      const newArray = [...data[containerKey]]
      newArray[nth] = { ...data[containerKey][nth], [key]: formatedValue }
      return { ...data, [containerKey]: newArray }
    })
  }
  return (
    <Context.Provider value={{ data: data[containerKey][nth], setText }}>
      {children}
    </Context.Provider>
  )
})

export const useInstance = () => useContext(Context)
