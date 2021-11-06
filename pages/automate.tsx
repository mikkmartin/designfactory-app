import { parseMetaTags } from 'lib/parseMetatags'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const Automate: NextPage = () => {
  const [items, setItems] = useState<string[]>([])
  const [slugs, setSlugs] = useState([])
  const [slug, setSlug] = useState('story2-c6wjq')
  const [metaTags, setMetaTags] = useState<{ [key: string]: string }[]>()
  const [opened, setOpened] = useState(0)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    fetch('/api/files')
      .then(res => res.json())
      .then(json => setSlugs(json.map(t => t.slug)))
  }, [])

  const handlePaste = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    const lines = value.split(' ')
    setItems(lines)
  }

  const handleFetchHtml = async () => {
    const htmlPages = await Promise.all(
      items.map(async item => {
        const res = await fetch(item)
        const html = await res.text()
        return html
      })
    )
    const parsedTags = htmlPages.map(parseMetaTags)
    setMetaTags(parsedTags)
  }

  return (
    <Container>
      <h1>Automate</h1>
      <div className="links">
        <input type="text" placeholder="Links..." onChange={handlePaste} />
        <select value={slug} onChange={e => setSlug(e.currentTarget.value)}>
          {slugs.length &&
            slugs.map(_slug => (
              <option key={_slug} value={_slug}>
                {_slug}
              </option>
            ))}
        </select>
        <button onClick={() => setRefreshKey(k => k + 1)}>refresh</button>
        <button onClick={handleFetchHtml}>Parse</button>
      </div>
      <ul>
        {items.map((item, i) => {
          const meta = metaTags?.[i]
          return (
            <li key={i} onClick={() => setOpened(i)}>
              <div>
                <a href={item} target="_blank">
                  {item}
                </a>
                {meta && opened === i && <pre>{JSON.stringify(meta, null, 2)}</pre>}
              </div>
              {meta && (
                <Image
                  key={`${i}-${refreshKey}`}
                  className={opened === i ? 'open' : 'closed'}
                  meta={meta}
                  slug={slug}
                />
              )}
            </li>
          )
        })}
      </ul>
    </Container>
  )
}

const Image = ({ meta, slug, className }) => {
  if (!meta) return null
  const title = meta['twitter:title'] || ''
  const description = meta['twitter:description'] || ''
  const image = meta['og:image'] || ''

  return (
    <img
      className={className}
      src={`files/${slug}.png?title=${title}&description=${description}&hero-image=${image}`}
      alt="twitter"
    />
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: black;
  padding: 2rem;
  height: 100vh;
  overflow: auto;
  .links {
    display: flex;
    justify-content: stretch;
    input {
      flex: 1;
    }
    button {
      padding: 1rem;
    }
  }
  li {
    list-style: none;
    padding: 1rem;
    border: 1px solid yellow;
    display: flex;
    justify-content: space-between;
    > div {
      flex: 1;
      overflow: auto;
    }
    img {
      height: 50px;
      &.open {
        height: 400px;
      }
    }
  }
`

export default Automate
