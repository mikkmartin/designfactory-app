const Info = ({ ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 22 22"
      stroke="currentColor"
      {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1">
        <g stroke="#FFF" strokeWidth="2" transform="translate(-312 -17)">
          <g transform="translate(295)">
            <g transform="translate(18 18)">
              <circle cx="10" cy="10" r="10"></circle>
              <path d="M10 14L10 10"></path>
              <path d="M10 6L10.01 6"></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default Info
