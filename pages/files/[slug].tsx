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
  initialTemplate: FileResponse
}

interface Props extends StaticProps {
  data: any
  fonts: any[]
}

const File: FC<Props> = ({ initialTemplate }) => {
  const { query } = useRouter()
  const { frames, slug: _slug } = query
  const slug = Array.isArray(_slug) ? _slug[0] : _slug
  const {
    template: templateID,
    name,
    disabledFields,
  } = defaultTemplatesv2.find(t => t.slug === slug)

  const { onDataUpdate, setData, data, fonts, template, loading } = useEditor(
    templateID,
    initialTemplate
  )
  const { nodes, componentSets, schema } = parseTemplate(template, {
    filter: (_, i) => (frames === 'all' ? true : i === 0),
  })

  const layoutProps = { fileName: name, schema, data, setData, loading, slug }
  const canvasProps = { data, fonts, nodes, componentSets, disabledFields, onDataUpdate }
  return (
    <Layout {...layoutProps}>
      <Canvas {...canvasProps} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<StaticProps> = async ({ params }) => {
  const templateID = defaultTemplatesv2.find(({ slug }) => slug === params.slug).template

  return {
    props: {
      initialTemplate: await getTemplate(templateID),
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
