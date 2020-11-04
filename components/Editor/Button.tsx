import styled from 'styled-components'
import { motion } from 'framer-motion'

export const Button = styled(motion.button)<{ width?: any; background?: any }>`
  width: ${props => (props.width ? props.width : '56px')};
  height: 56px;
  border: 0;
  color: white;
  background: ${props => (props.background ? props.background : 'rgba(255, 255, 255, 0.05)')};
  cursor: pointer;
  :hover {
    background: rgba(255, 255, 255, 0.1);
  }
  :active {
    background: var(--highlight);
  }
  outline: none;
`
