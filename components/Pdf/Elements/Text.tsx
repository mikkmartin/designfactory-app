import { FC } from 'react'
import { Text as TextNode } from '@react-pdf/renderer'
import { Text as TextType } from '@mikkmartin/figma-js'
import { getLayout, getColor } from './common'

type AutoResize = "NONE" | "WIDTH_AND_HEIGHT" | "HEIGHT"

export const Text: FC<{ node: TextType, nth: number }> = ({ node, nth }) => {
  //@ts-ignore
  const autoResize: AutoResize = node.style.textAutoResize
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
  } = node.style

  return (
    <TextNode debug style={{
      ...layout,
      width: autoResize === 'WIDTH_AND_HEIGHT' ? 'auto' : width,
      height: autoResize === 'WIDTH_AND_HEIGHT' || autoResize === 'HEIGHT' ? 'auto' : height,
      textTransform: getTextCase(textCase),
      textAlign: getAlignMent(textAlignHorizontal),
      lineHeight: lineHeightPercent === 100 ? 'auto' : lineHeightPercent / 100 * 1.25,
      fontSize,
      fontWeight,
      //fontFamily: fontFamilies.find(family => family === style.fontFamily),
      letterSpacing: letterSpacing,
      color: getColor([...fills]),
      opacity: opacity || 1
    }}>
      {node.characters === 'LHV' ? 'Swedbank' : node.characters}
    </TextNode>
  )
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