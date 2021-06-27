import { monaco } from 'react-monaco-editor'

export const theme: monaco.editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    {
      background: '282C34',
      token: '',
    },
  ],
  colors: {
    'editor.background': '#282C34',
  },
}
