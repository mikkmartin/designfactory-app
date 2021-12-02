const FigmaLogo = ({ ...props }) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16" {...props}>
      <g transform="translate(64 122)">
        <mask id="a">
          <path fill="#FFF" d="M-64-122h16v16h-16v-16z"></path>
        </mask>
        <g style={{ mixBlendMode: 'normal' }} mask="url(#a)">
          <use
            fill="#1ABCFE"
            transform="translate(-56 -116)"
            xlinkHref="#b"
            style={{ mixBlendMode: 'normal' }}></use>
          <use
            fill="#0ACF83"
            transform="translate(-61 -111)"
            xlinkHref="#c"
            style={{ mixBlendMode: 'normal' }}></use>
          <use
            fill="#FF7262"
            transform="matrix(0 1 1 0 -56 -121)"
            xlinkHref="#d"
            style={{ mixBlendMode: 'normal' }}></use>
          <use
            fill="#F24E1E"
            transform="matrix(1 0 0 -1 -61 -116)"
            xlinkHref="#e"
            style={{ mixBlendMode: 'normal' }}></use>
          <use
            fill="#A259FF"
            transform="matrix(1 0 0 -1 -61 -111)"
            xlinkHref="#e"
            style={{ mixBlendMode: 'normal' }}></use>
        </g>
      </g>
      <defs>
        <path id="b" d="M0 2.5a2.5 2.5 0 015 0 2.5 2.5 0 01-5 0z"></path>
        <path id="c" d="M0 2.5A2.5 2.5 0 012.5 0H5v2.5a2.5 2.5 0 01-5 0z"></path>
        <path id="d" d="M0 0h5v2.5a2.5 2.5 0 01-5 0V0z"></path>
        <path id="e" d="M0 2.5A2.5 2.5 0 012.5 0H5v5H2.5A2.5 2.5 0 010 2.5z"></path>
      </defs>
    </svg>
  )
}

export default FigmaLogo
