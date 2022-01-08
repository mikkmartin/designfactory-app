import { NextPage } from 'next'
import { GetStaticProps, GetStaticPaths } from 'next'
import { db, TemplateData } from 'data/db'
import { observer } from 'mobx-react-lite'
import { useRef } from 'react'
import { useStore } from 'hooks/useStore'

type Props = {
  data: TemplateData
}

const Test: NextPage<Props> = observer(({ data }) => {
  setInitialData(data)
  const { template } = useStore()
  const { title, description, theme, setTheme } = template

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <p>{JSON.stringify({ loading: theme.loading })}</p>
      <select onChange={ev => setTheme(ev.target.value)}>
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
})

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

const setInitialData = (template: TemplateData) => {
  const id = useRef(null)
  const store = useStore()
  if (id.current !== template.id) {
    id.current = template.id
    store.template.setTemplate(template)
  }
}

export default Test
