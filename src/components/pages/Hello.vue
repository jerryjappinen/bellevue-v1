
<script>

	// View model
	export default {

		name: 'hello',

		data: function () {
			return {
				welcomeMessage: 'Hello!',
				someValue: 3
			};
		},

		computed: {

			globalCounterValues: function () {
				return this.$store.state.counter + '^2 = ' + this.$store.getters.counterSquared;
			}

		}

	};

</script>

<template>

	<div class="view-hello">

		<h1>{{ welcomeMessage }} ({{ globalCounterValues }})</h1>

		<hr>

		<!-- Value from this component -->
		<p>My own <code>someValue</code> is {{ someValue }}.</p>

		<hr>

		<!-- Simple counter example with only ONE-WAY data binding -->
		<!-- NOTE: passing the same value to two components like this would be confusing in production -->
		<p><local-counter label="One-way binding to someValue" :value="someValue"></local-counter></p>

		<hr>

		<!-- Simple counter example with TWO-WAY data binding, i.e. the child component mutates the value of this components -->
		<!-- https://vuejs.org/v2/guide/components.html#Form-Input-Components-using-Custom-Events -->
		<p><counter label="Two-way binding to someValue" v-model="someValue"></counter></p>

		<hr>

		<!-- This guy knows how to iterate the counter in the global state -->
		<p><global-counter-iterator :reverse="true"></global-counter-iterator></p>

	</div>

</template>

<style lang="scss">
	@import '~@styles/shared';

	.view-hello {

		// Override child component styles
		.view-counter-label,
		.view-local-counter-label {
			color: inherit;
		}

	}

</style>
