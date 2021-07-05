import { FC } from 'react'
import { VectorNode } from '../parseTemplate/parseTemplate'

interface Props extends Omit<VectorNode, 'id' | 'type' | 'booleanOperation'> {
  booleanOperation?: string
}

export const Svg: FC<Props> = ({ style, fills, strokes }) => {
  return (
    <svg style={{ ...style, overflow: 'visible', minWidth: 1, minHeight: 1 }}>
      {strokes.paths.map(({ path }, i) => (
        <path key={'s' + i} d={path} fill={strokes.fill} />
      ))}
      {fills.paths.map(({ path }, i) => (
        <path fillRule="evenodd" key={'f' + i} d={path} fill={fills.fill} />
      ))}
    </svg>
  )
}
