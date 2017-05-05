# Misc. notes about this project

## Development

### Vue

- Excellent guides and documentation at [vuejs.org](https://vuejs.org/v2/guide/).
- Curated list of awesome things related to Vue.js available at [github.com/vuejs/awesome-vue](https://github.com/vuejs/awesome-vue).
- Looong list of popuplar components and libraries: [github.com/vuejs/awesome-vue#components--libraries](https://github.com/vuejs/awesome-vue#components--libraries)

### Webpack

- Webpack seems to understand the codebase very well and enable a lot of very advanced features.
- A lot of imports have to be (manually) maintained to enable this though
- Only seems to need restarting when core config is updated, otherwise recompiling and hot reload work out of the box very reliably
- `vue-loader` is the thing that sits between `.vue` single file components and Webpack, which should be extended for component-specific things
- Extending Webpack seems like a viable option for further automation in codebase
	- Automating `.js` imports
	- Automating `.scss` @imports
	- Generating stats/reports (on automated features)?

### Coding conventions

- Based on the official webpack project structure
	- https://github.com/vuejs-templates/webpack
	- Vuex support has been added
	- Non-trivial global SCSS styles have been added (loaded by root component)
	- Running tests in Chrome instead of PhantomJS (this is easily configurable)
	- Custom components showcasing common patterns and features added
- ESLint is extensively supported and has been has been configured
	- Available ESLint rules: http://eslint.org/
- Other conventions
	- Defaults in component properties and methods
		- Try to set boolean defaults to false.
		- Developers then know that in order to change default behavior, they have to explicitly set something to true.

### IDEs

- Browser will show errors the same way regardless of IDE
- Sublime Text
	- Linting experience is quite good with Sublime Linter and its extensions
	- Easy setup
	- Lightweight development experience
- Need to investigate Visual Studio Code
	- Expectations
		- Great support for modern web development
		- Easy set-up
		- Fast iteration cycles, meaningful updates month-over-month
		- Well equipped for TS support
	- Added extensions
		- `change-case`
		- `EditorConfig`
		- `ESLint` (workspace config included in project)
		- `File Utils`
		- `Incremator`
			- Default key bindings clash on Mac
			- Can be easily adjusted
			- https://code.visualstudio.com/docs/getstarted/keybindings#_keyboard-shortcuts-editor
		- `stylelint` (workspace config included in project)
		- `Sublime Text Keymap`
		- `vue`
		- `Vue 2 Snippets`
	- Adjusted keybindings
		- Mostly to match Sublime Text better
		- Line up/down
		- Increment and decrement
		- Debug/launch without `F` keys
	- Theming supported well
		- Color schemes supported out of the box
		- Multiple color schemes available out of the box
		- Live preview for color schemes
		- File icons in sidebar disabled by default
		- Install more themes from commands
	- IntelliSense
		- Already get some inline documentation, snippets and parameters
		- Further configuration might be required for full support (component names, props etc.)
	- Problems
		- Does not auto indent new lines when starting from empty non-intended line inside a block
		- Can't yet show all problems in the project at once (only open files)
			- See https://github.com/Microsoft/vscode/issues/13953
			- Linters will of course show all issues in terminal/browser
- Need to investigate WebStorm



# Project features

## Existing features

- Webpack build pipeline
	- Pipeline: http://vuejs-templates.github.io/webpack/
	- `vue-loader`: http://vue-loader.vuejs.org/en/
- ESLint
	- Cascading custom configuration
	- Detailed compilation-time error log and browser integration
- Per-environment configuration
	- See `config/`
- Vue and all its goodies
	- Named transitions with JS callbacks
	- Prop validation
- Single file components as `.vue` files
	- Standard HTML, CSS and JS
- Routing
	- Easy-to-configure named routes
	- Multilevel routes out of the box
	- Selected page comparison and highlight
- Development vs. production modes
	- http://vuejs-templates.github.io/webpack/env.html
- Developer tools
	- Amazing hot reload for development
		- No browser plugin needed
		- Super fast
		- Preserves state, swaps components real time
		- Shows ESLint errors
		- https://webpack.js.org/concepts/hot-module-replacement/
	- Vue developer plugin for Chrome
	- Detailed console errors from Vue
- Tests
	- Can be run on multiple browsers
	- Unit tests for components and Vuex
		- `test/unit/`
		- http://vuejs-templates.github.io/webpack/unit.html
	- E2E tests
		- `test/e2e/`
		- http://vuejs-templates.github.io/webpack/e2e.html
- Resolving asset URLs
	- http://vue-loader.vuejs.org/en/configurations/asset-url.html
- CSS pipeline
	- CSS extraction for most popular CSS pre-processors (LESS, SASS, Stylus, and PostCSS)
	- To use a pre-processor, all you need to do is installing the appropriate webpack loader for it
	- Autoprefixing included
	- http://vuejs-templates.github.io/webpack/pre-processors.html
	- SCSS and global styling structure added (mixins, custom functions etc.)
	- More features: http://vue-loader.vuejs.org/en/ (scoped styles etc.)
- HTML cleanup
	- Comments => gone
- `[vuex](http://vuex.vuejs.org/en/intro.html)` for state management
	- Trivial counter app example: [jsfiddle.net/n9jmu5v7/341](https://jsfiddle.net/n9jmu5v7/341/)
	- More complex example: https://github.com/vuejs/vuex/tree/dev/examples/shopping-cart
- Need to add `browserslist` in package.json
	- Used by Autoprefixer in PostCSS
	- Can further be used by linters to warn for incompatible code
- (S)CSS linting
	- Works on command line
	- Works for global `.scss` and `.vue` files
	- Cascading configuration
	- https://stylelint.io/
	- https://github.com/vuejs/vue-loader/issues/303#issuecomment-259328193
	- https://medium.com/lost-bananas/linting-css-in-vue-files-6bb20faac0f2



## Missing features

- Better `README`
	- How to use pipeline, how to code, how the pipeline works, how to adjust local variables etc.

### Missing client-side

- Offline handling
	- Requires some manifest files etc. plus UI work
- Input validation
	- `vue-validator`
- Vue directives
	- Simple to add via `main.js`
	- Rarely needed though
- Backend integration, authentication and fetching data
	- `vue-resource`
	- http://vuejs-templates.github.io/webpack/backend.html
	- http://vuejs-templates.github.io/webpack/proxy.html
	- https://router.vuejs.org/en/advanced/data-fetching.html
- Custom plugins
	- Easy to add
	- https://vuejs.org/v2/guide/plugins.html
- Localisation
	- https://github.com/vuejs/awesome-vue#i18n
- Authentication
	- https://github.com/vuejs/awesome-vue#authenticationauthorization
- Persistent state
	- Trivial, just save and load Vuex state to local storage
- Splitting global state management
	- Vuex supports modules
	- Multiple stores?
	- What are the best practices for this? Need to look at a real application

### Problems/missing in pipeline

- SCSS
	- Doesn't seem to play nice with PostCSS
	- Linting has unknown errors
	- Tests break as for some reason all SCSS gets compiled
	- Every component gets a "Unclosed string CssSyntaxError" from `shared.scss`
	- For some reason, pipeline tries to compile all SCSS files independently?
	- This will break SCSS that relies on manifest files doing imports
	- It might be worth it to switch to fully PostCSS-based pipeline with specific extra features added
		- Variables
		- For loops
		- If conditions
		- Functions
		- Mixins
		- Nested selectors
		- Imports?
- PostCSS configuration
	- Custom config for Autoprefixer missing, probably not needed
	- Need to decide possible other plugins to use: http://postcss.parts/
- HTML linting
	- https://stylelint.io/
- SVG pipeline
	- Need to add via webpack
- Do we care about using TypeScript?
	- Can improve IDE experience
	- Makes code more robust
	- Rapid iteration might get more complicated
	- Introduces some more "boilerplate" code
	- Might make sense for more mature features, but we still want to demo and try out new things fast without cumbersome code quality requirements (same with tests)
	- https://vuejs.org/v2/guide/typescript.html
- Server-side rendering
	- We're dealing with fresh data all the time (so we need true SSR, not build-time prerendering)
	- If we implement embedded widgets, prerendering might be useful for those (abuse report form etc.)
	- Prerendering plugin for this pipeline: http://vuejs-templates.github.io/webpack/prerender.html
	- About SSR on Vue: https://vuejs.org/v2/guide/ssr.html
	- Full SSR guide for Vue: https://ssr.vuejs.org/en/
	- Universal apps on Vue: https://nuxtjs.org/
- ESLint plugins for enhanced IDE integration
	- Curated list of what's out there: https://github.com/dustinspecker/awesome-eslint
	- https://github.com/amilajack/eslint-plugin-compat
	- https://github.com/sheerun/prettier-standard

Did not test E2E, needs a JDK installed in order to be run from the command line.

### Missing examples

- Component template with all supported functionality
	- $watching
	- Lifecycle hooks
- Unit tests for custom components



## Questions

- What are the most relevant practical samples we should look at?
	- https://vuejs.org/v2/examples/
- How complex should we make global state management?
	- Simple custom Vue services work very nicely
	- But Vuex is the "official" solution
	- Vuex integrates into Vue dev tools
	- "If you’re coming from React, you may be wondering how vuex compares to redux, the most popular Flux implementation in that ecosystem. Redux is actually view-layer agnostic, so it can easily be used with Vue via some simple bindings. Vuex is different in that it knows it’s in a Vue app. This allows it to better integrate with Vue, offering a more intuitive API and improved development experience."
- Could SCSS be tested somehow?
	- We have some more complicated toolchains producing utility classes with responsive variants etc.
	- http://mts.io/2014/04/02/sass-unit-testing/
	- Also need a test page for quick manual visual testing
- Can we improve the pipeline to automate redundant tasks
	- Importing child components
	- Explicitly renaming child components locally
	- Importing shared SCSS
	- Using Webpack aliases to mitigate need for relative paths (see `webpack.*.conf.js`)
- What should our conventions be?
	- At some point we will have a project structure and pipeline - but how do we use it effectively to write good UIs that scale?
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
- How and where do we build for production?
	- Local building works fine but production builds should be done via CI
	- Do we need to test production builds separately? They can look quite different from dev builds (no hot reload module swapping, minified single-file code etc.)
