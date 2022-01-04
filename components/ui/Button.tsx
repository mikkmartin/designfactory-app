import styled, { css, CSSProp } from 'styled-components'
import { motion } from 'framer-motion'

type Props = {
  selected?: boolean | CSSProp
  small?: boolean
  primary?: boolean
  highlight?: boolean
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
  border-radius: 4px;
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
    background: rgb(172, 230, 255, 0.1);
    box-shadow: inset 0 0 0 1px rgb(var(--highlight));
  }
  :active {
    &:hover {
      background: rgb(var(--highlight));
    }
  }
`

export const Button = styled(motion.button)<Props>`
  background: ${props =>
    props.primary
      ? 'rgb(var(--highlight))'
      : props.highlight
      ? 'rgba(255, 255, 255, 0.05)'
      : 'transparent'};
  ${p =>
    typeof p.selected === 'boolean' && p.selected === true
      ? css`
          background: rgba(255, 255, 255, 0.05);
          box-shadow: inset 0 1px 0 0 white;
        `
      : p.selected};
  :hover {
    background: ${p => (!p.highlight ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.1)')};
  }
  ${buttonStyles}
  ${p => p.small && small}
`

const small = css`
  border-radius: 2px;
  font-size: 14px;
  > svg {
    width: 16px;
    height: 16px;
  }
`
