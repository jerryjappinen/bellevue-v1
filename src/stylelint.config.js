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

module.exports = {
	defaultSeverity: 'warning',
	rules: {

		// Misc basic things
		'string-quotes': 'single',
		'color-no-invalid-hex': true,
		'function-calc-no-unspaced-operator': true,
		'number-leading-zero': 'always',
		'length-zero-no-unit': true,
		'no-extra-semicolons': true,
		'no-eol-whitespace': true,
		'no-missing-end-of-source-newline': true,
		'no-invalid-double-slash-comments': true,

		// At rules
		'at-rule-name-space-after': 'always-single-line',
		'at-rule-semicolon-space-before': 'never',
		'at-rule-name-newline-after': 'always-multi-line',
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
		'at-rule-no-unknown': [
			true,
			{

				// SCSS
				ignoreAtRules: [
					'content',
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

		// No vendor prefixes in source
		// This is because Autoprefixer enforces correct vendor prefixes better than us humans and will remove them up anyway
		'at-rule-no-vendor-prefix': true,
		'media-feature-name-no-vendor-prefix': true,
		'selector-no-vendor-prefix': true,
		'property-no-vendor-prefix': true,
		'value-no-vendor-prefix': true,

		// FIXME: can this properly detect animations defined under keyframes/ ? If not, this needs to be disabled
		'no-unknown-animations': true,

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
		'max-empty-lines': [
			3
		]

	}
};
