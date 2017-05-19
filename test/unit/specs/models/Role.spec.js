// import Vue from 'vue';
import Role from '@models/Role';

describe('Role model (harhar)', function () {

	it('should have no ID if not passed', function () {

		// Set up a new instance of
		var role = new Role();

		// Expected results
		expect(role.id)
			.to.not
				.be.a('number');

	});

	it('should have ID when passed', function () {
		var role = new Role({
			propsData: {
				id: 123
			}
		});
		expect(role.id).to.be.a('number');
	});

	it('should have invalid ID below 0', function (done) {
		var role = new Role({
			propsData: {
				id: -1
			}
		});
		expect(role.idIsValid).to.not.be.ok();
	});

	// it('should be valid when ID is set', function (done) {

	// 	var role = new Role();
	// 	expect(role.isValid).to.not.be.ok();

	// 	role.id = 123;

	// 	expect(role.isValid).to.be.ok();

	// });

	// it('should be invalid when ID is unset', function (done) {

	// 	var role = new Role({
	// 		propsData: {
	// 			id: 123
	// 		}
	// 	});

	// 	expect(role.isValid).to.be.ok();

	// 	role.id = null;

	// 	Vue.nextTick(function () {
	// 		expect(role.isValid).to.not.be.ok();
	// 		done();
	// 	});

	// });

});
