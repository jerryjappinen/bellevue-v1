# Misc. notes about the project

## Existing features

- Vue and all its goodies
	- Named transitions with JS callbacks
	- Prop validation
- Routing
	- Easy-to-configure named routes
	- Multilevel routes out of the box
	- Selected page comparison and highlight
- Webpack build pipeline
- ESLint
	- Cascading custom configuration
	- Detailed compilation-time error log and browser integration
- Development vs. production modes
	- http://vuejs-templates.github.io/webpack/env.html
- Developer tools
	- Hot reload for development
		- No browser plugin needed
		- Preserves state
		- Shows ESLint errors
		- https://webpack.js.org/concepts/hot-module-replacement/
	- Vue developer plugin for Chrome
	- Detailed console errors from Vue
- Unit tests
	- `test/unit/`
	- http://vuejs-templates.github.io/webpack/unit.html
- E2E tests
	- `test/e2e/`
	- http://vuejs-templates.github.io/webpack/e2e.html
- Good project structure documentation
	- Pipeline: http://vuejs-templates.github.io/webpack/
	- `vue-loader`: http://vue-loader.vuejs.org/en/
- Per-environment configuration
	- See `config/`
- Single file components as `.vue` files
	- Standard HTML, CSS and JS
- Resolving asset URLs
	- http://vue-loader.vuejs.org/en/configurations/asset-url.html
- CSS pipeline
	- "This boilerplate has pre-configured CSS extraction for most popular CSS pre-processors including LESS, SASS, Stylus, and PostCSS. To use a pre-processor, all you need to do is installing the appropriate webpack loader for it. For example, to use SASS"
	- Autoprefixing
	- http://vuejs-templates.github.io/webpack/pre-processors.html
	- SCSS and global styling structure added (mixins, custom functions etc.)
	- More features: http://vue-loader.vuejs.org/en/ (scoped styles etc.)
- HTML cleanup
	- Comments => gone
- `[vuex](http://vuex.vuejs.org/en/intro.html)` for state management
	- Trivial counter app example: [jsfiddle.net/n9jmu5v7/341](https://jsfiddle.net/n9jmu5v7/341/)
	- More complex example: https://github.com/vuejs/vuex/tree/dev/examples/shopping-cart



## Missing features

- Input validation
	- `vue-validator` exists
- Backend integration, authentication and fetching data
	- `vue-resource`
	- http://vuejs-templates.github.io/webpack/backend.html
	- http://vuejs-templates.github.io/webpack/proxy.html
	- https://router.vuejs.org/en/advanced/data-fetching.html
- CSS linting
	- https://stylelint.io/
- SVG pipeline
	- Need to add via webpack
- TypeScript?
	- https://vuejs.org/v2/guide/typescript.html
- Tests
	- Vuex requires configuring Karma with Promise polyfill
	- SCSS not loading as expected: for some reason, pipeline tries to compile all SCSS files independently?
	- Could SCSS be tested somehow?
	- Test cases for custom views
	- Did not test e2e tests (Java stuff)
- Server-side rendering
	- https://vuejs.org/v2/guide/ssr.html
	- http://vuejs-templates.github.io/webpack/prerender.html
- Custom plugins
	- Easy to add though
	- [vuejs.org/v2/guide](https://vuejs.org/v2/guide/plugins.html)
- Custom development docs (i.e. better `README`)
	- How to run in all scenarios (different ports etc.)
- Vue directives
	- Simple to add via `main.js`



## Questions

- What should our conventions be?
	- ESLint allows configuring all of them
	- ES6 requires some education and relearning, but most modern examples use it
- Is configuration available run-time?
	- We should have a place for client-side configuration
	- Things like API paths, some values for controlling UI features (e.g. multiple account thresholds) etc. should be configurable somewhere
	- All config needs to be site-specific
	- Or should we load this from server? Old client needs this stuff too.
- What's the best way to extend the pipeline?
	- Configure through `vue-loader` as much as possible?
	- Add Webpack loaders?
- How do we split our state management and services/actions/utilities?
	- We have Webpack loaders, Vuex modules, Vuex plugins, Vue plugins, and of course external vendor or custom libraries.
- Where should we write custom utilities that don't directly mutate state?
	- Should we write a lot of small libraries? We can `import` everything.
	- We can expose a lot of functionality as Vue plugins
		- Could be separate repos, or integrated into the pipeline (with tests and bootstrapping code)
		- Docs: https://vuejs.org/v2/guide/plugins.html
		- Example 1: https://github.com/iFgR/vue-shortkey/blob/master/src/index.js
		- Example 2: https://github.com/scaccogatto/vue-throttle-event/blob/master/src/index.js
- How does API communication and resource loading work?
	- Should we use `[vue-resource](https://github.com/pagekit/vue-resource)`
- Offline handling



# Documentation

## Vue

- Excellent documentation at [vuejs.org](https://vuejs.org/v2/guide/).
- Curated list of awesome things related to Vue.js available at [github.com/vuejs/awesome-vue](https://github.com/vuejs/awesome-vue).
- Looong list of popuplar components and libraries: [github.com/vuejs/awesome-vue#components--libraries](https://github.com/vuejs/awesome-vue#components--libraries)

## Development

...

## Conventions

- Defaults (component properties and methods)
	- Try to set boolean defaults to false. Developers then know that in order to change default behavior, they have to explicitly set something to true.

