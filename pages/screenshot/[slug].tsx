import { FileResponse } from '@mikkmartin/figma-js'
import { GetServerSideProps } from 'next'
import { FC } from 'react'
import { defaultTemplatesv2 } from 'static/defaultTemplates'
import baseURL from 'static/baseURL'
import { Invoice } from 'static/invoice'
import { Canvas } from 'components/Canvas'
import { parseTemplate } from 'components/Canvas/parseTemplate'
import Head from 'next/head'

type Props = {
  template: FileResponse
  data: Invoice
}

export const Screenshot: FC<Props> = ({ template, data }) => {
  const { nodes, componentSets } = parseTemplate(template)
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Canvas nodes={nodes} componentSets={componentSets} data={data} editable={false} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug, ...rest } = query
  const template = query.template as string
  const defaults = defaultTemplatesv2.find(template => template.slug === slug)
  const url = baseURL + '/api/figma?template=' + (defaults?.template || template)
  const figmaResponse = await fetch(url)
  const figmaTemplate = await figmaResponse.json()

  return {
    props: {
      template: figmaTemplate,
      data: rest,
    },
  }
}

export default Screenshot
