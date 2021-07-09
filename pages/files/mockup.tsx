import Layout from 'components/Layout'
import Mockup from 'components/Mockup'

const Tshirt = () => {
  const layoutProps = {
    fileName: 'T-shirt',
    data: { color: 'white' },
    schema: {},
    loading: false,
    slug: 'mockup',
  }

  return (
    <Layout {...layoutProps} onDataUpdate={() => {}}>
      <Mockup />
    </Layout>
  )
}

export default Tshirt
