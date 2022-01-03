import styled, { css, CSSProp } from 'styled-components'
import { motion } from 'framer-motion'

type Props = {
  width?: any
  selected?: boolean | CSSProp
  primary?: boolean
  highlight?: boolean
  noHover?: boolean
}

export const buttonStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  border: 0;
  color: inherit;
  cursor: pointer;
  background: transparent;
  padding: 8px;
  &:disabled,
  &[disabled] {
    color: rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.05);
    cursor: default;
  }
  box-shadow: inset 0 0 0 0 rgb(var(--highlight));
  transition: background-color 0, box-shadow 0;
  :focus-visible {
    transition: background-color 0.1s, box-shadow 0.1s;
    outline: none;
    border-radius: var(--input-border-radius);
    background: rgb(172, 230, 255, 0.1);
    box-shadow: inset 0 0 0 1px rgb(var(--highlight));
  }
  :active {
    background: rgb(var(--highlight));
  }
`

export const Button = styled(motion.button)<Props>`
  ${buttonStyles}
  width: ${props => props.width && props.width};
  height: 56px;
  min-width: 56px;
  background: ${props =>
    props.primary
      ? 'rgb(var(--highlight))'
      : props.highlight
      ? 'rgba(255, 255, 255, 0.05)'
      : 'transparent'};
  :hover {
    background: ${props => (!props.noHover ? 'rgba(255, 255, 255, 0.1)' : 'unset')};
  }
  ${props =>
    typeof props.selected === 'boolean' && props.selected === true
      ? css`
          background: rgba(255, 255, 255, 0.05);
          box-shadow: inset 0 1px 0 0 white;
        `
      : props.selected};
`
