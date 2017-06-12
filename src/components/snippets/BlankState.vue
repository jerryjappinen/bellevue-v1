
<script>
	export default {
		name: 'blank-state',

		props: {
			title: {
				type: String,
				required: true
			},
			description: {
				type: String,
				required: false
			}
		},

		computed: {

			hasDescription: function () {
				return this.description && this.description.length;
			}

		}

	};

</script>

<template>

	<div class="view-blank-state">
		<h2 class="view-blank-state-title">{{ title }}</h2>
		<p v-if="hasDescription" class="view-blank-state-description">{{ description }}</p>
	</div>

</template>

<style lang="scss">
	@import '~@shared-styles';

	.view-blank-state-description {
		color: $color-discreet;
	}

</style>
