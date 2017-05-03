// http://eslint.org/docs/user-guide/configuring

//
// NOTE
//
// These are the rules for our custom app code.
// Please keep the ROOT .eslintrc.js without modifications, as it is the default for most Vue projcts.
// You can specify further rules under /components

module.exports = {
	rules: {

		// Stylistic issues

		// Indent with tabs, because spaces are not user-adjustable in IDEs, are harder to target with mouse cursors and will always have indentation errors
		'no-tabs': ['off'],
		'indent': ['error', 'tab'],

		// Semi colons required to avoid any gotchas
		'semi': [
			'error',
			'always'
		],

		// Single quotes should be used
		// NOTE: template literals not allowed currently, but can be enabled if we have legitimate use cases for them
		'quotes': [
			'error',
			'single',
			{
				'avoidEscape': false,
				'allowTemplateLiterals': false
			}
		],

		// Number of consecutive blank lines allowed
		'no-multiple-empty-lines': [
			'warn',
			{
				'max': 3,
				'maxBOF': 1,
				'maxEOF': 1
			}
		],



		// Language features

		// Misc.
		'padded-blocks': 'off',        // Weird rule, we need whitespace sometimes
		'no-empty': 'warn',         // Empty blocks should be cleaned up
		'no-unreachable': 'warn',   // Unreachable code should be cleaned up
		'no-else-return': 'error',     // Smelly, code will break when refactoring

		// Variables should be declared when they are used for the first time, to make it easier to move them from one scope to another when refactoring
		'one-var': ['error', 'never'],

		// config.someItems['foo'] is sometimes useful to highlight that we're referring to an item with a very specific, hardcoded name (that probably should be a variable)
		'dot-notation': ['off'],

		// Make arrow functions slightly less dangerous and confusing
		'no-confusing-arrow': ['error'],
		'arrow-parens': ['error', 'always'],
		'arrow-body-style': ['error', 'always'],
		'arrow-spacing': [
			'error',
			{
				'before': true,
				'after': true
			}
		],

		// No destructuring assignments like
		// 		var { bar: foo } = object;
		// This should be written as
		// 		var foo = object.bar;
		// ... So it's consistent with the 99 % of other assignments
		// Whoever thought this is a good idea in JS didn't think about the usability
		// http://teeohhem.com/why-destructuring-is-a-terrible-idea-in-es6/
		'prefer-destructuring': [
			'error',
			{
				'array': false,
				'object': false
			}
		],

		// Allow long ternary (not always 'unneeded')
		// See http://stackoverflow.com/questions/2100758/javascript-or-variable-assignment-explanation
		'no-unneeded-ternary': ['off']

	}
}
