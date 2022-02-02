export const Close = ({ ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}>
      <path d="M18 6L6 18"></path>
      <path d="M6 6L18 18"></path>
    </svg>
  )
}

export default Close
