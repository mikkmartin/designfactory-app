import { defaultTemplatesv2 } from 'static/defaultTemplates'
import { Layout } from 'components/Layout'
import { Canvas } from 'components/Canvas'
import { getTemplate } from 'data/figma'
import { FC } from 'react'
import { FileResponse } from '@mikkmartin/figma-js'
import { GetStaticProps } from 'next'

const File: FC<Props> = ({ template }) => {
  return (
    <Layout templateId={template.id}>
      <Canvas template={template} />
    </Layout>
  )
}

interface Props {
  template: {
    id: string
  } & FileResponse
}

export const getStaticProps: GetStaticProps<Props> = async ({ params: { slug } }) => {
  const { id } = defaultTemplatesv2.find(t => t.slug === slug)
  return {
    props: {
      template: await getTemplate(id),
    },
    revalidate: 1,
  }
}

export const getStaticPaths = async () => {
  const slugs = defaultTemplatesv2.map(({ slug }) => slug).filter(slug => slug !== "mockup")
  return {
    paths: slugs.map(slugs => `/files/${slugs}`),
    fallback: false,
  }
}

export default File
