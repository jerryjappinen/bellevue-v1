<template>

	<div class="view-page-something">

		<h1 class="view-page-something-title">More stuff</h1>

		<p>Vue (pronounced /vjuː/, like view) is a progressive framework for building user interfaces. Unlike other monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable. The core library is focused on the view layer only, and is very easy to pick up and integrate with other libraries or existing projects. On the other hand, Vue is also perfectly capable of powering sophisticated Single-Page Applications when used in combination with modern tooling and supporting libraries.</p>

		<p>If you are an experienced frontend developer and want to know how Vue compares to other libraries/frameworks, check out the Comparison with Other Frameworks.</p>

		<hr>

		<h2>More counters {{ myValue }}</h2>

		<hr>

		<p>Global counter {{ globalCounterValues }}</p>

		<hr>

		<p><global-counter-iterator></global-counter-iterator></p>

		<hr>

		<!-- Simple counter example with only ONE-WAY data binding -->
		<!-- NOTE: passing the same value to two components like this would be confusing in production -->
		<p><local-counter label="One-way with default value"></local-counter></p>

		<hr>

		<!-- Simple counter example with TWO-WAY data binding, i.e. the child component mutates the value of this components -->
		<!-- https://vuejs.org/v2/guide/components.html#Form-Input-Components-using-Custom-Events -->
		<p><counter label="Two-way binding to myValue" v-model="myValue"></counter></p>

	</div>

</template>

<script>

	// Child components
	import Counter from '@/components/counters/Counter';
	import GlobalCounterIterator from '@/components/counters/GlobalCounterIterator';
	import LocalCounter from '@/components/counters/LocalCounter';

	// View model
	export default {

		name: 'page-something',

		components: {
			Counter,
			GlobalCounterIterator,
			LocalCounter
		},

		data () {
			return {
				myValue: 20
			};
		},

		computed: {

			globalCounterValues: function () {
				return this.$store.state.counter + ' (squared: ' + this.$store.getters.counterSquared + ')';
			}

		}

	};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

	.view-page-something {}

</style>
