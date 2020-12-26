import { Page as PDFPage } from '@react-pdf/renderer'
import { FC } from 'react'
import { ContainerProvider } from './ContainerContext'
import { Frame } from 'figma-js'
import { renderElement } from './renderElement'
import { getStyle } from './common'

export const Page: FC<{ node: Frame }> = ({ node }) => {
  const { width, height } = node.absoluteBoundingBox
  const style = getStyle(node)

  return (
    <ContainerProvider frame={node}>
      <PDFPage size={{ width, height }} style={style}>
        {node.children && node.children.map(renderElement)}
      </PDFPage>
    </ContainerProvider>
  )
}