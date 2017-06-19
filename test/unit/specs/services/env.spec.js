import { env } from '@services';

describe('Env service', function () {

	// https://stackoverflow.com/questions/19877924/what-is-the-list-of-possible-values-for-navigator-platform-as-of-today
	const n = {
		chromeMac: {
			ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
			platform: 'MacIntel'
		},
		safariMac: {
			ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/10.1.1 Safari/603.2.4',
			platform: 'MacIntel'
		}
	};

	it('should return string for Mac on chromeMac', function () {
		var os = env.getOsFromNavigator(n.chromeMac.ua, n.chromeMac.platform);
		expect(os).to.be.a('string');
	});

	it('should detect Mac on chromeMac', function () {
		var os = env.getOsFromNavigator(n.chromeMac.ua, n.chromeMac.platform);
		expect(os).to.equal('mac');
	});

	it('should detect Mac on safariMac', function () {
		var os = env.getOsFromNavigator(n.safariMac.ua, n.safariMac.platform);
		expect(os).to.equal('mac');
	});

});
