import { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { useCanvas } from '../store/CanvasProvider'
import { useEditor } from 'components/Editor'

export const Box = ({ children, ...props }) => {
  let overrideUrl = null
  const [isLoading, setIsLoading] = useState(false)
  const { editable } = useCanvas()
  const { data } = useEditor()

  if (props.style.background.includes('url')) {
    const overrideValue = Object.entries(data).find(([key]) => {
      return Object.keys(data).find(k => k === key)
    })[1] as string
    if (typeof overrideValue === 'string' && overrideValue.length > 0) {
      if (overrideValue) overrideUrl = overrideValue
      if (!editable) props.style.background = `url(${overrideUrl}) center center / cover no-repeat`
    }
  }

  useEffect(() => {
    if (!overrideUrl) return
    try {
      setIsLoading(true)
      const imageLoader = new Image()
      imageLoader.src = overrideUrl
      imageLoader.onload = () => {
        props.style.background = `url(${overrideUrl}) center center / cover no-repeat`
        setIsLoading(false)
      }
    } catch (e) {
      console.error(e)
    }
  }, [overrideUrl])

  return (
    <Container hasOverRide={isLoading} {...props}>
      {children}
    </Container>
  )
}

const Container = styled.div<{ hasOverRide: boolean }>`
  position: relative;
  ${p =>
    p.hasOverRide &&
    css`
      &::before {
        content: '';
        position: absolute;
        backdrop-filter: blur(5px);
        width: 100%;
        height: 100%;
      }
      &::after {
        content: '';
        background: #ffff00c5;
        position: absolute;
        width: 150%;
        left: -25%;
        top: 48%;
        height: 2%;
        transform: rotate(45deg);
        animation: reflect 0.5s linear infinite;
      }
      @keyframes reflect {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(180deg);
        }
      }
    `}
`
