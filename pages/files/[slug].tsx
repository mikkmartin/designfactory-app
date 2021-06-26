import { defaultTemplatesv2 } from 'static/defaultTemplates'
import { Layout } from 'components/Layout'
import { Canvas } from 'components/Canvas'
import { getTemplate } from 'data/figma'
import { FC } from 'react'

type Props = {
  fileName: string
  initialTemplate: any
  data: any
  fonts: any[]
}

const useEditor = (template, options: { refresh: boolean }) => {
  console.log(options)
  return { template, data: {}, fonts: [], schema: {} }
}

const File: FC<Props> = ({ initialTemplate, fileName }) => {
  const { schema, ...canvasProps } = useEditor(initialTemplate, { refresh: false })
  return (
    <Layout file={fileName} schema={schema}>
      <Canvas {...canvasProps} />
    </Layout>
  )
}

export const getStaticProps = async ({ params }) => {
  const fileName = params.slug
  const defaultTemplate = defaultTemplatesv2.find(({ slug }) => slug === fileName)
  const templateID = defaultTemplate.template
  const initialTemplate = await getTemplate(templateID)

  return {
    props: {
      fileName,
      initialTemplate,
    },
  }
}

export const getStaticPaths = async () => {
  const defaultTemplate = ['og-image']
  return {
    paths: defaultTemplate.map(name => `/files/${name}`),
    fallback: false,
  }
}

export default File
