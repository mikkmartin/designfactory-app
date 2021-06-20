import { Document } from '@react-pdf/renderer'
import { Canvas, FileResponse, Frame, Component } from '@mikkmartin/figma-js'
import { Page } from './Elements/Page'
import { useTemplate } from '../Template/TemplateContext'
import ReactPDF from '@react-pdf/renderer'
import { getTemplate } from 'data/figma'
import { defaults } from 'static/invoice'
import { TemplateProvider } from '../Template/TemplateContext'
import { TransformElementsProvider } from '../Pdf/TransformContext'
import { fillText, fillListText } from './Invoice/fillText'
import { registerFonts } from './registerFonts'
import { conditionalRender } from './Invoice/conditionalRender'

export const Invoice = () => {
  const { template, setComponents, onRender, data } = useTemplate()
  const { components, frames } = getFrames(template)
  setComponents(components)

  return (
    <TransformElementsProvider
      data={{ ...defaults, ...data }}
      shouldRender={conditionalRender}
      fillTextFunction={fillText}
      fillListTextFunctions={fillListText}>
      <Document onRender={onRender}>
        <Page node={frames[0]} />
      </Document>
    </TransformElementsProvider>
  )
}

export async function streamDocument({ data }) {
  const template = await getTemplate(data.template || defaults.template)
  const { frames, components } = getFrames(template)
  const fontFamilies = registerFonts(data.fonts)

  return ReactPDF.renderToStream(
    <TemplateProvider
      template={template}
      data={data}
      fontFamilies={fontFamilies}
      components={components}>
      <TransformElementsProvider
        data={data}
        shouldRender={conditionalRender}
        fillTextFunction={fillText}
        fillListTextFunctions={fillListText}>
        <Document>
          <Page node={frames[0]} />
        </Document>
      </TransformElementsProvider>
    </TemplateProvider>
  )
}

const getFrames = (
  template: FileResponse
): {
  frames: Frame[]
  components: Component[]
} => {
  const canvas = template.document.children.find(child => child.type === 'CANVAS') as Canvas
  return {
    frames: canvas.children.filter(
      node => node.visible !== false && node.type === 'FRAME'
    ) as Frame[],
    components: canvas.children.filter(node => node.type === 'COMPONENT') as Component[],
  }
}
