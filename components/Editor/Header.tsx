import { useEditor } from '../Editor'
import { defaults } from '../../static/invoice'
import styled, { css } from 'styled-components'
import { Info, Droplet, Download } from '../Icons'
import { useState } from 'react'
import { Button } from './Button'
import { Drawer } from './Drawer'

export type PanelState = 'templates' | 'info' | 'addtemplate' | false

export const Header = () => {
  const { json, blobUrl } = useEditor()
  const fileName = json.fileName || defaults.fileName
  const linkAttributes = blobUrl ? { href: blobUrl, download: fileName } : {}
  const [openPanel, setOpenPanel] = useState<PanelState>(false)
  const panels = ['info', 'templates', 'addtemplate']

  return (
    <Container>
      <h1>{fileName}</h1>
      <div className="buttons">
        {['info', 'templates'].map(name =>
          <TabButton
            name={name}
            state={openPanel}
            onClick={state => setOpenPanel(state)} />
        )}
        <a {...linkAttributes}>
          <Button primary>
            <Download />
          </Button>
        </a>
      </div>
      <Drawer panels={panels} panel={openPanel} setOpenPanel={(state) => setOpenPanel(state)} />
    </Container>
  )
}

const TabButton = ({ name, state, onClick }) => {
  const icon = () => {
    switch (name) {
      case 'info':
        return <Info />
      case 'templates':
        return <Droplet />
    }
  }

  const handleClick = () => {
    if (state === name) onClick(false)
    else onClick(name)
  }

  return (
    <Button onClick={handleClick} selected={state === name}>
      {icon()}
    </Button>
  )
}

const Container = styled.div`
  height: 56px;
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 24px;
  h1 {
    font-size: 16px;
    font-weight: 300;
  }
  .buttons {
    display: flex;
  }
`
