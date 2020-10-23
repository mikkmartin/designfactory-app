# Document generator

A project that generates pdf documents from design templates from figma + your own data via the GUI or REST API.

## Development

Run with with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the development:

```bash
npm run dev
# or
yarn dev
```

## Todo

- [ ] Support editing more fields
- [ ] Persist input data from the GUI
- [ ] Support multiple pages/page overflow
- [ ] Add a better GUI editing experience (possibly [Monaco editor with a JSON schema](https://microsoft.github.io/monaco-editor/playground.html#extending-language-services-configure-json-defaults))
- [ ] Use live template data via the [Figma API](https://www.figma.com/developers/api)
- [ ] Add support for multiple designs

## Deploy your own

Clone and deploy with [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/mikkmartin/dok-maker)

## Notes

This is bootstrepped with the Nextjs example [with-typescript-styled-components](https://github.com/vercel/next.js/tree/canary/examples/with-typescript-styled-components).
