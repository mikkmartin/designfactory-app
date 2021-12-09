import styled from 'styled-components'
import { Header } from './Header'
import { Tabs } from './Tabs'

export const SideMenu = () => {
  return (
    <Container>
      <Header />
      <Tabs />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex: 1;
  position: relative;
  background: #282c34;
  flex-direction: column;
  max-width: 420px;
`
