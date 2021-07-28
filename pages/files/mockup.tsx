import Layout from 'components/Layout'
import Mockup from 'components/Mockup'
import { defaultTemplatesv2 } from 'static/defaultTemplates'
import { getTemplate } from 'data/figma'
import { FileResponse } from '@mikkmartin/figma-js'
import { GetStaticProps } from 'next'

const MockupTemplate = () => {
  return (
    <Layout templateId="">
      <Mockup />
    </Layout>
  )
}

export default MockupTemplate
