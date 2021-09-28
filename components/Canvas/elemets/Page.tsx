import styled, { css } from 'styled-components'
import { editable } from './editableStyle'

export const Page = styled.div<{ canvas?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: auto;
  gap: 16px;
  min-height: 100vh;
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
  ${p => p.canvas && canvas}
`

const canvas = css`
  /*
  background: white
    url('data:image/svg+xml,\
      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" fill-opacity=".20" >\
        <rect x="200" width="200" height="200" />\
        <rect y="200" width="200" height="200" />\
      </svg>');
  background-size: 20px 20px;
  background-position: 50% 50%;
  */
`
