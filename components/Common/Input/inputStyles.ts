import { css } from 'styled-components'

export const inputStyle = css`
  background: none;
  border: none;
  background: rgba(255, 255, 255, 0.035);
  padding: 0 4px 0 16px;
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

export const labelStyle = css`
  display: grid;
  grid-template-columns: 2fr 4fr;
  span {
    text-transform: capitalize;
    min-height: 40px;
    padding-top: 15px;
    opacity: 0.5;
    padding-right: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  > *:nth-child(1):not(span) {
    grid-column: 1 / span 2;
  }
`
