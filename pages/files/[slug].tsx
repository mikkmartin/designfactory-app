import { defaultTemplates } from 'static/defaultTemplates'
import { Layout } from 'components/Layout'
import { Canvas } from 'components/Canvas'
import { getTemplate } from 'data/figma'
import { FC } from 'react'
import { FileResponse } from '@mikkmartin/figma-js'
import { GetStaticProps, GetStaticPaths } from 'next'

const File: FC<Props> = ({ template }) => {
  return (
    <Layout>
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
  const { id } = defaultTemplates.find(t => t.slug === slug)
  if (!id) return { notFound: true }
  return {
    props: {
      template: await getTemplate(id),
    },
    notFound: !Boolean(id),
    revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = defaultTemplates.map(({ slug }) => slug)
  return {
    paths: slugs.map(slugs => `/files/${slugs}`),
    fallback: false,
  }
}

export default File
