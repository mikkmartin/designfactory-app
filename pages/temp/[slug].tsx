import { NextPage } from 'next'
import { GetStaticProps, GetStaticPaths } from 'next'
import { db, TemplateData } from 'data/db'
import { observer } from 'mobx-react-lite'
import { useEffect, useRef, useState } from 'react'
import { useStore } from 'hooks/useStore'
import { useRouter } from 'next/router'
import { supabase } from 'data/db/config'
import { definitions } from 'data/db/types'
import Link from 'next/link'

type Props = {
  slug: string
  data: TemplateData
  error: any
}

const Test: NextPage<Props> = observer(({ slug, data }) => {
  //return <pre>{JSON.stringify({ slug, data }, null, 2)}</pre>
  setInitialData(data, slug)
  const { template } = useStore()
  const {
    title,
    description,
    theme: selectedTheme,
    themes,
    setTheme,
    handleAddTheme,
    handleDeleteTheme,
  } = template

  const [figmaID, setFigmaID] = useState('uhifEQPClI8AdGz3vX667v')
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleAddTheme(figmaID)
  }

  return (
    <div style={{ display: 'grid', gap: 8, padding: '1rem' }}>
      <h1>{title}</h1>
      <p>{description}</p>
      <form onSubmit={handleSubmit}>
        <input type="text" value={figmaID} onChange={ev => setFigmaID(ev.target.value)} />
        <button type="submit">Submit</button>
      </form>
      {/*
      <pre>{JSON.stringify({ loading: theme.loading, themeData: theme.data?.name }, null, 2)}</pre>
      */}
      <pre>{JSON.stringify({ themes: themes.length }, null, 2)}</pre>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        {themes.map(theme => (
          <Link href={theme.slug} shallow>
            <a
              onClick={() => setTheme(theme.slug)}
              key={theme.slug}
              style={{
                background: theme.slug === selectedTheme.slug ? 'pink' : 'black',
                display: 'block',
              }}>
              <img
                src={`https://sdqycteblanimltlbiss.supabase.in/storage/v1/object/public/themes/files/${theme.slug}.png`}
                style={{ width: 100, height: 50, objectFit: 'cover' }}
              />
              <h2>{theme.title}</h2>
              <small>{theme.slug}</small>
              <button
                style={{ width: '100%' }}
                onClick={ev => {
                  ev.preventDefault()
                  ev.stopPropagation()
                  handleDeleteTheme(theme.slug)
                }}>
                Delete
              </button>
            </a>
          </Link>
        ))}
      </div>
      <pre>{JSON.stringify({}, null, 2)}</pre>
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
  const store = useStore()
  if (id.current !== template.id) {
    id.current = template.id
    store.template.setTemplate(template, slug)
  }
}

export default Test
