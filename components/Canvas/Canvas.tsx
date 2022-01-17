import { renderElement } from './renderElement'
import { Page } from './elemets'
import { CanvasProvider } from './store/CanvasProvider'
import { parseTemplate } from './parseTemplate'
import { ThemeStore } from 'data/stores_v2/content/ThemeStore'
import { Fonts } from './Fonts'
import { observer } from 'mobx-react-lite'
import { useMemo } from 'react'
import { Preview } from './Preview'
import { store } from 'data/stores_v2'

type Props = {
  editable?: boolean
  themeData: ThemeStore['data']
}

export const Canvas = observer<Props>(({ editable = true, themeData }) => {
  const theme = useMemo(() => {
    if (!themeData) return
    const { schema, uiSchema, nodes, componentSets, fonts } = parseTemplate(themeData)
    store.content.template.theme.setEditorSchema(schema)
    store.content.template.theme.setUiSchema(uiSchema)
    console.log({ schema, uiSchema })
    return { nodes, componentSets, fonts }
  }, [themeData?.lastModified])

  if (!theme) return null
  const { nodes, componentSets, fonts } = theme

  return (
    <>
      <Fonts fonts={fonts} />
      <CanvasProvider initialState={{ nodes, componentSets, disabledFields: [], editable }}>
        <Page canvas={!editable}>
          {editable && <Preview />}
          {nodes.map(renderElement)}
        </Page>
      </CanvasProvider>
    </>
  )
})
