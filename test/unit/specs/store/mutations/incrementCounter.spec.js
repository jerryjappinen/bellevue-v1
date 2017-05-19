
import { mutations } from '@store';

describe('mutations incrementCounter', function () {

	it('iterates from 0', function () {

		const mockState = {
			count: 0
		};

		// Mutations take the state as argument
		mutations['incrementCounter'](mockState);

		// Expected result
		expect(mockState.counter).to.equal(1);

	});

	it('iterates from 1', function () {
		const mockState = { count: 1 };
		mutations['incrementCounter'](mockState);
		expect(mockState.counter).to.equal(2);
	});

	it('iterates from -1', function () {
		const mockState = { count: -1 };
		mutations['incrementCounter'](mockState);
		expect(mockState.counter).to.equal(0);
	});

	it('iterates from 999999', function () {
		const mockState = { count: 999999 };
		mutations['incrementCounter'](mockState);
		expect(mockState.counter).to.equal(999999);
	});

});
