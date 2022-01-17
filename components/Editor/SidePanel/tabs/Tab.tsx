import { Content } from '@radix-ui/react-tabs'
import styled, { css } from 'styled-components'
import { store } from 'data/stores_v2'

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
