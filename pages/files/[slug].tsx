import { defaultTemplatesv2 } from 'static/defaultTemplates'
import { Layout } from 'components/Layout'
import { Canvas } from 'components/Canvas'
import { getTemplate } from 'data/figma'
import { FC } from 'react'
import { useEditor } from 'hooks/useEditor'
import { FileResponse } from '@mikkmartin/figma-js'
import { GetStaticProps } from 'next'

interface StaticProps {
  templateID: string
  fileName: string
  initialTemplate: FileResponse
}

interface Props extends StaticProps {
  data: any
  fonts: any[]
}

const File: FC<Props> = ({ templateID, initialTemplate, fileName }) => {
  const { schema, onDataUpdate, data, fonts, template } = useEditor(templateID, initialTemplate)
  const layoutProps = { fileName, schema, initialData: data, onDataUpdate }
  const canvasProps = { data, fonts, template }
  return (
    <Layout {...layoutProps}>
      <Canvas {...canvasProps} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<StaticProps> = async ({ params }) => {
  const fileName = params.slug as string
  const defaultTemplate = defaultTemplatesv2.find(({ slug }) => slug === fileName)
  const templateID = defaultTemplate.template
  const initialTemplate = await getTemplate(templateID)

  return {
    props: {
      templateID,
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
