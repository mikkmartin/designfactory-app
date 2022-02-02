import { motion } from 'framer-motion'

const FigmaLogo = ({ ...props }) => {
  return (
    <motion.svg width="32" height="32" fill="none" viewBox="0 0 32 32" {...props}>
      <path
        fillRule="evenodd"
        d="M10.5 11a3 3 0 013-3h5a3 3 0 011.659 5.5 3 3 0 11-3.659 4.736V21a3 3 0 11-4.659-2.5A2.998 2.998 0 0110.5 16c0-1.043.533-1.963 1.341-2.5A2.998 2.998 0 0110.5 11zm3 2a2 2 0 110-4h2v4h-2zm2 1h-2a2 2 0 100 4h2v-4zm0 5h-2a2 2 0 102 2v-2zm3-5a2 2 0 10-.001 3.999A2 2 0 0018.5 14zm0-1a2 2 0 100-4h-2v4h2z"
        clipRule="evenodd"></path>
    </motion.svg>
  )
}

export default FigmaLogo
