export const Svg = ({ style, geometry }) => {
  return (
    <svg style={style}>
      {geometry.map(g => (
        <path d={g.path} />
      ))}
    </svg>
  )
}
