import { FC } from 'react'
import { Pdf } from 'components/Pdf'
import { Layout } from 'components/Layout'
import { Loading } from 'components/Editor/Loading'

const Invoice: FC = () => {
  return (
    <Layout file="invoice">
      <Pdf>
        <Invoice />
      </Pdf>
      <Loading />
    </Layout>
  )
}

export default Invoice