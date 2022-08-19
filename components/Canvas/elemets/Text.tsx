import { useInstanceList } from './InstanceListContext'
import type { TextNode } from '../parseTemplate'
import { observer } from 'mobx-react-lite'
import { useCanvas } from '../Canvas'
import { useRef } from 'react'

const isAcceptedValue = v => ['string', 'number'].includes(typeof v)

//zip arrays together
const zip = (arr1, arr2) => {
  const zipped = []
  for (let i = 0; i < arr1.length; i++) {
    zipped.push(arr1[i])
    if (arr2[i]) zipped.push(arr2[i])
  }
  return zipped
}

const splittString = (str: string, overRides): { content: string; style?: any }[] => {
  const leftOvers = []
  const splittedStrings = overRides.map(({ from, to, style }, i) => {
    if (overRides[i + 1]) leftOvers.push({ content: str.slice(to, overRides[i + 1].from) })
    else if (str.length > to) leftOvers.push({ content: str.slice(to, str.length + 1) })
    return { content: str.slice(from, to), style }
  })
  return zip(splittedStrings, leftOvers)
}

export const Text = observer<TextNode>(({ style, content, name, overrides }) => {
  const global = useCanvas()
  const instance = useInstanceList()
  const source = instance ? instance : global
  const { inputData, setInputData } = source
  const isDefaultData = !Boolean(inputData[name])

  const fillText = (name: string): string => {
    const dataVal = inputData[name]
    if (dataVal && isAcceptedValue(dataVal)) return String(dataVal)
    return content
  }

  const lineClamp = style['-webkit-line-clamp'] ? { 'data-line-clamp': true } : {}
  if (style['-webkit-line-clamp']) console.log(lineClamp)

  return isDefaultData ? (
    <p style={style} {...lineClamp}>
      {Boolean(overrides.length)
        ? splittString(content, overrides).map(obj =>
            obj.style ? (
              <span style={{ ...obj.style, fontStyle: obj.style.italic ? 'italic' : 'none' }}>
                {obj.content}
              </span>
            ) : (
              obj.content
            )
          )
        : content}
    </p>
  ) : (
    <div style={style} dangerouslySetInnerHTML={{ __html: fillText(name) }}  {...lineClamp} />
  )
})
