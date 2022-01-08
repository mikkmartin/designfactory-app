import { NextPage } from 'next'
import { useState } from 'react'
import styled from 'styled-components'
import { store } from 'data/stores_v2/RootStore'
import { GetStaticProps, GetStaticPaths } from 'next'
import { supabase } from 'data/db/config'
import type { definitions } from 'data/db/types'

type GetTemplatesData = definitions['templates'] & {
  theme_options: definitions['themes'][]
}

type Props = {
  slug: string
  data: GetTemplatesData
}

const Test: NextPage<Props> = props => {
  const { title } = props.data

  props.data.theme_options

  return (
    <Container>
      <h1>{title}</h1>
      <select>
        {props.data.theme_options.map(({id, title}) => (
          <option value={id} key={id}>{title}</option>
        ))}
      </select>
      {/*
      <button onClick={() => setState(!state)}>toggle</button>
        */}
      <pre>{JSON.stringify({ props }, null, 2)}</pre>
    </Container>
  )
}
const Container = styled.div``

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params.slug as string
  const { data, error } = await supabase
    .rpc<GetTemplatesData>('get_template_by_slug', { slug })
    .single()
  return {
    props: { slug, data, error },
    revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { slug: 'og-image' } }],
    fallback: true,
  }
}

export default Test
