import Vue from 'vue';
import PageSomething from '@components/pages/PageSomething';

describe('PageSomething.vue', function () {

	it('should render correct page title', function () {

		// Set up a new instance of the component
		const Constructor = Vue.extend(PageSomething);
		const vm = new Constructor().$mount();

		// Expected results
		expect(vm.$el.querySelector('.view-page-something-title').textContent)
			.to.equal('More stuff');

	});

});
