import { renderElement } from './renderElement'
import { Page } from './elemets'
import { CanvasProvider } from './store/CanvasProvider'
import { parseTemplate } from './parseTemplate'
import { store } from 'data'
import { Fonts } from './Fonts'
import { observer } from 'mobx-react-lite'

export const Canvas = observer<{ editable?: boolean }>(({ editable }) => {
  const { template } = store.editorStore
  const { nodes, componentSets, fonts } = parseTemplate(template)

  return (
    <>
      <Fonts fonts={fonts} />
      <CanvasProvider initialState={{ nodes, componentSets, disabledFields: [], editable }}>
        <Page canvas={!editable}>{nodes.map(renderElement)}</Page>
      </CanvasProvider>
    </>
  )
})
