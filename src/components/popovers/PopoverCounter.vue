
<script>

	export default {

		name: 'popover-counter',

		computed: {
			valueToShow: function () {
				return this.$store.state.counter;
			}
		}

	};

</script>

<template>

	<div class="view-popover-counter">
		<div class="buffer-tight">
			<p>Vuex counter value: {{ valueToShow }}</p>
			<p><global-counter-iterator></global-counter-iterator></p>
			<p><global-counter-iterator :reverse="true"></global-counter-iterator></p>
		</div>
	</div>

</template>

<style lang="scss">
	// @import '~@styles/shared';
	// .view-popover-counter {}
</style>
