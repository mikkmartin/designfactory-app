import { renderElement } from './renderElement'
import { Pages } from './Pages'
import { CanvasProvider, useCanvas } from './store/CanvasProvider'
import { FileResponse } from '@mikkmartin/figma-js'
import type { TemplateStore } from 'data/stores/content/TemplateStore'
import { observer } from 'mobx-react-lite'

export type Props = {
  editable?: boolean
  themeData: FileResponse
  inputData: TemplateStore['inputData']
  getImageUrl: (id: string) => string
}

export const Canvas = observer<Props>(props => {
  return (
    <CanvasProvider initialState={props}>
      <Pages />
      {/*<Fonts />
      */}
    </CanvasProvider>
  )
})