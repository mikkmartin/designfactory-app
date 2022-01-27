import { store } from 'data'
import { observer } from 'mobx-react-lite'

const temp3 = observer(() => {
  const { showThemePreview, showTutorialToolTip, setThemePreview, setTutorialToolTip } =
    store.ui.settings

  return (
    <div style={{ padding: '2rem' }}>
      <button onClick={() => setThemePreview(!showThemePreview)}>toggle1</button>
      <button onClick={() => setTutorialToolTip(!showTutorialToolTip)}>toggle1</button>
      <pre>{JSON.stringify({ showThemePreview, showTutorialToolTip }, null, 2)}</pre>
    </div>
  )
})

export default temp3
