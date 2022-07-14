import { Content } from '@radix-ui/react-tabs'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { store } from 'data'

type Tab = typeof store.ui.tabs[number]

export const Tab = styled(Content)<{ value: Tab }>`
  flex: 1;
`

export const tabContentStyle = css`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow: auto;
`

Content.defaultProps = {
  tabIndex: -1,
}
