import { NextPage } from 'next'
import { GetStaticProps, GetStaticPaths } from 'next'
import { db, TemplateData } from 'data/db'
import { observer } from 'mobx-react-lite'
import { useRef, useState } from 'react'
import { supabase } from 'data/db/config'
import { definitions } from 'data/db/types'
import Link from 'next/link'
import storageURL from 'lib/static/storageURL'
import { store } from 'data/stores_v2'

type Props = {
  slug: string
  data: TemplateData
  error: any
}

const Test: NextPage<Props> = observer(({ slug, data }) => {
  //return <pre>{JSON.stringify({ slug, data }, null, 2)}</pre>
  setInitialData(data, slug)
  const { template, templates } = store.content
  const { theme, themes, setTheme, handleAddTheme, handleDeleteTheme } = template

  const [figmaID, setFigmaID] = useState('uhifEQPClI8AdGz3vX667v')
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleAddTheme(figmaID)
  }

  return (
    <div style={{ display: 'grid', gap: 16, padding: 32 }}>
      <select style={{ width: 200 }}>
        {!Boolean(templates.length) ? (
          <option key={template.id} value={template.id} selected>
            {template.title}
          </option>
        ) : (
          templates.map(({ id }) => (
            <option key={id} value={id} selected={id === id}>
              {template.title}
            </option>
          ))
        )}
      </select>
      <h1>{template.title}</h1>
      <p>{template.description}</p>
      <form onSubmit={handleSubmit}>
        <input type="text" value={figmaID} onChange={ev => setFigmaID(ev.target.value)} />
        <button type="submit">Submit</button>
      </form>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {themes.map(({ slug, title }) => (
          <Link key={slug} href={slug} shallow>
            <a
              onClick={() => setTheme(slug)}
              key={slug}
              style={{
                background: theme.slug === slug ? 'pink' : 'black',
                display: 'block',
              }}>
              <img
                src={`${storageURL}/themes/files/${slug}.png`}
                style={{ width: 100, height: 50, objectFit: 'cover' }}
              />
              <h2>{title}</h2>
              <small>{slug}</small>
              <button
                style={{ width: '100%' }}
                onClick={ev => {
                  ev.preventDefault()
                  ev.stopPropagation()
                  handleDeleteTheme(slug)
                }}>
                Delete
              </button>
            </a>
          </Link>
        ))}
      </div>
      <pre>
        {JSON.stringify(
          { theme: theme.slug, loading: theme.loading, themeData: theme.data?.name },
          null,
          2
        )}
      </pre>
    </div>
  )
})

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  console.log(params)
  const slug = params.slug as string
  const { data, error } = await db.getTemplate(slug)
  return {
    props: { slug, data, error },
    revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await supabase
    .from<definitions['themes']>('themes')
    .select('slug')
    .not('deleted_at', 'is', 'null')
  return {
    paths: data.map(({ slug }) => ({ params: { slug } })),
    fallback: 'blocking',
  }
}

const setInitialData = (template: TemplateData, slug: string) => {
  const id = useRef(null)
  if (id.current !== template.id) {
    id.current = template.id
    store.content.setInitialData(template, slug)
  }
}

export default Test
