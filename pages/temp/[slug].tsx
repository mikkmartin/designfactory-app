import { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import { db, TemplateData } from 'data/db'
import { observer } from 'mobx-react-lite'
import { useCallback, useState } from 'react'
import Link from 'next/link'
import { store } from 'data/stores_v2'
import { useRouter } from 'next/router'

type Props = {
  slug: string
  data: TemplateData
}

const Test: NextPage<Props> = observer(() => {
  const router = useRouter()

  const { templates, getTemplateWithTheme } = store.content
  const { theme, template } = getTemplateWithTheme(router.query.slug as string)
  const { themes, addTheme, deleteTheme } = template

  const setRoute = useCallback((slug: string, replace = false) => {
    if (replace) router.replace(`/temp/${slug}`, undefined, { shallow: true })
    router.push(`/temp/${slug}`, undefined, { shallow: true })
  }, [])

  const [figmaID, setFigmaID] = useState('uhifEQPClI8AdGz3vX667v')

  const handleSubmit = ev => {
    ev.preventDefault()
    addTheme(figmaID).then(setRoute)
  }

  const handleDelete = (ev, slug: string) => {
    ev.preventDefault()
    ev.stopPropagation()
    deleteTheme(slug, setRoute)
  }

  return (
    <div style={{ display: 'grid', gap: 16, padding: 32 }}>
      <select
        style={{ width: 200 }}
        defaultValue={theme.slug}
        onChange={ev => setRoute(ev.target.value)}>
        {!Boolean(templates.length) ? (
          <option key={template.id}>{template.title}</option>
        ) : (
          templates.map(({ id, title, defaultThemeSlug }) => (
            <option key={id} value={defaultThemeSlug}>
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
          <Link key={slug} href={`/temp/${slug}`} shallow={true}>
            <a
              key={slug}
              style={{
                background: theme.slug === slug ? 'rgb(var(--highlight))' : 'black',
                color: 'white',
                display: 'block',
              }}>
              <img src={thumbnailUrl} style={{ width: 100, height: 50, objectFit: 'cover' }} />
              <h2>{title}</h2>
              <small>{slug}</small>
              <button style={{ width: '100%' }} onClick={ev => handleDelete(ev, slug)}>
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

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  const slug = params.slug as string
  const { data, error } = await db.getTemplate(slug)
  if (error) return { notFound: true }
  return {
    props: { slug, data },
  }
}

export default Test
