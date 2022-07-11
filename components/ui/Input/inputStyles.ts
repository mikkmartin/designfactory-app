import { css } from 'styled-components'

export const inputStyle = css`
  background: none;
  border: none;
  background: rgba(0, 0, 0, 0.15);
  padding: 0 8px 0 16px;
  color: inherit;
  font-family: inherit;
  line-height: 140%;
  border-radius: var(--input-border-radius);
  min-height: 40px;
  ::placeholder {
    color: rgba(255, 255, 255, 0.25);
  }
  :disabled {
    color: rgba(255, 255, 255, 0.25);
    user-select: none;
  }
  &:not(:disabled):hover,
  &:focus {
    background: rgba(255, 255, 255, 0.07);
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 1px rgb(var(--highlight));
  }
`
