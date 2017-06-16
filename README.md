
**Bellevue** is a full-featured frontend project template for modern single-page applications built on Vue.js and Webpack.

- Demo: [vue.netlify.com](https://vue.netlify.com/)
- Documentation: [eiskis.gitbooks.io/bellevue](https://eiskis.gitbooks.io/bellevue/)
- Source and issues: [github.com/Eiskis/bellevue](https://github.com/Eiskis/bellevue)

Bellevue is based on the official `vuejs-templates/webpack` template, but extends it with many additional tooling features such as preconfigured SCSS support, SVG sprites, more full-featured linting and centralised configuration.

But the real difference is in the application code structure: while the official template only produces a Hello world out of the box, Bellevue offers a full set of features and patterns for building a complex application such as routing, state management, persistence, localisation and more. Take a look at the [project structure](https://eiskis.gitbooks.io/bellevue/overview/source) and [feature comparison](https://eiskis.gitbooks.io/bellevue/overview/comparison) to get an overview of what's included.

## Requirements

1. The Node version defined in [`.nvmrc`](./.nvmrc)

The easiest way to manage node versions is using [nvm](https://github.com/creationix/nvm).

## Project setup

``` bash
# install dependencies
npm install
```

## Building and testing

``` bash
# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm run test

# generate all docs
npm run docs

# run all linters
npm run lint
```

See all scripts in [`package.json`](./package.json).
