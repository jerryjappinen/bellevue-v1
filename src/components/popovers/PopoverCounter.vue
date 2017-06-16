
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
		<p>Vuex counter value: {{ valueToShow }}</p>
		<p><global-counter-iterator></global-counter-iterator></p>
		<p><global-counter-iterator :reverse="true"></global-counter-iterator></p>
	</div>

</template>

<style lang="scss">
	@import '~@shared-styles';

	.view-popover-counter {
		@include buffer-tight;
	}

</style>
