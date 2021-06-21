import { CSSProperties } from 'react'

export const getPosition = ({ absoluteBoundingBox, ...rest }, parent): CSSProperties => {
  const { x, y, width, height } = absoluteBoundingBox

  let position: CSSProperties = {
    width,
    height,
  }

  if (rest.layoutMode) {
    console.log(rest)
    position = {
      ...position,
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: rest.itemSpacing,
    }
    if (rest.constraints.horizontal === 'LEFT') position = { ...position, left: x }
    else position = { ...position, right: parent.absoluteBoundingBox.width - width - x }
    if (rest.constraints.vertical === 'BOTTOM')
      position = { ...position, bottom: parent.absoluteBoundingBox.height - height - y }
    else position = { ...position, top: y }
  } else if (parent.layoutMode) {
    position = {
      ...position,
      height: 'unset',
    }
  } else {
    position = {
      top: y,
      left: x,
      position: 'absolute',
      ...position,
    }
  }

  return position
}
