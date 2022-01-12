import { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import { db, TemplateData } from 'data/db'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import Link from 'next/link'
import { store } from 'data/stores_v2'
import { useRouter } from 'next/router'
import { Canvas } from 'components/Canvas'

type Props = {
  slug: string
  data: TemplateData
}

const Test: NextPage<Props> = observer(() => {
  const { template, templates, setTemplate } = store.content
  const { theme, themes, setTheme, addTheme, deleteTheme } = template
  const [figmaID, setFigmaID] = useState('uhifEQPClI8AdGz3vX667v')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addTheme(figmaID).then(slug => {
      router.replace(`/temp/${slug}`, undefined, { shallow: true })
    })
  }

  const handleTemplateChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    const id = ev.target.value
    const template = templates.find(t => t.id === id)
    const slug = template.defaultThemeSlug
    setTemplate(id)
    router.push(`/temp/${slug}`, undefined, { shallow: true })
  }

  const handleDelete = (ev: React.MouseEvent<HTMLButtonElement>, slug: string) => {
    ev.preventDefault()
    ev.stopPropagation()
    deleteTheme(slug, newSlug => {
      router.replace(`/temp/${newSlug}`, undefined, { shallow: true })
    })
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
      {theme.data?.document && <Canvas template={theme.data} />}
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
