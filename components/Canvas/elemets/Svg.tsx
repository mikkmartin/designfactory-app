import { FC } from 'react'
import { BooleanNode } from '../parseTemplate/parseTemplate'

export const Svg: FC<Omit<BooleanNode, 'id' | 'type'>> = ({ style, fillGeometry }) => {
  return (
    <svg style={style}>
      {fillGeometry.map((g, i) => (
        <path key={i} d={g.path} />
      ))}
    </svg>
  )
}
