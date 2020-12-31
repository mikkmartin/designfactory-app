import { PDFViewer, Document } from '@react-pdf/renderer'
import { Page } from '../../components/Pdf/Elements/Page'
import * as Figma from '@mikkmartin/figma-js'
import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import baseURL from '../../static/baseURL'

const Test: FC<{ template: Figma.Frame[] }> = ({ template }) => {
  const [render, setRender] = useState(false)
  useEffect(() => { setRender(true) }, [render])
  const pages = template.filter(node => node.type === 'FRAME' && node.visible !== false)
  template.forEach(node => {
    if (node.type !== 'FRAME') console.log(node)
  })

  if (!render) return null
  return (
    <Container>
      <PDFViewer>
        <Document>
          {pages.map((node, i) => <Page key={i} node={node} />)}
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
  const id = 'fhwdSHH1SCvj1Vg4iCQKEX'
  const template = await fetch(`${baseURL}/api/figma?template=${id}&pages=yup`).then(r => r.json())
  return {
    props: {
      template
    }, // will be passed to the page component as props
  }
}

export default Test