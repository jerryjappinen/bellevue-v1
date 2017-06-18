
# To do

## Dependencies

- [ ] Upgrade ESLint to version 4
	- `eslint-plugin-node` might still has issues (as of 16 June 2017)
- [ ] Upgrade Webpack loaders

## Tooling

- [ ] Enable app icon generation based on config rather than crudely commenting it out
- [ ] Enable building web app manifest
	- https://www.npmjs.com/package/webpack-manifest-plugin
- [ ] Support local Webpack config files outside of version control
	- Example: set different ports for local dev server
- [ ] Add [`eslint-plugin-vue`](https://github.com/vuejs/eslint-plugin-vue)
- [ ] Add some way of ensuring SCSS imports are correct
	- If SCSS dependencies are not correct, tests might fail (as tests compile SCSS files independently, for some reason)
	- During normal development, user might get no indication that imports are missing in source files because SCSS is normally compiled via `global.scss` or `utilities.scss` where dependencies tend to always be available
	- If we had a command for compiling all SCSS files independently outside of tests, we could test this
- [ ] More thorough set of app icons and tiles for various platforms

## Application code

- [ ] Some kind of env/device service
	- Feature detection
	- Touch vs. no touch
	- Wrap Modernizr?
- [ ] Add responsive thresholds to `viewport` service
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
- [ ] Testing SCSS
	- Visual testing has to be easy with sandbox pages etc.
	- We have some more complicated toolchains producing utility classes with responsive variants etc.
	- http://mts.io/2014/04/02/sass-unit-testing/

## Components

- [ ] Small checkmark element
- [ ] Email, password
- [ ] Number fields
- [ ] Date picker
- [ ] Reliable in-place popover positioning
- [ ] Click handling and blur events for closing in-place popover

## Investigate

- [ ] Preconfiguring server-side rendering
	- Prerendering plugin for Webpack: http://vuejs-templates.github.io/webpack/prerender.html
	- About SSR on Vue: https://vuejs.org/v2/guide/ssr.html
	- Full SSR guide for Vue: https://ssr.vuejs.org/en/
	- Universal apps on Vue: https://nuxtjs.org/
- [ ] Manifest file generation?
	- Caches and offline stuff
	- Web app manifests
	- robots.txt
- [ ] ESLint plugin: File name and export naming conventions: https://github.com/selaux/eslint-plugin-filenames
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

- Integrating `.ts` support into pipeline
- Integrating `.ts` support in Vue components, services, models...
- Converting existing code into TS
- Providing type hints etc.
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
