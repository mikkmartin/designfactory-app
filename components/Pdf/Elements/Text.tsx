import { FC } from 'react'
import { Text as TextNode } from '@react-pdf/renderer'
import { Text as TextType } from '@mikkmartin/figma-js'
import { getLayout, getColor } from './common'
import { useContainer } from './ContainerContext'
import { useFillText } from '../FillTextContext'

type AutoResize = "NONE" | "WIDTH_AND_HEIGHT" | "HEIGHT"

export const Text: FC<{ node: TextType, nth: number }> = ({ node, nth }) => {
  const { layoutMode } = useContainer()
  const { fillText } = useFillText()
  //@ts-ignore
  const autoResize: AutoResize = node.style.textAutoResize
  const { width, height, ...layout } = getLayout(node, nth)
  const { fills, opacity } = node
  const {
    textCase,
    textAlignHorizontal,
    //fontFamily,
    lineHeightPercent,
    fontSize,
    fontWeight,
    letterSpacing,
  } = node.style

  if (node.name === 'title') {
    console.log({ name: node.name, fillText })
    console.log({ fillText: fillText(node) })
  }

  return (
    <TextNode style={{
      ...layout,
      width: getWidth(layoutMode, autoResize, width),
      height: getHeight(autoResize, height),
      textTransform: getTextCase(textCase),
      textAlign: getAlignMent(textAlignHorizontal),
      lineHeight: lineHeightPercent === 100 ? 'auto' : lineHeightPercent / 100 * 1.25,
      fontSize,
      fontWeight,
      //fontFamily: fontFamilies.find(family => family === style.fontFamily),
      letterSpacing: letterSpacing,
      color: getColor(fills).hex(),
      opacity: opacity || 1
    }}>
      {fillText(node)}
    </TextNode>
  )
}

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