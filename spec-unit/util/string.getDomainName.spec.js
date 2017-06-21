import { string as stringUtil } from '@util';

// Expected result is the same for all these test cases
const expectedResult = 'github.com';

// Test cases
const stringsWithDomainName = {
	bare: 'github.com',
	bareWithProtocol: 'http://github.com',
	bareWithProtocolHttps: 'https://github.com',
	bareWithProtocolFtp: 'ftp://github.com',
	bareWithSlash: 'github.com/foo',
	bareWithSlashes: 'github.com/foo/bar',
	bareWithQueryParameter: 'github.com?foo',
	bareWithQueryParameters: 'github.com?foo&bar',
	bareWithQueryParametersAndValues: 'github.com?foo&bar=123',
	bareWithSlashesAndQueryParameter: 'github.com/foo?foo',
	bareWithSlashesAndQueryParameters: 'github.com/foo?foo&bar',
	bareWithSlashesAndQueryParametersAndValues: 'github.com/foo?foo&bar=123',
	bareWithProtocolAndSlash: 'http://github.com/foo',
	bareWithProtocolAndSlashes: 'http://github.com/foo/bar',
	bareWithProtocolAndQueryParameter: 'http://github.com?foo',
	bareWithProtocolAndQueryParameters: 'http://github.com?foo&bar',
	bareWithProtocolAndQueryParametersAndValues: 'http://github.com?foo&bar=123',
	bareWithProtocolAndSlashesAndQueryParameter: 'http://github.com/foo?foo',
	bareWithProtocolAndSlashesAndQueryParameters: 'http://github.com/foo?foo&bar',
	bareWithProtocolAndSlashesAndQueryParametersAndValues: 'http://github.com/foo?foo&bar=123',
	bareWithLeadingSpace: ' github.com',
	bareWithTrailingSpace: 'github.com ',
	leadingSpaceWithProtocolAndSlashesAndQueryParametersAndValues: '   http://github.com/foo?foo&bar=123'
};

describe('Util string.getDomainName', function () {

	// Test this with each of the test cases provided above
	for (let key in stringsWithDomainName) {
		it('should extract domain from ' + key, function () {
			expect(stringUtil.getDomainName(stringsWithDomainName[key])).to.equal(expectedResult);
		});
	}

});
