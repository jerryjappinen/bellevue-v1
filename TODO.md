
# To do

## Pipeline

- [ ] Upgrade to Node 8
- [ ] Enable app icon generation based on config rather than crudely commenting it out
- [ ] Support local Webpack config files outside of version control
	- Example: set different ports for local dev server
- [ ] Inject vendor script/style links to HTML based on configuration instead of manually adding them to `index.html.ejs`
- [ ] More full-featured `index.html.ejs` templating
	- Add more full-featured meta tags
	- https://github.com/jantimon/favicons-webpack-plugin
	- https://github.com/jantimon/html-webpack-plugin#third-party-addons
- [ ] Move `build/` and `config/` on root level under `webpack/`
	- Ensure path helpers work under subfolders

## Application code

- [ ] Move panel persistence to `<App>`
- [ ] Refactor `pad.scss`
	- Stay consistent with the tight-loose pattern used elsewhere
	- Allow setting vertical and horizontal in constants
- [ ] Some kind of env/device service
	- Feature detection
	- Touch vs. no touch
	- Wrap Modernizr?
- [ ] Integrate client-side form/input validation
	- https://github.com/vuejs/awesome-vue#validation
- [ ] Try `vue-supply`, `vue-apollo` and GraphQL
	- https://github.com/Akryum/vue-supply
- [ ] Support lazy loading localisation files
	- Docs: http://kazupon.github.io/vue-i18n/en/
	- Simple example: https://kazupon.github.io/vue-i18n/en/migrations.html#features

## Vuex

- [ ] Split Vuex state management into modules and perhaps multiple files
- [ ] Persist Vuex state: https://github.com/vuejs/awesome-vue#persistence

## Test automation

- [ ] Get unit tests to work as expected
- [ ] Add tests for services
- [ ] Update E2E tests to pass

## Components

- [ ] Small checkmark element
- [ ] Email, password
- [ ] Number fields
- [ ] Date picker
- [ ] Reliable in-place popover positioning
- [ ] Click handling and blur events for closing in-place popover

## Investigate

- [ ] Running only some tests from command line
- [ ] Prerendering
- [ ] Exposing configuration values to SCSS
- [ ] Exposing SCSS constants with JS
- [ ] Injecting services into root Vue object
	- Better to have them consistently accessed via `this.$popovers` than locally renamed each time?
	- Could they be created with root object as `parent`?

### Code intelligence

- [ ] VS Code IntelliSense
	- Is there something we can do to improve the support?
	- Formatted comments?
	- Manifest files?
	- More workspace configuration?
	- VS Code still has troubles understanding Webpack aliases
		- `jsconfig.json` and `tsconfig.json` could be configured with the same aliases to make this work
- [ ] Typing with Flow?
	- https://medium.freecodecamp.com/why-use-static-types-in-javascript-part-1-8382da1e0adb
	- https://flow.org/
	- https://alligator.io/vuejs/components-flow/

### TypeScript support?

- Integrate `.ts` support into pipeline
- Integrate `.ts` support in Vue components, services, models...
- Convert existing code into TS
- Provide type hints etc.
- https://vuejs.org/v2/guide/typescript.html

Makes code more robust, can improve IDE experience. Rapid iteration might get more complicated, introduces some more "boilerplate" code that needs to be manually maintained.

Some parts of the codebase, like models, utility libraries, state management, might benefit a lot from this. On the other hand simple single-file Vue components are mostly template and style-driven, and the view model code is almost never accessed by anything outside the component. Vue components have props (input), for which Vue has a validation feature.

TS features can be introduced gradually as features mature, but we still want to demo and try out new things fast without cumbersome code quality requirements (situation is similar with automated tests).

### Automation

Can we improve the pipeline to automate redundant tasks? Things such as the following cause a lot of boilerplate code that has to be manually maintained:

- [x] Importing and declaring child components
- [x] Importing and declaring directives used in components
- [x] Explicitly renaming child components locally
- [ ] Explicitly importing services in each component
- [ ] Explicitly importing shared SCSS in `.vue` files
- [ ] Ensuring dependencies are up to date (directives and plugins imported in components must be installed via npm and `package.json` up to date)
- [ ] Webpack disallows dynamic requiring just like ES6 imports, but `require.context` could perhaps be used to improve automation
