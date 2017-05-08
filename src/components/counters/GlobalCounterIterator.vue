
<script>

	// View model
	export default {

		name: 'GlobalCounterIterator',

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

		beforeCreate: function () {
			console.log(this.$store, this.$store.state);
		}

	};

</script>

<template>

	<span class="view-global-counter-iterator">

		<span v-if="canOperate">
			<button class="view-global-counter-iterator-button button" @click="onClick">Click me</button> to <em>{{ reverse ? 'decrement' : 'increment' }}</em> the counter in the global state.
		</span>

		<span v-else>
			Oops! <router-link :to="{ name: 'arbitrary' }">Go to the other page</router-link> to increment global counter before decrementing it.
		</span>

	</span>

</template>

<style>

	/*NOTE: this is regular CSS*/
	.view-global-counter-iterator em {
		color: hotpink;
	}

</style>
