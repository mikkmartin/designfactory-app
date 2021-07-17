import Layout from 'components/Layout'
import Mockup from 'components/Mockup'
import { useState } from 'react'

const Tshirt = () => {
  const [data, setData] = useState({ color: 'white' })

  const layoutProps = {
    fileName: 'T-shirt',
    data,
    schema: {},
    loading: false,
    slug: 'mockup',
  }

  return (
    <Layout {...layoutProps} onDataUpdate={setData}>
      <Mockup editable={true} />
    </Layout>
  )
}

export default Tshirt
