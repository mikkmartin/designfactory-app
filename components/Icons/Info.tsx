const Info = ({ ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 22 22"
      stroke="currentColor"
      strokeWidth="2"
      {...props}>
      <g fill="none" fillRule="evenodd" stroke="none" strokeLinecap="round" strokeLinejoin="round">
        <g stroke="#FFF" transform="translate(-312 -17)">
          <g transform="translate(295)">
            <g transform="translate(18 18)">
              <circle cx="10" cy="10" r="10" />
              <path d="M10 14L10 10" strokeWidth="2" />
              <path d="M10 6L10.01 6" strokeWidth="2" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default Info
