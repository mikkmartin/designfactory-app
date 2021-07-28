import { defaultTemplatesv2 } from 'static/defaultTemplates'
import { getTemplate } from 'data/figma'
import Layout from 'components/Layout'
import Mockup from 'components/Mockup'
import { FileResponse } from '@mikkmartin/figma-js'
import { FC } from 'react'
import { GetStaticProps } from 'next'

const Tshirt: FC<Props> = ({ template }) => {
  return (
    <Layout templateId="">
      <Mockup editable={true} />
    </Layout>
  )
}

interface Props {
  template: {
    id: string
  } & FileResponse
}

export default Tshirt
