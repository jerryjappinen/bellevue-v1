import { mutations as m } from '@/store';
const f = m['incrementCounter'];

describe('mutations incrementCounter', function () {

	it('iterates from 0', function () {

		const mockState = {
			count: 0
		};

		// Mutations take the state as argument
		f(mockState);

		// Expected result
		expect(mockState.counter).to.equal(1);

	});

	it('iterates from 1', function () {
		const mockState = { count: 1 };
		f(mockState);
		expect(mockState.counter).to.equal(2);
	});

	it('iterates from -1', function () {
		const mockState = { count: -1 };
		f(mockState);
		expect(mockState.counter).to.equal(0);
	});

	it('iterates from 999999', function () {
		const mockState = { count: 999999 };
		f(mockState);
		expect(mockState.counter).to.equal(999999);
	});

});
