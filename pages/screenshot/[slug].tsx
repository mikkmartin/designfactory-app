import { FileResponse } from '@mikkmartin/figma-js'
import { GetServerSideProps } from 'next'
import { FC } from 'react'
import { defaultTemplatesv2 } from 'static/defaultTemplates'
import baseURL from 'static/baseURL'
import { Invoice } from 'static/invoice'
import { Canvas } from 'components/Canvas'
import { urlToJson } from 'lib/urlEncoder'

type Props = {
  template: FileResponse
  data: Invoice
}

export const Screenshot: FC<Props> = ({ template, data }) => {
  return <Canvas template={template} editable={false} />
}

export const getServerSideProps: GetServerSideProps = async ({ query, resolvedUrl }) => {
  const { slug } = query
  const template = query.template as string
  const defaults = defaultTemplatesv2.find(template => template.slug === slug)
  const url = baseURL + '/api/figma?template=' + (defaults?.id || template)
  const figmaResponse = await fetch(url)
  const figmaTemplate = await figmaResponse.json()

  return {
    props: {
      template: figmaTemplate,
      data: urlToJson(resolvedUrl),
    },
  }
}

export default Screenshot
