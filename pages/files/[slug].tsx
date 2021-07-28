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

const figmaTemplates = defaultTemplatesv2.filter(({ slug }) => slug !== 'mockup')

export const getStaticProps: GetStaticProps<Props> = async ({ params: { slug } }) => {
  const { id } = figmaTemplates.find(t => t.slug === slug)
  return {
    props: {
      template: await getTemplate(id),
    },
    revalidate: 1,
  }
}

export const getStaticPaths = async () => {
  const slugs = figmaTemplates.map(({ slug }) => slug)
  return {
    paths: slugs.map(slugs => `/files/${slugs}`),
    fallback: false,
  }
}

export default File
