import { Content } from '@radix-ui/react-tabs'
import styled, { css } from 'styled-components'
import { store } from 'data'

type Tab = typeof store.editor.tabs[number]

export const Tab = styled(Content)<{ value: Tab }>`
  flex: 1;
`

export const tabContentStyle = css`
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow: auto;
`

Content.defaultProps = {
  tabIndex: -1,
}
