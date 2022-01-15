import { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import { db } from 'lib/db'
import { observer } from 'mobx-react-lite'
import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { store } from 'data/stores_v2'
import { useRouter } from 'next/router'
import { getCookie } from 'cookies-next'
import { ANON_ID } from 'lib/static/cookieKeys'

const Test: NextPage = observer(() => {
  const router = useRouter()
  const slug = router.query.slug as string
  store.content.setTheme(slug)
  const { template, templateOptions } = store.content
  const {
    theme,
    themeOptions,
    addTheme,
    setPreviewTheme,
    previewThemeFile,
    loadTheme,
    deleteTheme,
    cancelAdd,
  } = template

  const setRoute = useCallback((slug: string, replace = false) => {
    if (replace) return router.replace(`/temp/${slug}`, undefined, { shallow: true })
    return router.push(`/temp/${slug}`, undefined, { shallow: true })
  }, [])

  const urlRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const [figmaID, setFigmaID] = useState('')
  const [fileName, setFileName] = useState('')

  const handleInputChange = ev => {
    try {
      const { value } = ev.target
      if (!value) return setFigmaID('')
      const [id] = ev.target.value.split('/file/')[1].split('/')
      if (id) loadPreview(id)
    } catch (e) {
      setFigmaID('')
    }
  }

  const loadPreview = async id => {
    setLoading(true)
    setFigmaID(id)
    const { data } = await loadTheme(id)
    setFileName(data.file.name)
    setLoading(false)
  }

  const handleSubmit = async ev => {
    ev.preventDefault()
    setLoading(true)
    await addTheme(fileName).then(setRoute)
    urlRef.current.value = ''
    setFigmaID('')
    setFileName('')
    setLoading(false)
  }

  const handleDelete = (ev, slug: string) => {
    ev.preventDefault()
    ev.stopPropagation()
    setPreviewTheme(null)
    deleteTheme(slug, newSlug => setRoute(newSlug, true))
  }

  const handleCancel = ev => {
    ev.preventDefault()
    cancelAdd()
  }

  const handleEdit = (ev, { figmaID, duplicate = false }) => {
    ev.preventDefault()
    const url = `https://www.figma.com/file/${figmaID}` + (duplicate ? '/duplicate' : '')
    window.open(url, '_blank').focus()
  }

  useEffect(() => {
    if (!theme.data) theme.loadData()
  }, [theme.data])

  return (
    <div style={{ display: 'grid', gap: 16, padding: 32 }}>
      <select style={{ width: 200 }} defaultValue={slug} onChange={ev => setRoute(ev.target.value)}>
        {!Boolean(templateOptions.length) ? (
          <option key={template.id}>{template.title}</option>
        ) : (
          templateOptions.map(({ id, title, themeOptions }) => (
            <option key={id} value={themeOptions[themeOptions.length - 1].slug}>
              {title}
            </option>
          ))
        )}
      </select>
      <h1>{template.title}</h1>
      <p>{template.description}</p>
      <pre>
        <code>https://www.figma.com/file/B0xXzAaz1QjRiJBRc3z9Ha</code>
      </pre>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 4, maxWidth: 300 }}>
        <input
          type="text"
          placeholder="figma.com/file/B0xXzAaz..."
          ref={urlRef}
          onChange={handleInputChange}
        />
        {Boolean(fileName) && (
          <input
            disabled={loading && !Boolean(figmaID)}
            type="text"
            placeholder="Name..."
            value={fileName}
            onChange={ev => setFileName(ev.target.value)}
          />
        )}
        <div>
          <button type="submit" disabled={!Boolean(figmaID) || loading}>
            {loading ? 'Loading...' : 'Submit'}
          </button>
          {figmaID && <button onClick={handleCancel}>Cancel</button>}
        </div>
      </form>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {[...themeOptions]
          .sort((a, b) => +b.modifiedAt - +a.modifiedAt)
          .map(({ slug, title, thumbnailUrl, size: { width, height }, figmaID, ownerID }) => (
            <Link key={slug} href={`/temp/${slug}`} shallow={true}>
              <a
                key={slug}
                onMouseEnter={() => setPreviewTheme(slug)}
                onMouseLeave={() => setPreviewTheme(null)}
                style={{
                  background: theme.slug === slug ? 'rgb(var(--highlight))' : 'black',
                  color: 'white',
                  display: 'block',
                }}>
                <img
                  src={thumbnailUrl}
                  style={{
                    height: 100,
                    aspectRatio: `${width} / ${height}`,
                  }}
                />
                <h2>{title}</h2>
                <small>{slug}</small>
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                  <button onClick={ev => handleEdit(ev, { figmaID })}>Edit</button>
                  <button disabled={ownerID === null} onClick={ev => handleDelete(ev, slug)}>
                    Delete
                  </button>
                </div>
              </a>
            </Link>
          ))}
      </div>
      <pre>
        {JSON.stringify(
          {
            theme: theme.slug,
            loading: theme.loading,
            themeData: previewThemeFile ? previewThemeFile.name : theme.data?.name,
          },
          null,
          2
        )}
      </pre>
    </div>
  )
})

type Props = {
  data: db.TemplateWithThemes
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ params, req }) => {
  const anonID = getCookie(ANON_ID, { req }) as string | undefined
  const { data } = await db.getTemplate({ anonID })
  const hasSlug = data.some(({ themes }) => themes.some(({ slug }) => slug === params.slug))
  if (!data?.length || !hasSlug) return { notFound: true }
  return {
    props: { data },
  }
}

export default Test
