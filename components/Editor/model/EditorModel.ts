import { Instance, types } from 'mobx-state-tree'
import { ISchema } from 'components/Canvas/parseTemplate/getSchema'

export const RootModel = types.model('RootModel', {
  fileName: types.string,
  loading: types.boolean,
  data: types.maybe(types.frozen<{ [k: string]: string }>()),
  template: types.frozen<{ [key: string]: any }>(),
  downloadUrl: types.optional(types.string, ''),
  schema: types.frozen<ISchema>(),
})

export const RootActions = RootModel.actions(self => ({
  setData: data => (self.data = data),
  setSchema: schema => (self.schema = schema),
  setLoading: (state: boolean) => (self.loading = state),
}))

export type IEditorData = Instance<typeof RootModel> & Instance<typeof RootActions>
