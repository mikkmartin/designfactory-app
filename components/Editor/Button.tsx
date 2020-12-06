import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'

type Props = {
  width?: any,
  selected?: boolean,
  primary?: boolean
  highlight?: boolean
}

export const Button = styled(motion.button) <Props>`
  width: ${props => (props.width ? props.width : '56px')};
  height: 56px;
  border: 0;
  color: white;
  cursor: pointer;
  background: ${props => props.primary ? 'var(--highlight)' :
    props.highlight ?
      'rgba(255, 255, 255, 0.05)' :
      'transparent'};
  :hover {
    background: rgba(255, 255, 255, 0.1);
  }
  ${props => props.selected && css`
    background: rgba(255, 255, 255, 0.05);
    box-shadow: inset 0 1px 0 0 white;
  `};
  :active {
    background: var(--highlight);
  }
  outline: none;
`