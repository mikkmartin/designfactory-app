import { useRef } from 'react'
import styled, { css } from 'styled-components'
import { observer } from 'mobx-react-lite'
import { store } from 'data'
import { Button } from 'components/ui'
import { Copy } from 'components/icons'
import baseURL from 'lib/static/baseURL'

const space = ['  ', '    ']

export const Code = observer(() => {
  const { inputData, theme } = store.content.template
  const { uiSchema } = theme
  const slug = theme.slug
  const codeRef = useRef<HTMLElement>(null)

  const handleCopy = () => {
    if (!codeRef.current) return
    const text = codeRef.current.innerText
    navigator.clipboard.writeText(text)
  }

  const params = Object.entries(uiSchema).reduce((acc, [key, value]) => {
    let pair = [key, value]
    if (inputData[key]) pair[1] = inputData[key]
    else pair[1] = value['ui:placeholder']
    return [...acc, pair]
  }, [])

  return (
    <Container>
      <code ref={codeRef}>
        <Tag>{`<meta `}</Tag>
        <Property>{'property'}</Property>
        <Op>=</Op>
        <String>{`"og:image" `}</String>
        <Property>content</Property>
        <Op>=</Op>
        {params.length < 2 ? (
          <SingleLine params={params} slug={slug} />
        ) : (
          <MultiLine params={params} slug={slug} />
        )}
        <Tag>{`/>`}</Tag>
        <br />
        <Tag>{'<meta '}</Tag>
        <Property>{'property'}</Property>
        <Op>=</Op>
        <String>"twitter:card" </String>
        <Property>content</Property>
        <Op>=</Op>
        <String>"summary_large_image"</String>
        <Tag>{`/>`}</Tag>
      </code>
      <Button small onClick={handleCopy}>
        <Copy />
      </Button>
    </Container>
  )
})

const SingleLine = ({ params, slug }) => {
  return (
    <>
      <String>{`"${baseURL}/og/${slug}.png`}</String>
      <String>
        {params.map(([key, value]) => {
          return (
            <>
              <String>?{key}=</String>
              <String highlight>{value}</String>
            </>
          )
        })}
      </String>
      <String>{`"`}</String>
    </>
  )
}
const MultiLine = ({ params, slug }) => {
  return params.map(([key, value], i) => (
    <>
      <Tag>
        {i === 0 ? (
          <String>
            <Tag>{'{'}</Tag>
            <br />
            {space[1]}
            {'`'}
            {baseURL}/files/{slug}
            {'.png`'}
            <Op>{' +'}</Op>
            <br />
          </String>
        ) : (
          <>
            <span className="green">{'`'}</span>
            <Op>{' +'}</Op>
            <br />
          </>
        )}
        <String>{space[1] + '`' + (i === 0 ? '?' : '&') + key}=</String>
      </Tag>
      <String highlight>{value}</String>
      {params.length === i + 1 && (
        <>
          <String>{'`'}</String>
          <Tag>
            <br />
            {space[0]}
            {'}'}
          </Tag>
          <br />
        </>
      )}
    </>
  ))
}

const Tag = styled.span`
  color: #569cd6;
`
const Property = styled.span`
  color: #9cdcfe;
`
const String = styled.span<{ highlight?: boolean }>`
  color: #ce9178;
  ${p =>
    p.highlight &&
    css`
      background: rgba(255, 178, 147, 0.15);
      border-radius: 2px;
      padding: 0 2px;
    `}
`
const Op = styled.span`
  color: #d8d8d8;
`

const Container = styled.pre`
  background: #1a1e25;
  border-radius: 4px;
  display: grid;
  font-family: inherit;
  margin: 24px;
  position: relative;
  code {
    font-family: inherit;
    position: absolute;
    inset: 0;
    padding: 24px 48px 24px 24px;
    overflow: auto;
  }
  button {
    margin: 8px;
    grid-area: 1 / 1;
    place-self: start end;
    border-radius: 2px;
    background: rgba(40, 44, 52, 0.6);
    backdrop-filter: blur(20px);
    svg {
      opacity: 0.5;
    }
    &:hover svg {
      opacity: 1;
    }
  }
  line-height: 130%;
`
