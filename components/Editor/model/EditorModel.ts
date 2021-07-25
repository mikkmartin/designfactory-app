import { Instance, types } from 'mobx-state-tree'
import { ISchema } from 'components/Canvas/parseTemplate/getSchema'

const TreeNode = types.map(
  types.union(
    types.late(() => TreeNode),
    types.frozen()
  )
)

export const RootModel = types.model('RootModel', {
  fileName: types.string,
  loading: types.boolean,
  data: TreeNode,
  template: types.frozen<{ [key: string]: any }>(),
  downloadUrl: types.optional(types.string, ''),
  schema: types.frozen<ISchema>(),
})

export const RootActions = RootModel.actions(self => ({
  setData: data => (self.data = data),
  setSchema: schema => (self.schema = schema),
  setLoading: (state: boolean) => (self.loading = state),
  setText: (obj: { [key: string]: any }) => {
    const key = Object.keys(obj)[0]
    self.data = { ...self.data.toJSON(), [key]: obj[key] }
  },
}))

export type IEditorData = Instance<typeof RootModel> & Instance<typeof RootActions>
