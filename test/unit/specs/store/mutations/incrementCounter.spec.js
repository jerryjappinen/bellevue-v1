
import { mutations } from '@store';

describe('mutations INCREMENT_COUNTER', function () {

	it('iterates from 0', function () {

		const mockState = {
			count: 0
		};

		// Mutations take the state as argument
		mutations['INCREMENT_COUNTER'](mockState);

		// Expected result
		expect(mockState.counter).to.equal(1);

	});

	it('iterates from 1', function () {
		const mockState = { count: 1 };
		mutations['INCREMENT_COUNTER'](mockState);
		expect(mockState.counter).to.equal(2);
	});

	it('iterates from -1', function () {
		const mockState = { count: -1 };
		mutations['INCREMENT_COUNTER'](mockState);
		expect(mockState.counter).to.equal(0);
	});

	it('iterates from 999999', function () {
		const mockState = { count: 999999 };
		mutations['INCREMENT_COUNTER'](mockState);
		expect(mockState.counter).to.equal(999999);
	});

});
