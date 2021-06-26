import { FC } from 'react'
import { Text as TextNode } from '@react-pdf/renderer'
import { Text as TextType, AutoResize } from '@mikkmartin/figma-js'
import { getLayout, getColor } from './common'
import { useContainer } from './ContainerContext'
import { useTransformElement } from '../TransformContext'
import { useTemplate } from '../../Canvas/TemplateContext'

export const Text: FC<{ node: TextType; nth: number }> = ({ node, nth }) => {
  const { fontFamilies } = useTemplate()
  const { layoutMode, counterAxisAlignItems } = useContainer()
  const { fillText } = useTransformElement()
  const autoResize = node.style.textAutoResize
  const { width, height, ...layout } = getLayout(node, nth)
  const { fills, opacity } = node
  const {
    textCase,
    textAlignHorizontal,
    fontFamily,
    lineHeightPercent,
    fontSize,
    fontWeight,
    letterSpacing,
    paragraphIndent,
  } = node.style

  return (
    <TextNode
      style={{
        ...layout,
        marginLeft: autoIndent(
          fontSize,
          textAlignHorizontal,
          counterAxisAlignItems,
          paragraphIndent
        ),
        width: getWidth(layoutMode, autoResize, width),
        height: getHeight(autoResize, height),
        textTransform: getTextCase(textCase),
        textAlign: getAlignMent(textAlignHorizontal),
        lineHeight: lineHeightPercent === 100 ? 'auto' : (lineHeightPercent / 100) * 1.25,
        fontSize,
        fontWeight,
        fontFamily: fontFamilies.find(family => family === fontFamily),
        letterSpacing: letterSpacing,
        color: getColor(fills).hex(),
        opacity: opacity || 1,
      }}>
      {fillText(node)}
    </TextNode>
  )
}

const autoIndent = (fontSize, alignment, counterAxisAlignItems, paragraphIndent) =>
  alignment === 'LEFT' &&
  counterAxisAlignItems !== 'MAX' &&
  counterAxisAlignItems !== 'CENTER' &&
  !Boolean(paragraphIndent) &&
  fontSize > 20
    ? fontSize * -0.075
    : 0

const getWidth = (layoutMode, autoResize: AutoResize, width) => {
  if (Boolean(layoutMode) && autoResize === 'WIDTH_AND_HEIGHT') return 'auto'
  else return width
}

const getHeight = (autoResize: AutoResize, height) => {
  switch (autoResize) {
    case 'WIDTH_AND_HEIGHT':
    case 'HEIGHT':
      return 'auto'
    default:
      return height
  }
}

type TextCase = 'UPPER' | 'LOWER' | 'TITLE'
const getTextCase = (type: TextCase) => {
  switch (type) {
    case 'UPPER':
      return 'uppercase'
    case 'LOWER':
      return 'lowercase'
    case 'TITLE':
      return 'capitalize'
  }
}

const getAlignMent = (string: string) => {
  switch (string) {
    case 'RIGHT':
      return 'right'
    case 'LEFT':
      return 'left'
    case 'CENTER':
      return 'center'
    default:
      return 'left'
  }
}
