import { Page as PDFPage } from '@react-pdf/renderer'
import { FC } from 'react'
import { ContainerProvider } from './ContainerContext'
import { Frame } from 'figma-js'
import { renderElement } from './renderElement'
import { getColor } from './common'

export const Page: FC<{ node: Frame }> = ({ node }) => {
  const { absoluteBoundingBox, background } = node
  const { width, height } = absoluteBoundingBox
  const backgroundColor = getColor([...background])

  return (
    <ContainerProvider frame={node}>
      <PDFPage size={{ width, height }} style={{ backgroundColor }}>
        {node.children && node.children.map(renderElement)}
      </PDFPage>
    </ContainerProvider>
  )
}