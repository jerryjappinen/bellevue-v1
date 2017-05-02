
<script>

	// View model
	export default {

		name: 'global-counter-iterator',

		props: {
			reverse: {
				type: Boolean,
				default: false
			}
		},

		computed: {

			canOperate: function () {
				return !this.reverse || this.$store.getters.canDecrementCounter;
			}

		},

		methods: {



			// Actions

			increment: function () {
				this.$store.dispatch('increment');
			},

			decrement: function () {
				this.$store.dispatch('decrement');
			},



			// Bindings
			onClick: function (event) {
				return this.reverse ? this.decrement() : this.increment();
			}

		},

		beforeCreate () {
			console.log(this.$store, this.$store.state);
		}

	};

</script>

<template>

	<span class="view-global-counter-iterator">

		<span v-if="canOperate">
			<button class="button" @click="onClick">Click me</button> to {{ reverse ? 'decrement' : 'increment' }} the counter in the global state.
		</span>

		<span v-else>
			Oops! <router-link :to="{ name: 'PageSomething' }">Go to the other page</router-link> to increment global counter before decrementing it.
		</span>

	</span>

</template>

<style lang="scss">

	// FIXME: do I really need this in every component definition?
	@import '../../styles/shared.scss';

	.view-global-counter-iterator-button {}

</style>
