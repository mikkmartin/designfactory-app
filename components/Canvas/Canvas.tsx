import { Pages } from './Pages'
import { FileResponse } from '@mikkmartin/figma-js'
import { observer } from 'mobx-react-lite'
import { Fonts } from './Fonts'
import { createContext, useContext, useMemo } from 'react'
import { CanvasStore } from './CanvasStore'

const RootStoreContext = createContext<CanvasStore>(null)
const CanvasProvider = RootStoreContext.Provider

export type Props = {
  editable?: boolean
  themeData: FileResponse
  inputData: Object
  getImageUrl: (id: string) => string
  getFontUrl: (fontFamily: string) => string
}

export const Canvas = observer<Props>(props => {
  const store = useMemo(() => new CanvasStore(props), [props.themeData])
  store.passInputData(props.inputData)

  return (
    <CanvasProvider value={store}>
      <Pages />
      <Fonts />
    </CanvasProvider>
  )
})

export function useCanvas() {
  const store = useContext(RootStoreContext)
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }
  return store
}
