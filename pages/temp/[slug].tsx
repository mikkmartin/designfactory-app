import { NextPage } from 'next'
import styled from 'styled-components'
import { GetStaticProps, GetStaticPaths } from 'next'
import { db, TemplateData } from 'data/db'

type Props = {
  data: TemplateData
}

const Test: NextPage<Props> = ({ data }) => {
  const { title, description } = data
  const theme = data.theme_options.find(theme => theme.id === data.default_theme)

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <select>
        {data.theme_options.map(({ id, name }) => (
          <option value={id} key={id}>
            {name}
          </option>
        ))}
      </select>
      <div>
        <img style={{ width: 200 }} src={theme.thumbnail_url} />
        <h2>{theme.title}</h2>
      </div>
      <pre>{JSON.stringify({ data }, null, 2)}</pre>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  return {
    props: await db.getTemplate(params.slug as string),
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
