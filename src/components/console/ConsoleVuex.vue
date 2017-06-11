<script>

	import { popovers } from '@services';

	export default {
		name: 'console-vuex',

		computed: {

			globalCounterValues: function () {
				return this.$store.state.counter + '^2 = ' + this.$store.getters.counterSquared;
			}

		},

		methods: {

			increment: function () {
				this.$store.dispatch('increment');
			},

			decrement: function () {
				this.$store.dispatch('decrement');
			},

			openPopover: function () {
				popovers.open('PopoverCounter');
			}

		}

	};

</script>

<template>
	<div class="view-console-vuex bodytext">

		<h2>{{ globalCounterValues }}</h2>

		<dl>
			<dt>Operate counter here and now</dt>
			<dd><click :callback="increment">Increment</click></dd>
			<dd><click :callback="decrement">Decrement</click></dd>

			<dt>Operate via a component</dt>
			<dd class="separate pad radius"><global-counter-iterator :reverse="true"></global-counter-iterator></dd>

			<dt>Operate via a component in a popover</dt>
			<dd><click :callback="openPopover"><button>Open popover</button></click></dd>
		</dl>

	</div>
</template>

<style lang="scss">

</style>
