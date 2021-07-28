export const Overlay = ({ id, highLights, shadows, displacementUrl }) => {
  return (
    <filter id={id}>
      <feImage
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        xlinkHref={displacementUrl}
        preserveAspectRatio="xMidYMid meet"
        crossOrigin="anonymous"
        result="image"
      />
      <feColorMatrix type="saturate" values="0" in="image" result="colormatrix" />
      <feComponentTransfer in="colormatrix" result="backs">
        <feFuncR type="gamma" {...shadows} offset="0" />
        <feFuncG type="gamma" {...shadows} offset="0" />
        <feFuncB type="gamma" {...shadows} offset="0" />
        <feFuncA type="gamma" {...shadows} offset="0" />
      </feComponentTransfer>

      <feComponentTransfer in="colormatrix" result="whites">
        <feFuncR type="gamma" {...highLights} offset="0" />
        <feFuncG type="gamma" {...highLights} offset="0" />
        <feFuncB type="gamma" {...highLights} offset="0" />
        <feFuncA type="gamma" {...highLights} offset="0" />
      </feComponentTransfer>

      <feBlend mode="multiply" in="SourceGraphic" in2="backs" result="blend" />
      <feBlend mode="screen" in="blend" in2="whites" result="blend" />
    </filter>
  )
}
