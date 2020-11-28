export const AddTemplate = () => {
  return (
    <div>
      <h1>Paste in the figma file url</h1>
      <input type="text" placeholder="https://www.figma.com/file/QFHu9LnnywkAKOdpuTZcgE..." />
      <i>
        If the template uses custom fonts – make sure you add them in the parematers (fonts: [])
      </i>
      <button>Add template</button>
    </div>
  )
}