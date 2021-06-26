import { FC } from 'react'
import { Pdf } from 'components/Pdf'
import { Layout } from 'components/Layout'

const Invoice: FC = () => {
  return (
    <Layout file="invoice">
      <Pdf>
        <Invoice />
      </Pdf>
    </Layout>
  )
}

export default Invoice