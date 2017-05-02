// http://eslint.org/docs/user-guide/configuring

//
// NOTE
//
// These are the rules for our custom app code.
// Please keep the ROOT .eslintrc.js without modifications, as it is the default for most Vue projcts.
// You can specify further rules under /components

module.exports = {
	rules: {

		// Padding inside "blocks"
		"padded-blocks": ["off"],

		// Number of consecutive blank lines allowed
		"no-multiple-empty-lines": [
			"error",
			{
				"max": 3,
				"maxBOF": 1,
				"maxEOF": 1
			}
		],

		// Allow long ternary (not always "unneeded")
		// See http://stackoverflow.com/questions/2100758/javascript-or-variable-assignment-explanation
		"no-unneeded-ternary": ["off"],

		// Semi colons
		"semi": ["error", "always"],

		// Indent with tabs
		"no-tabs": ["off"],
		"indent": ["error", "tab"]

	}
}
