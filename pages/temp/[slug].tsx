import { NextPage } from 'next'
import styled from 'styled-components'
import { GetStaticProps, GetStaticPaths } from 'next'
import { db, TemplateData } from 'data/db'

type Props = {
  slug: string
  data: TemplateData
}

const Test: NextPage<Props> = ({ data }) => {
  const { title, description } = data

  return (
    <Container>
      <h1>{title}</h1>
      <p>{description}</p>
      <select>
        {data.theme_options.map(({ id, title }) => (
          <option value={id} key={id}>
            {title}
          </option>
        ))}
      </select>
      {/*
      <button onClick={() => setState(!state)}>toggle</button>
        */}
      <pre>{JSON.stringify({ data }, null, 2)}</pre>
    </Container>
  )
}
const Container = styled.div``

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params.slug as string
  const { data } = await db.getTemplate(slug)
  return {
    props: { slug, data },
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
