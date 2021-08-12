import styled from 'styled-components'
import { editable } from "./editableStyle";

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: auto;
  gap: 16px;
  > div {
    .ProseMirror p {
      line-height: unset;
      outline: none;
    }
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
    &:hover .ProseMirror {
      ${editable}
    }
    &:hover .add-button {
      opacity: 1;
    }
  }
`
