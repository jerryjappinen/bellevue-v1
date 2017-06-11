
<script>

	// View model
	export default {

		name: 'global-counter-iterator',

		props: {

			// FIXME: bad property name: not immediately clear what the default action is
			reverse: {
				type: Boolean,
				default: false
			}

		},

		computed: {

			label: function () {
				return this.reverse ? 'decrement' : 'increment';
			},

			iconId: function () {
				return 'chevron-' + (this.reverse ? 'down' : 'up');
			},

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

		}

	};

</script>

<template>

	<span class="view-global-counter-iterator">

		<!-- When user can increment/decrement further and button is enabled -->
		<span v-if="canOperate">
			<button class="view-global-counter-iterator-button button" @click="onClick">Click me <icon :asset="iconId" :title="'Click to ' + label"></icon></button> to <em>{{ label }}</em> the counter in Vuex.
		</span>

		<!-- When button is disabled -->
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
