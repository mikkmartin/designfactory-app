import Layout from 'components/Layout'
import Mockup from 'components/Mockup'

const Tshirt = () => {
  const layoutProps = { fileName: 'T-shirt', schema: {}, data: {}, loading: false, slug: 'tshirt' }
  return (
    <Layout {...layoutProps} onDataUpdate={() => {}}>
      <Mockup />
    </Layout>
  )
}

export default Tshirt
