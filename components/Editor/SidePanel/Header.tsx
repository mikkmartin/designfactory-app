import { store } from 'data/stores_v2'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import { Drawer } from './Drawer'

export const Header = observer(() => {
  const { template, templateOptions } = store.content
  const label = template.title
  const { slug: value } = template.theme
  const router = useRouter()

  const handleChange = slug => {
    router.push(`/temp/${slug}`, undefined, { shallow: true })
  }

  const handleAdd = () => {
    //console.log('add')
  }

  const handleDuplicate = () => {
    //console.log('handleDuplicate()')
  }

  const handleRemove = () => {
    //console.log('handleRemove()')
  }

  return (
    <Drawer
      value={{ label, value }}
      onChange={handleChange}
      onAdd={handleAdd}
      onDuplicate={handleDuplicate}
      onRemove={handleRemove}
      options={
        //[...templateOptions, ...templateOptions, ...templateOptions]
        templateOptions
        .map(({ themeOptions, title }) => ({
        value: themeOptions[0].slug,
        label: title,
      }))}
    />
  )
})
