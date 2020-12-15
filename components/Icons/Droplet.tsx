const Droplet = ({ ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className="feather feather-droplet"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}>
      <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"></path>
    </svg>
  )
}

export default Droplet
