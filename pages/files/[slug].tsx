import { defaultTemplatesv2 } from 'static/defaultTemplates'
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
  templateID: string
  fileName: string
  slug: string
  initialTemplate: FileResponse
}

interface Props extends StaticProps {
  data: any
  fonts: any[]
}

const File: FC<Props> = ({ templateID, initialTemplate, fileName, slug }) => {
  const { query } = useRouter()
  const { frames } = query
  const { onDataUpdate, data, fonts, template, loading } = useEditor(templateID, initialTemplate)
  const { nodes, componentSets, schema } = parseTemplate(template, {
    filter: (_, i) => frames === 'all' ? true : i === 0,
  })

  const layoutProps = { fileName, schema, data, onDataUpdate, loading, slug }
  const canvasProps = { data, fonts, nodes, componentSets, onDataUpdate }
  return (
    <Layout {...layoutProps}>
      <Canvas {...canvasProps} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<StaticProps> = async ({ params }) => {
  const defaultTemplate = defaultTemplatesv2.find(({ slug }) => slug === params.slug)
  const templateID = defaultTemplate.template
  const initialTemplate = await getTemplate(templateID)

  return {
    props: {
      templateID,
      fileName: defaultTemplate.name,
      slug: defaultTemplate.slug,
      initialTemplate,
    },
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
