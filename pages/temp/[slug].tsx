import { NextPage } from 'next'
import { GetStaticProps, GetStaticPaths } from 'next'
import { db, TemplateData } from 'data/db'
import { observer } from 'mobx-react-lite'
import { useRef, useState } from 'react'
import { useStore } from 'hooks/useStore'

type Props = {
  data: TemplateData
}

const Test: NextPage<Props> = observer(({ data }) => {
  setInitialData(data)
  const { template } = useStore()
  const { title, description, theme, themes, setTheme, handleAddTheme } = template

  const [figmaID] = useState('uhifEQPClI8AdGz3vX667v')
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleAddTheme(figmaID)
  }

  return (
    <div style={{display: 'grid', gap: 8, padding: '1rem'}}>
      <h1>{title}</h1>
      <p>{description}</p>
      <form onSubmit={handleSubmit}>
        <input type="text" value={figmaID} />
        <button type="submit">Submit</button>
      </form>
      <pre>{JSON.stringify({ loading: theme.loading, themeData: theme.data?.name }, null, 2)}</pre>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        {themes.map(theme => (
          <div style={{background: 'black'}}>
            <input
              type="radio"
              id={theme.id}
              value={theme.id}
              name="theme"
              onChange={ev => setTheme(ev.target.value)}
            />
            <label htmlFor={theme.id}>
              <img style={{ width: 100, height: 50 }} src={theme.thumbnail_url} />
              <h2>{theme.name}</h2>
            </label>
            <button style={{width: '100%'}}>Delete</button>
          </div>
        ))}
      </div>
      <pre>{JSON.stringify({  }, null, 2)}</pre>
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
