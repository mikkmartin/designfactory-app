import { Page as PDFPage } from '@react-pdf/renderer'
import { FC } from 'react'
import { ContainerProvider } from './ContainerContext'
import { Frame } from '@mikkmartin/figma-js'
import { renderElement } from './renderElement'
import { getColor } from './common'
import { useTransformElement } from '../TransformContext'

export const Page: FC<{ node: Frame }> = ({ node }) => {
  const { absoluteBoundingBox, fills } = node
  const { width, height } = absoluteBoundingBox
  const backgroundColor = getColor([...fills]).hex()
  const { shouldRender } = useTransformElement()

  return (
    <ContainerProvider frame={node}>
      <PDFPage size={{ width, height }} style={{ backgroundColor }}>
        {node.children && node.children.filter(shouldRender).map(renderElement)}
      </PDFPage>
    </ContainerProvider>
  )
}
