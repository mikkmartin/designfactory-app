import styled, { css } from 'styled-components'

const inputFocus = css`
  background: rgba(0, 102, 255, 0.2);
  box-shadow: inset 0 0 1px #0066ff, 0 0 0 1px rgba(255, 255, 255, 0.25);
  border-radius: 4px;
  transition: background-color 0.1s;
`

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: auto;
  gap: 16px;
  padding: 5vw;
  min-height: 100%;
  background: #1a1e25;
  * {
    line-height: 100%;
  }
  > div {
    &:hover .ProseMirror {
      ${inputFocus}
    }
    &:hover .ProseMirror:hover {
      transition: background-color 0s;
      background: rgba(0, 102, 255, 0.2);
    }
    &:focus-within .ProseMirror {
      background: unset;
      box-shadow: unset;
      transition: background-color 0;
      box-shadow: background-color 0;
      &:hover,
      &.ProseMirror-focused {
        ${inputFocus}
      }
    }
  }
`
