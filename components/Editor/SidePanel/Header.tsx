import { store } from 'data/stores_v2'
import styled from 'styled-components'
import { Logo } from 'components/Icons'
import { observer } from 'mobx-react-lite'
import { Dropdown, DropdownSelector } from 'components/ui'
import { useRouter } from 'next/router'

export const Header = observer(() => {
  const { template, templateOptions } = store.content
  const router = useRouter()

  const handleChange = (slug: string) => {
    router.push(`/temp/${slug}`, undefined, { shallow: true })
  }

  return (
    <Container>
      <Dropdown
        onChange={handleChange}
        options={templateOptions.map(({ themeOptions, title }) => ({
          value: themeOptions[0].slug,
          label: title,
        }))}>
        <DropdownSelector>
          <Logo />
          {template.title}
        </DropdownSelector>
      </Dropdown>
    </Container>
  )
})

const Container = styled.div`
  height: 56px;
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .title {
    height: 100%;
    display: flex;
    align-items: center;
    .logo {
      height: 100%;
      width: auto;
    }
    h1 {
      font-size: 16px;
      font-weight: 300;
      width: 1fr;
      text-overflow: ellipsis;
      overflow: hidden;
      height: 1.2em;
      white-space: nowrap;
      padding-right: 4px;
    }
    .buttons {
      display: flex;
      svg {
        pointer-events: none;
      }
    }
  }
`
