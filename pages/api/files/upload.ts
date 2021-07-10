import Formidable from 'formidable'
import sharp from 'sharp'

export const config = {
  api: {
    bodyParser: false,
  },
}

const uploadForm = next => (req, res) => {
  return new Promise(async resolve => {
    try {
      const form = new Formidable.IncomingForm()
      form.once('error', console.error)
      form.on('aborted', () => console.warn('Upload aborted...'))

      await form.parse(req, async (err, _, files) => {
        if (err) throw String(JSON.stringify(err, null, 2))
        const folder = '/public/mockups'

        await sharp(files.file.path).resize(1000).toFile(`${folder}/temp.png`)
        return resolve(next(req, res))
      })
    } catch (error) {
      return resolve(res.status(403).send(error))
    }
  })
}

function handler(req, res) {
  try {
    if (req.method === 'POST') {
      res.status(200).send(req.form)
    } else {
      throw String('Method not allowed')
    }
  } catch (error) {
    res.status(400).json({ message: JSON.stringify(error, null, 2) })
  }
}

export default uploadForm(handler)
