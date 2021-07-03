import styled, { css } from 'styled-components'
import { editable } from "./editableStyle";

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
      ${editable}
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
        ${editable}
      }
    }
  }
`
