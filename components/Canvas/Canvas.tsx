import { renderElement } from './renderElement'
import { Page } from './elemets'
import { CanvasProvider } from './store/CanvasProvider'
import { parseTemplate } from './parseTemplate'
import { ThemeStore } from 'data/stores_v2/content/ThemeStore'
import { Fonts } from './Fonts'
import { observer } from 'mobx-react-lite'
import { useMemo } from 'react'
import { Preview } from './Preview'

type Props = {
  editable?: boolean
  themeData: ThemeStore['data']
}

export const Canvas = observer<Props>(({ editable = true, themeData }) => {
  useMemo(() => {
    console.log('change schemas')
  }, [themeData?.document.id])

  if (!themeData) return null
  const { nodes, componentSets, fonts, schema, uiSchema } = parseTemplate(themeData)

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
