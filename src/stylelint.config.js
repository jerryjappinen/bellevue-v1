// Stylelint supports CSS and SCSS
// https://stylelint.io/user-guide/configuration/
// https://stylelint.io/user-guide/rules/
// https://www.npmjs.com/package/stylelint-scss

//
// NOTE
//
// - This file should contain the rules for OUR custom (S)CSS code.
// - The rules defined here should be accompanied with comments explaining the rationale behind the convention.
//
// Other linter files
//
// - Please keep the ROOT `/.stylelintrc` without modifications, as it is the default for most Vue projcts.
// - You can specify further rules in .eslintrc files under sub folders for more granular, cascading rulesets.
// - You can import these rules in other places, like under tests.

// NOTE
// Apparently this does NOT extend root configuration as one would expect
// All settings must be defined here, including processors and plugins

module.exports = {

	// Treat CSS issues as warnings rather than errors
	defaultSeverity: 'warning',

	processors: [
		'stylelint-processor-html'
	],

	plugins: [
		'stylelint-scss',
		'stylelint-order'
	],



	// Coding style

	extends: [
		'stylelint-config-standard'
	],

	rules: {
		'no-empty-source': null,

		// Misc basic things
		'color-no-invalid-hex': true,
		'function-calc-no-unspaced-operator': true,
		'number-leading-zero': 'always',
		'length-zero-no-unit': true,
		'no-extra-semicolons': true,
		'no-eol-whitespace': true,
		'no-missing-end-of-source-newline': true,
		'no-invalid-double-slash-comments': true,
		'declaration-block-no-duplicate-properties': true,
		'declaration-colon-newline-after': null,
		'function-parentheses-newline-inside': 'always-multi-line',
		'block-closing-brace-newline-after': 'always',
		'block-no-empty': true,

		// We're not quite this strict
		'declaration-empty-line-before': null,
		'block-closing-brace-empty-line-before': null,
		'rule-empty-line-before': null,

		// Comments
		'comment-no-empty': true,
		'comment-empty-line-before': null, // Would like to use this, but will warn on commented single-line rules
		'comment-whitespace-inside': null,

		// Quotes
		// FIXME: we'd like to enforce single quotes for everything but attribute selectors, but currently this is not possible
		// 'string-quotes': 'single',
		'font-family-name-quotes': 'always-unless-keyword',
		'function-url-quotes': 'always',

		// At rules
		'at-rule-name-space-after': 'always-single-line',
		'at-rule-semicolon-space-before': 'never',
		'at-rule-name-newline-after': null, // 'always-multi-line' is close but sometimes weird
		'at-rule-empty-line-before': [
			'always',
			{
				'ignore': [
					'after-comment',
					'inside-block',
					'blockless-after-blockless'
				]
			}
		],



		// Disallow unknown code, which is probably unsupported properties, values or typos

		// FIXME: can this properly detect animations defined under keyframes? If not, this needs to be disabled
		'no-unknown-animations': true,

		'property-no-unknown': [
			true,
			{
				// ignoreProperties: []
			}
		],

		'at-rule-blacklist': [
			[

				// @extend is very easy to abuse, leads to confusing order of declarations
				// Better to avoid using it and stick to easier-to-reason-about language features
				'extend'

			],
			{
				severity: 'error'
			}
		],

		'at-rule-no-unknown': [
			true,
			{

				// SCSS
				// FIXME: Styles should be linted for SCSS - why do I need this?
				ignoreAtRules: [
					'error',
					'warn',
					'debug',

					'content',
					'extend',
					'import',
					'return',
					'include',
					'if',
					'else',
					'extend',
					'function',
					'mixin'
				]

			}
		],

		// Prefer lowercase in general
		'unit-case': 'lower',
		'color-hex-case': 'lower',
		'function-name-case': 'lower',
		'value-keyword-case': 'lower',
		'at-rule-name-case': 'lower',

		// More rules
		'number-no-trailing-zeros': null,
		'selector-pseudo-element-colon-notation': 'single',

		// No vendor prefixes in source
		// This is because Autoprefixer enforces correct vendor prefixes better than us humans and will remove them up anyway
		'at-rule-no-vendor-prefix': true,
		'media-feature-name-no-vendor-prefix': true,
		'selector-no-vendor-prefix': true,
		'property-no-vendor-prefix': true,
		'value-no-vendor-prefix': true,

		// Disallow excessive nesting
		// NOTE
		// - While the intention is good, a blanket limit does not do the job well
		// - Many times you should not be nesting even beyond two levels
		// - And sometimes nesting beyond this limit might make sense
		'max-nesting-depth': [
			5
		],

		// Indent with tabs
		'indentation': [
			'tab',
			{

				// 'except': ['value']

			}
		],

		// Allow convenient spacing, but don't go overboard
		'selector-max-empty-lines': 3,
		'function-max-empty-lines': 3,
		'value-list-max-empty-lines': 3,
		'max-empty-lines': [
			3
		],



		// SCSS-specific linting

		// Stylistic
		'scss/dollar-variable-colon-space-after': 'always',
		'scss/dollar-variable-colon-space-before': 'never',

		// FIXME: would like to enable this, but breaks in cases like this:
		// margin: -$buffer-tight -$buffer -$buffer -$buffer;
		// 'scss/operator-no-unspaced': true,

		// Confusing, not clear if compiles to shorthand or individual properties
		'scss/declaration-nested-properties': 'never',



		// Property order
		// Reference from https://github.com/stormwarning/stylelint-config-recess-order/blob/master/index.js
		// NOTE: would be better to maintain this elsewhere but stylelint-config-recess-order uses an outdated config

		'order/properties-order': [

			// Accessibility & Interactions
			'pointer-events',
			'-ms-touch-action',
			'touch-action',
			'cursor',
			'visibility',
			'zoom',
			'table-layout',
			'empty-cells',
			'caption-side',
			'border-spacing',
			'border-collapse',
			'content',
			'quotes',
			'counter-reset',
			'counter-increment',
			'resize',
			'-webkit-user-select',
			'-moz-user-select',
			'-ms-user-select',
			'-o-user-select',
			'user-select',
			'nav-index',
			'nav-up',
			'nav-down',
			'nav-left',
			'nav-right',

			// Typography
			'font',
			'font-family',
			'font-size',
			'font-style',
			'font-weight',
			'font-variant',
			'font-size-adjust',
			'font-stretch',
			'font-effect',
			'font-emphasize',
			'font-emphasize-position',
			'font-emphasize-style',
			'-moz-osx-font-smoothing',
			'-webkit-font-smoothing',
			'font-smooth',
			'-webkit-hyphens',
			'-moz-hyphens',
			'hyphens',
			'line-height',
			'text-emphasis',
			'text-emphasis-color',
			'text-emphasis-style',
			'text-emphasis-position',
			'text-decoration',
			'text-outline',
			'-ms-text-overflow',
			'text-overflow',
			'text-overflow-ellipsis',
			'text-overflow-mode',
			'text-shadow',
			'text-transform',
			'text-wrap',
			'-webkit-text-size-adjust',
			'-ms-text-size-adjust',
			'letter-spacing',
			'-ms-word-break',
			'word-break',
			'word-spacing',
			'-ms-word-wrap',
			'word-wrap',
			'overflow-wrap',
			'-moz-tab-size',
			'-o-tab-size',
			'tab-size',

			// Position
			'position',
			'top',
			'right',
			'bottom',
			'left',
			'z-index',

			// Display & Box model
			'-webkit-box-sizing',
			'-moz-box-sizing',
			'box-sizing',
			'display',

			// Flexible boxes
			'flex',
			'flex-basis',
			'flex-direction',
			'flex-flow',
			'flex-grow',
			'flex-shrink',
			'flex-wrap',
			'align-content',
			'align-items',
			'align-self',
			'justify-content',
			'order',

			// Grid layout
			'grid',
			'grid-auto-flow',
			'grid-auto-rows',
			'grid-auto-columns',
			'grid-area',
			'grid-row',
			'grid-row-start',
			'grid-row-end',
			'grid-column',
			'grid-column-start',
			'grid-column-end',
			'grid-gap',
			'grid-row-gap',
			'grid-column-gap',
			'grid-template',
			'grid-template-areas',
			'grid-template-rows',
			'grid-template-columns',

			'clear',
			'float',
			'clip',
			'overflow',
			'overflow-x',
			'overflow-y',
			'-webkit-overflow-scrolling',
			'-ms-overflow-x',
			'-ms-overflow-y',
			'-ms-overflow-style',
			'width',
			'min-width',
			'max-width',
			'height',
			'min-height',
			'max-height',
			'margin',
			'margin-top',
			'margin-bottom',
			'margin-left',
			'margin-right',
			'padding',
			'padding-top',
			'padding-bottom',
			'padding-left',
			'padding-right',

			// Text alignment
			'text-align',
			'-webkit-text-align-last',
			'-moz-text-align-last',
			'-ms-text-align-last',
			'text-align-last',
			'text-indent',
			'text-justify',
			'white-space',
			'vertical-align',
			'list-style',
			'list-style-position',
			'list-style-type',
			'list-style-image',

			// Background & borders
			'border',

			'border-top',
			'border-bottom',
			'border-left',
			'border-right',

			'border-width',
			'border-top-width',
			'border-bottom-width',
			'border-left-width',
			'border-right-width',

			'border-style',
			'border-top-style',
			'border-bottom-style',
			'border-left-style',
			'border-right-style',

			'outline',
			'outline-width',
			'outline-style',
			'outline-offset',

			'border-radius',
			'border-top-left-radius',
			'border-top-right-radius',
			'border-bottom-left-radius',
			'border-bottom-right-radius',

			// Colors
			'color',
			'border-color',
			'border-top-color',
			'border-bottom-color',
			'border-left-color',
			'border-right-color',
			'-webkit-border-image',
			'-moz-border-image',
			'-o-border-image',
			'border-image',
			'-webkit-border-image-source',
			'-moz-border-image-source',
			'-o-border-image-source',
			'border-image-source',
			'-webkit-border-image-slice',
			'-moz-border-image-slice',
			'-o-border-image-slice',
			'border-image-slice',
			'-webkit-border-image-width',
			'-moz-border-image-width',
			'-o-border-image-width',
			'border-image-width',
			'-webkit-border-image-outset',
			'-moz-border-image-outset',
			'-o-border-image-outset',
			'border-image-outset',
			'-webkit-border-image-repeat',
			'-moz-border-image-repeat',
			'-o-border-image-repeat',
			'border-image-repeat',
			'outline-color',
			'background',
			'background-color',

			'background-image',
			'-ms-filter:\\\'progid:DXImageTransform.Microsoft.gradient',
			'filter:progid:DXImageTransform.Microsoft.gradient',
			'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader',
			'filter',
			'background-origin',
			'background-position',
			'background-position-x',
			'background-position-y',
			'background-attachment',
			'-webkit-background-size',
			'-moz-background-size',
			'-o-background-size',
			'background-size',
			'-webkit-background-clip',
			'-moz-background-clip',
			'background-clip',
			'background-repeat',
			'background-blend-mode',
			'isolation',
			'-webkit-box-shadow',
			'-moz-box-shadow',
			'box-shadow',
			'mix-blend-mode',
			'filter:progid:DXImageTransform.Microsoft.Alpha(Opacity',
			'-ms-filter:\\\'progid:DXImageTransform.Microsoft.Alpha',
			'opacity',
			'-ms-interpolation-mode',

			// SVG presentation attributes
			'alignment-baseline',
			'baseline-shift',
			'dominant-baseline',
			'text-anchor',
			'word-spacing',
			'writing-mode',

			'fill',
			'fill-opacity',
			'fill-rule',
			'stroke',
			'stroke-dasharray',
			'stroke-dashoffset',
			'stroke-linecap',
			'stroke-linejoin',
			'stroke-miterlimit',
			'stroke-opacity',
			'stroke-width',

			'color-interpolation',
			'color-interpolation-filters',
			'color-profile',
			'color-rendering',
			'flood-color',
			'flood-opacity',
			'image-rendering',
			'lighting-color',
			'marker-start',
			'marker-mid',
			'marker-end',
			'mask',
			'shape-rendering',
			'stop-color',
			'stop-opacity',

			// Transform
			'transform',
			'transform-origin',

			// Transitions & animation
			'transition',
			'transition-property',
			'transition-duration',
			'transition-delay',
			'transition-timing-function',

			'animation',
			'animation-name',
			'animation-duration',
			'animation-play-state',
			'animation-timing-function',
			'animation-delay',
			'animation-iteration-count',
			'animation-direction'

		]



	}
};
