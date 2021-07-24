import { defaultTemplatesv2, TemplateObjectV2 } from 'static/defaultTemplates'
import { Layout } from 'components/Layout'
import { Canvas } from 'components/Canvas'
import { getTemplate } from 'data/figma'
import { FC } from 'react'
import { useEditor } from 'hooks/useEditor'
import { FileResponse } from '@mikkmartin/figma-js'
import { GetStaticProps } from 'next'
import { parseTemplate } from 'components/Canvas/parseTemplate'
import { useRouter } from 'next/router'

interface StaticProps {
  initialTemplate: FileResponse
}
interface Props extends TemplateObjectV2, StaticProps {}

const File: FC<Props> = ({ initialTemplate, templateID, fileName, disabledFields }) => {
  const { data, template, loading } = useEditor(templateID, initialTemplate)
  const { query } = useRouter()
  const { frames } = query
  
  const options = { filter: (_, i) => (frames === 'all' ? true : i === 0) }
  const { nodes, componentSets, schema } = parseTemplate(template, options)

  const layoutProps = { fileName, data, loading, schema }
  const canvasProps = { data, nodes, componentSets, disabledFields }
  return (
    <Layout {...layoutProps}>
      <Canvas {...canvasProps} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<StaticProps> = async ({ params: { slug } }) => {
  const { templateID, ...rest } = defaultTemplatesv2.find(t => t.slug === slug)
  const props = { initialTemplate: await getTemplate(templateID), ...rest }
  return {
    props,
    revalidate: 1,
  }
}

export const getStaticPaths = async () => {
  const slugs = defaultTemplatesv2.map(({ slug }) => slug)
  return {
    paths: slugs.map(slugs => `/files/${slugs}`),
    fallback: false,
  }
}

export default File
