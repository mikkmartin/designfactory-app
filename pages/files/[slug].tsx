import { Layout } from 'components/Layout'
import { Canvas } from 'components/Canvas'
import { FC } from 'react'
import { FileResponse } from '@mikkmartin/figma-js'
import { GetStaticProps, GetStaticPaths } from 'next'
import { supabase, definitions } from 'data/supabase'

export interface TemplateProps extends Omit<definitions['templates'], 'template'> {
  template: FileResponse
}

const File: FC<TemplateProps> = ({ children, ...template }) => {
  return (
    <Layout>
      <Canvas template={template} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<definitions['templates']> = async ({
  params: { slug },
}) => {
  let { data, error } = await supabase
    .from<definitions['templates']>('templates')
    .select('slug')
    .eq('slug', slug as string)
    .select('*')
    .single()

  if (error) return { notFound: true }

  return {
    props: { ...data },
    revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  let { data } = await supabase.from<definitions['templates']>('templates').select('slug')
  return {
    paths: data.map(({ slug }) => `/files/${slug}`),
    fallback: false,
  }
}

export default File
