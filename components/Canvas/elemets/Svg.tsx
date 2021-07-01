import { FC } from 'react'
import { BooleanNode } from '../parseTemplate/parseTemplate'

interface Props extends Omit<BooleanNode, 'id' | 'type' | 'booleanOperation'> {
  booleanOperation?: string
}

export const Svg: FC<Props> = ({ style, fillGeometry, strokeGeometry }) => {
  return (
    <svg style={{...style, overflow: 'visible'}}>
      {fillGeometry.map((g, i) => (
        <path key={i} d={g.path} />
      ))}
      {strokeGeometry && strokeGeometry.map((g, i) => (
        <path key={i} d={g.path} />
      ))}
    </svg>
  )
}
