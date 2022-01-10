import { definitions } from 'data/db/types'
import { FileResponse } from '@mikkmartin/figma-js'
import { makeAutoObservable } from 'mobx'

type ThemeData = definitions['themes']

export class ThemeStore {
  slug: ThemeData['slug']
  title: ThemeData['title']
  created_at: ThemeData['created_at']
  modified_at: ThemeData['modified_at']
  deleted_at: ThemeData['deleted_at']
  owner_template_id: ThemeData['owner_template_id']

  loading: boolean = true
  data: FileResponse = null

  constructor(themeData: ThemeData) {
    Object.assign(this, themeData)
    makeAutoObservable(this)
  }
}
