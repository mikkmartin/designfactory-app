import { renderElement } from './renderElement'
import { Page } from './elemets'
import { CanvasProvider } from './store/CanvasProvider'
import { parseTemplate } from './parseTemplate'
import { FileResponse } from '@mikkmartin/figma-js'
import type { TemplateStore } from 'data/stores/content/TemplateStore'
import { Fonts } from './Fonts'
import { observer } from 'mobx-react-lite'
import { useMemo } from 'react'


type Props = {
  editable?: boolean
  themeData: FileResponse
  inputData: TemplateStore['inputData']
}

export const Canvas = observer<Props>(({ editable = true, themeData, inputData }) => {
  const { nodes, componentSets, fonts } = useMemo(() => parseTemplate(themeData), [themeData])

  return (
    <CanvasProvider initialState={{ nodes, componentSets, disabledFields: [], inputData, editable }}>
      <Fonts fonts={fonts} />
      <Page>{nodes.map(renderElement)}</Page>
    </CanvasProvider>
  )
})
