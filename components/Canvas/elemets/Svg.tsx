import { FC } from 'react'
import { BooleanNode } from '../parseTemplate/parseTemplate'

interface Props extends Omit<BooleanNode, 'id' | 'type' | 'booleanOperation'> {
  booleanOperation?: string
}

export const Svg: FC<Props> = ({ style, fillGeometry }) => {
  return (
    <svg style={style}>
      {fillGeometry.map((g, i) => (
        <path key={i} d={g.path} />
      ))}
    </svg>
  )
}
