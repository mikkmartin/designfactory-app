import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { store } from 'data'

export const Image = observer(() => {
  const url = store.editor.downloadUrl
  return <Container src={url} />
})

const Container = styled.img`
  width: 130px;
  border-radius: 3px;
  height: auto;
  aspect-ratio: 16 / 9;
`
