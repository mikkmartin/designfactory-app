import Layout from 'components/Layout'
import Mockup from 'components/Mockup'
import { useRouter } from 'next/router'

const Tshirt = () => {
  const layoutProps = {
    fileName: 'T-shirt',
    data: { color: 'white' },
    schema: {},
    loading: false,
    slug: 'mockup',
  }

  const { query } = useRouter()
  console.log('/files/mockup.ts')
  console.log(query)

  return (
    <Layout {...layoutProps} onDataUpdate={() => {}}>
      <Mockup editable={true} />
    </Layout>
  )
}

export default Tshirt
