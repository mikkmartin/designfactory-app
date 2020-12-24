import { PDFViewer, Document, Page, Text } from '@react-pdf/renderer'
import { renderElement } from '../../components/Pdf/Elements/renderElement'
import * as Figma from 'figma-js'
import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { PageProvider } from '../../components/Pdf/PageContext'

const Test: FC<{ pages: Figma.Frame[] }> = ({ pages }) => {
  const [render, setRender] = useState(false)
  useEffect(() => {
    console.log(pages)
    setRender(true)
  }, [render])

  if (!render) return null
  return (
    <Container>
      <PDFViewer>
        <Document>
          {pages.map((page, i) => {
            const { width, height } = page.absoluteBoundingBox
            return (
              <PageProvider key={i} offset={page.absoluteBoundingBox}>
                <Page size={{ width, height }}>
                  {page.children.map(renderElement)}
                </Page>
              </PageProvider>
            )
          })}
        </Document>
      </PDFViewer>
    </Container>
  )
}

const Container = styled.div`
  iframe {
    width: 100%;
    height: 100vh;
    border: 0;
  }
`

export async function getStaticProps() {
  const template = await fetch('http://localhost:3000/api/figma?template=QBeNqpKnj2exAqyWMNYbWM&pages=yup')
    .then(r => r.json())
  return {
    props: {
      pages: template
    }, // will be passed to the page component as props
  }
}

export default Test