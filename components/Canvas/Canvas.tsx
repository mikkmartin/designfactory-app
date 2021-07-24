import { renderElement } from './renderElement'
import { Page } from './elemets'
import { CanvasProvider } from './model/CanvasModel'

export const Canvas = ({ nodes, disabledFields, componentSets, editable = true }) => {
  if (!nodes) return null
  const fontFamilies = []

  return (
    <CanvasProvider value={{ nodes, componentSets, disabledFields, editable }}>
      <Page>{nodes.map(renderElement)}</Page>
    </CanvasProvider>
  )
}
