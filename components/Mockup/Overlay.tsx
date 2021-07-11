export const Overlay = ({ id }) => {
  return (
    <filter id={id}>
      <feImage
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        xlinkHref="/mockups/tshirt-white-front.png"
        preserveAspectRatio="xMidYMid meet"
        crossOrigin="anonymous"
        result="image"
      />
      <feColorMatrix type="saturate" values="0" in="image" result="colormatrix" />
      <feComponentTransfer in="colormatrix" result="componentTransfer1">
        <feFuncR type="gamma" amplitude="1.37" exponent="5" offset="0" />
        <feFuncG type="gamma" amplitude="1.37" exponent="5" offset="0" />
        <feFuncB type="gamma" amplitude="1.37" exponent="5" offset="0" />
        <feFuncA type="gamma" amplitude="1.37" exponent="5" offset="0" />
      </feComponentTransfer>
      <feBlend mode="multiply" in="SourceGraphic" in2="componentTransfer1" result="blend" />
    </filter>
  )
}
