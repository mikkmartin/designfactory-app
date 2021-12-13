import styled, { css, CSSProp } from 'styled-components'
import { motion } from 'framer-motion'

type Props = {
  width?: any,
  selected?: boolean | CSSProp,
  primary?: boolean
  highlight?: boolean
  noHover?: boolean
}

export const Button = styled(motion.button) <Props>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => (props.width ? props.width : '56px')};
  height: 56px;
  font-family: inherit;
  border: 0;
  color: white;
  cursor: pointer;
  background: ${props => props.primary ? 'rgb(var(--highlight))' :
    props.highlight ?
      'rgba(255, 255, 255, 0.05)' :
      'transparent'};
  :hover {
    background: ${props => !props.noHover ? 'rgba(255, 255, 255, 0.1)' : 'unset'};
  }
  ${props => typeof props.selected === 'boolean' && props.selected === true ? css`
    background: rgba(255, 255, 255, 0.05);
    box-shadow: inset 0 1px 0 0 white;
  ` : props.selected};
  :active {
    background: rgb(var(--highlight));
  }
  &:disabled, &[disabled] {
    color: rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.05);
    cursor: default;
  }
  outline: none;
`