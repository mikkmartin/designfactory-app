export const Svg = ({ style, geometry }) => {
  return (
    <svg style={style}>
      {geometry.map((g, i) => (
        <path key={i} d={g.path} />
      ))}
    </svg>
  )
}
