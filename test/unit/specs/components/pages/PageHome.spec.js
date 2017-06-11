import Vue from 'vue';
import PageHome from '@components/pages/PageHome';

describe('PageHome.vue', function () {

	it('should render correct page title', function () {

		// Set up a new instance of the component
		const Constructor = Vue.extend(PageHome);
		const vm = new Constructor().$mount();

		// Expected results
		expect(vm.$el.querySelector('h1').textContent)
			.to.equal('Hello world!');

	});

});
