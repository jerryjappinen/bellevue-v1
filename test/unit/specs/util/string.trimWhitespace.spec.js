import { string as stringUtil } from '@util';

describe('Util string.trimWhitespace with trailing whitespace', function () {

	const strings = {
		space: 'Foooo' + ' ',
		spaces: 'Foooo' + '    ',
		tab: 'Foooo' + '\t',
		tabAndSpace1: 'Foooo' + ' ' + '\t',
		tabAndSpace2: 'Foooo' + ' ' + '\t',
		tabAndSpace3: 'Foooo' + ' ' + '\t' + ' ',
		tabAndMultipleSpaces1: 'Foooo' + '    ' + '\t',
		tabAndMultipleSpaces2: 'Foooo' + '    ' + '\t',
		tabAndMultipleSpaces3: 'Foooo' + '    ' + '\t' + '    ',
		tabAndMultipleSpacesAndTabs1: 'Foooo' + '    ' + '\t',
		tabAndMultipleSpacesAndTabs2: 'Foooo' + '    ' + '\t',
		tabAndMultipleSpacesAndTabs3: 'Foooo' + '    ' + '\t' + '    ',
		newline: 'Foooo' + '\n',
		newlines: 'Foooo' + '\n\n\n'
	};

	for (var key in strings) {
		var string = strings[key];
		it('should trim ' + key, function () {
			expect(stringUtil.trimWhitespace(string)).to.equal('Foooo');
		});
	}

});

describe('Util string.trimWhitespace with leading whitespace', function () {

	const strings = {
		space: ' ' + 'Foooo',
		spaces: '    ' + 'Foooo',
		tab: '\t' + 'Foooo',
		tabAndSpace1: ' ' + '\t' + 'Foooo',
		tabAndSpace2: ' ' + '\t' + 'Foooo',
		tabAndSpace3: ' ' + '\t' + ' ' + 'Foooo',
		tabAndMultipleSpaces1: '    ' + '\t' + 'Foooo',
		tabAndMultipleSpaces2: '    ' + '\t' + 'Foooo',
		tabAndMultipleSpaces3: '    ' + '\t' + '    ' + 'Foooo',
		tabAndMultipleSpacesAndTabs1: '    ' + '\t' + 'Foooo',
		tabAndMultipleSpacesAndTabs2: '    ' + '\t' + 'Foooo',
		tabAndMultipleSpacesAndTabs3: '    ' + '\t' + '    ' + 'Foooo',
		newline: '\n' + 'Foooo',
		newlines: '\n\n\n' + 'Foooo'
	};

	for (var key in strings) {
		var string = strings[key];
		it('should trim ' + key, function () {
			expect(stringUtil.trimWhitespace(string)).to.equal('Foooo');
		});
	}

});

describe('Util string.trimWhitespace with excess whitespace', function () {

	const strings = {
		space: 'Foo oo',
		spaces: 'Foo    oo',
		tab: 'Foo' + '\t' + 'oo',
		tabs: 'Foo' + '\t\t\t\t' + 'oo',
		tabsAndSpaces: 'Foo    ' + '\t\t\t\t' + '   oo',
		newline: 'Foo' + '\n' + 'oo',
		newlines: 'Foo    ' + '\n\n\n\n' + '   oo'
	};

	for (var key in strings) {
		var string = strings[key];
		it('should trim ' + key, function () {
			expect(stringUtil.trimWhitespace(string)).to.equal('Foo oo');
		});
	}

});
