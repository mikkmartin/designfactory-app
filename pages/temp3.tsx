import { getCookie } from 'cookies-next'
import { store } from 'data'
import { supabase } from 'lib/db/config'
import { ANON_ID } from 'lib/static/cookieKeys'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

const temp3 = observer(props => {
  const { showThemePreview, showTutorialToolTip, setThemePreview, setTutorialToolTip } =
    store.ui.settings

  return (
    <Container>
      <button onClick={() => setThemePreview(!showThemePreview)}>toggle1</button>
      <button onClick={() => setTutorialToolTip(!showTutorialToolTip)}>toggle1</button>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </Container>
  )
})

const Container = styled.div`
  padding: 2rem;
`

export const getServerSideProps = async ({ req }) => {
  const anonID = getCookie(ANON_ID, { req }) as string | undefined
  const { data } = await supabase.rpc('profile_with_data', { anon_id: anonID })

  return {
    props: { data },
  }
}

export default temp3
