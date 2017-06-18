
# Bellevue

**Bellevue** is a full-featured frontend project template for modern single-page applications built on Vue.js and Webpack.

- Demo: [vue.netlify.com](https://vue.netlify.com/)
- Documentation: [eiskis.gitbooks.io/bellevue](https://eiskis.gitbooks.io/bellevue/)
- Source and issues: [github.com/Eiskis/bellevue](https://github.com/Eiskis/bellevue)

Bellevue is based on the official `vuejs-templates/webpack` template, but extends it with many additional tooling features such as preconfigured SCSS support, SVG sprites, more full-featured linting and centralised configuration.

But while the official template is only a _Hello world_, Bellevue's goal is to set you up with a well-documented, [thought-out application structure](https://eiskis.gitbooks.io/bellevue/app/overview.html) with all the patterns you need for building a complex application including routing, state management, persistence, localisation and more (see [feature comparison](https://eiskis.gitbooks.io/bellevue/overview/comparison.html)).

## Requirements

1. The Node version defined in [`.nvmrc`](./.nvmrc)

The easiest way to manage node versions is using [nvm](https://github.com/creationix/nvm).

## Project setup

```sh
# Clone repo
git clone git@github.com:Eiskis/bellevue.git my-app
mkdir my-app

# Install dependencies
npm install
```

## Building and testing

```sh
# Serve with hot reload
npm run dev

# Serve with hot reload on a specific port
PORT=1234 npm run dev

# Build for production with minification
npm run build

# Build for production and view the bundle analyzer report
npm run build --report

# Run all linters
npm run lint

# Run unit tests
npm run unit

# Run e2e tests
npm run e2e

# Run all tests
npm run test

# Generate all docs
npm run docs
```

See all scripts in [`package.json`](./package.json).

## Contributing

Do you want to contribute to the template?

- Please [file an issue](https://github.com/Eiskis/bellevue/issues) if you have a suggestion, bug report or a question.
- Send a [pull request](https://github.com/Eiskis/bellevue/pulls) to contribute code.

You can also [help improve the documentation on GitHub](https://github.com/Eiskis/bellevue-docs).
