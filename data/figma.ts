import * as Figma from '@mikkmartin/figma-js'

const personalAccessToken = process.env.FIGMA_TOKEN
const client = Figma.Client({ personalAccessToken })

export const getTemplate = async (id: string) =>
  client
    .file(id, { geometry: 'paths' })
    .then(({ data, request }) => ({ data, error: request.error }))

export const getImage = async (id: string, ids: string[]) =>
  client.fileImages(id, { scale: 2, format: 'png', ids })
