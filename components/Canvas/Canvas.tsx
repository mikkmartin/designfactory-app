import { renderElement } from './renderElement'
import { Page } from './elemets'
import { CanvasProvider } from './store/CanvasProvider'
import { parseTemplate } from './parseTemplate'
import { ThemeStore } from 'data/stores/content/ThemeStore'
import { Fonts } from './Fonts'
import { observer } from 'mobx-react-lite'
import { useMemo } from 'react'

type Props = {
  editable?: boolean
  themeData: ThemeStore['data']
}

export const Canvas = observer<Props>(({ editable = true, themeData }) => {
  const { nodes, componentSets, fonts } = useMemo(() => parseTemplate(themeData), [themeData])

  return (
    <CanvasProvider initialState={{ nodes, componentSets, disabledFields: [], editable }}>
      <Fonts fonts={fonts} />
      <Page>{nodes.map(renderElement)}</Page>
    </CanvasProvider>
  )
})
