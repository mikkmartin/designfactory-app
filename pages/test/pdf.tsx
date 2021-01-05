import { PDFViewer, Document } from '@react-pdf/renderer'
import { Page } from 'components/Pdf/Elements/Page'
import * as Figma from '@mikkmartin/figma-js'
import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import baseURL from 'static/baseURL'

const Test: FC<{ pages: Figma.Frame[] }> = ({ pages }) => {
  const [render, setRender] = useState(false)
  useEffect(() => { setRender(true) }, [render])

  if (!render) return null
  return (
    <Container>
      <PDFViewer>
        <Document>
          {pages.map((node, i) => node.visible !== false && <Page key={i} node={node} />)}
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
  const id = 'QBeNqpKnj2exAqyWMNYbWM' //test
  //const id = 'qQJ7d5IKYTCVpaAMNptPH4' //Simple invoice
  //const id = 'Mvq0zGG8sy5EeHNeqjX5L4' // Brutal invoice
  //const id = '9672lt3BzKaOxtdM6yT7f0' // Fun invoices
  const template = await fetch(`${baseURL}/api/figma?template=${id}&pages=yup`)
    .then(r => r.json())
  return {
    props: {
      pages: template
    }, // will be passed to the page component as props
  }
}

export default Test