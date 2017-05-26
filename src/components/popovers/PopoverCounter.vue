
<script>

	export default {

		name: 'popover-counter',

		computed: {
			valueToShow: function () {
				return this.$store.state.counter;
			}
		},

		methods: {

		}

	};

</script>

<template>

	<div class="view-popover-counter">
		<div class="buffer-tight">
			Counter iterator embedded in popover {{ valueToShow }}
			<global-counter-iterator></global-counter-iterator>
		</div>
	</div>

</template>

<style lang="scss">
	// @import '~@styles/shared';
	// .view-popover-counter {}
</style>
