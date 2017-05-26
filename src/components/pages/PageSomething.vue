
<script>

	// Services
	import { popovers } from '@services';

	// View model
	export default {

		name: 'page-something',

		data: function () {
			return {
				myValue: 20
			};
		},

		computed: {

			currentPopover: function () {
				return popovers.someOtherValue;
			},

			globalCounterValues: function () {
				return this.$store.state.counter + ' (squared: ' + this.$store.getters.counterSquared + ')';
			}

		}

	};

</script>

<template>

	<div class="view-page-something">

		<div class="bodytext" v-once>

			<h1 class="view-page-something-title">More stuff</h1>

			<p>{{ currentPopover }}</p>

			<p>Vue (pronounced /vjuː/, like <strong>view</strong>) is a <strong>progressive framework</strong> for building user interfaces. Unlike other monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable. The core library is focused on the view layer only, and is very easy to pick up and integrate with other libraries or existing projects. On the other hand, Vue is also perfectly capable of powering sophisticated Single-Page Applications when used in combination with <a href="single-file-components.html">modern tooling</a> and <a href="https://github.com/vuejs/awesome-vue#components--libraries" target="_blank" rel="external">supporting libraries</a>.</p>

			<p>If you are an experienced frontend developer and want to know how Vue compares to other libraries/frameworks, check out the <a href="comparison.html">Comparison with Other Frameworks</a>.</p>

			<p>The easiest way to try out Vue.js is using the <a href="https://jsfiddle.net/chrisvfritz/50wL7mdz/" target="_blank" rel="external">JSFiddle Hello World example</a>. Feel free to open it in another tab and follow along as we go through some basic examples. Or, you can simply create an <code>.html</code> file and include Vue with:</p>

			<pre><code>&lt;script src="https://unpkg.com/vue"&gt;&lt;/script&gt;</code></pre>

		</div>

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

<style lang="scss">
	@import '~@styles/shared';

	// .view-page-something {}

</style>
