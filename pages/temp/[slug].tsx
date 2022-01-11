import { NextPage } from 'next'
import { GetStaticProps, GetStaticPaths } from 'next'
import { db, TemplateData } from 'data/db'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { supabase } from 'data/db/config'
import { definitions } from 'data/db/types'
import Link from 'next/link'
import storageURL from 'lib/static/storageURL'
import { store } from 'data/stores_v2'
import { useRouter } from 'next/router'

type Props = {
  slug: string
  data: TemplateData
}

const Test: NextPage<Props> = observer(() => {
  const { template, templates } = store.content
  //return <pre>{JSON.stringify({ template, templates }, null, 2)}</pre>
  const { theme, themes, setTheme, addTheme, deleteTheme } = template
  const router = useRouter()

  const [figmaID, setFigmaID] = useState('uhifEQPClI8AdGz3vX667v')
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addTheme(figmaID)
  }

  const handleTemplateChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    const id = ev.target.value
    const template = templates.find(t => t.id === id)
    const slug = template.defaultThemeSlug
    router.push(`/temp/${slug}`)
  }

  return (
    <div style={{ display: 'grid', gap: 16, padding: 32 }}>
      <select style={{ width: 200 }} defaultValue={template.id} onChange={handleTemplateChange}>
        {!Boolean(templates.length) ? (
          <option key={template.id}>{template.title}</option>
        ) : (
          templates.map(({ id, title }) => (
            <option key={id} value={id}>
              {title}
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
        {themes.map(({ slug, title, thumbnailUrl }) => (
          <Link key={slug} href={`/temp/${slug}`} shallow>
            <a
              onClick={() => setTheme(slug)}
              key={slug}
              style={{
                background: theme.slug === slug ? 'pink' : 'black',
                display: 'block',
              }}>
              <img src={thumbnailUrl} style={{ width: 100, height: 50, objectFit: 'cover' }} />
              <h2>{title}</h2>
              <small>{slug}</small>
              <button
                style={{ width: '100%' }}
                onClick={ev => {
                  ev.preventDefault()
                  ev.stopPropagation()
                  deleteTheme(slug)
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
  const slug = params.slug as string
  const { data, error } = await db.getTemplate(slug)
  if (error) return { notFound: true }
  return {
    props: { slug, data },
    revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await supabase
    .from<definitions['themes']>('themes')
    .select('slug')
    .is('deleted_at', null)
  const paths = data.map(({ slug }) => ({ params: { slug } }))
  return { paths, fallback: 'blocking' }
}

export default Test
