import { FileResponse } from '@mikkmartin/figma-js'
import { GetServerSideProps } from 'next'
import { FC } from 'react'
import { defaultTemplatesv2 } from 'static/defaultTemplates'
import baseURL from 'static/baseURL'
import { Invoice } from 'static/invoice'
import { Template } from 'components/Template'

type Props = {
  template: FileResponse
  data: Invoice
}

export const Screenshot: FC<Props> = ({ template, data }) => {
  return <Template template={template} data={data} />
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug, ...rest } = query
  const template = query.template as string
  const defaultTemplate = defaultTemplatesv2.find(template => template.slug === slug).template
  const figmaResponse = await fetch(baseURL + '/api/figma?template=' + template || defaultTemplate)
  const figmaTemplate = await figmaResponse.json()

  return {
    props: {
      template: figmaTemplate,
      data: rest,
    },
  }
}

export default Screenshot
