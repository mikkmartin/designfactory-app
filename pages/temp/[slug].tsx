import { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import { db, TemplateData } from 'data/db'
import { observer } from 'mobx-react-lite'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { store } from 'data/stores_v2'
import { useRouter } from 'next/router'

type Props = {
  slug: string
  data: TemplateData
}

const Test: NextPage<Props> = observer(() => {
  const router = useRouter()
  const slug = router.query.slug as string
  const [previewSlug, setPreviewSlug] = useState<string>(null)

  const { templates, getTemplateWithTheme } = store.content
  const { theme, template } = getTemplateWithTheme(previewSlug || slug)
  const { themes, addTheme, deleteTheme } = template

  const selectedSlug = useMemo(() => theme.slug, [slug])

  const setRoute = useCallback((slug: string, replace = false) => {
    if (replace) return router.replace(`/temp/${slug}`, undefined, { shallow: true })
    return router.push(`/temp/${slug}`, undefined, { shallow: true })
  }, [])

  const [figmaID, setFigmaID] = useState('uhifEQPClI8AdGz3vX667v')

  const handleSubmit = ev => {
    ev.preventDefault()
    addTheme(figmaID).then(setRoute)
  }

  const handleDelete = (ev, slug: string) => {
    ev.preventDefault()
    ev.stopPropagation()
    deleteTheme(slug, newSlug => setRoute(newSlug, true))
  }

  useEffect(() => {
    if (!theme.data) theme.loadData()
  }, [theme.data])

  return (
    <div style={{ display: 'grid', gap: 16, padding: 32 }}>
      <select
        style={{ width: 200 }}
        defaultValue={selectedSlug}
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
              onMouseEnter={() => setPreviewSlug(slug)}
              onMouseLeave={() => setPreviewSlug(null)}
              style={{
                background: selectedSlug === slug ? 'rgb(var(--highlight))' : 'black',
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
          { theme: theme.slug, loading: theme.loading, previewSlug, themeData: theme.data?.name },
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
