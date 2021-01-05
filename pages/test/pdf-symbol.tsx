import { PDFViewer, Document } from '@react-pdf/renderer'
import { Page } from 'components/Pdf/Elements/Page'
import { Node, Frame, Component } from '@mikkmartin/figma-js'
import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { TemplateProvider } from 'components/TemplateContext'
import baseURL from 'static/baseURL'

const Test: FC<{ template: Node[] }> = ({ template }) => {
  const [render, setRender] = useState(false)
  useEffect(() => { setRender(true) }, [render])
  const pages = template.filter(node => node.type === 'FRAME' && node.visible !== false) as Frame[]
  const components = template.filter(node => node.type === 'COMPONENT') as Component[]

  if (!render) return null
  return (
    <Container>
      <PDFViewer>
        <Document>
          <TemplateProvider components={components} >
            {pages.map((node, i) => <Page key={i} node={node} />)}
          </TemplateProvider>
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