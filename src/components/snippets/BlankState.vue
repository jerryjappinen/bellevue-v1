
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
			},
			callback: {
				type: Function,
				required: false
			},
			callbackLabel: {
				type: String,
				required: false
			}
		},

		computed: {

			hasDescription: function () {
				return this.description && this.description.length;
			},

			hasCallback: function () {
				return this.callback && this.callbackLabel && this.callbackLabel.length;
			}

		}

	};

</script>

<template>

	<div class="view-blank-state">
		<h2 class="view-blank-state-title no-push-bottom">{{ title }}</h2>
		<p v-if="hasDescription" class="view-blank-state-description no-push-top">{{ description }}</p>
		<p v-if="hasCallback"><click-button :callback="callback">{{ callbackLabel }}</click-button></p>
	</div>

</template>

<style lang="scss">
	@import '~@shared-styles';

	.view-blank-state-description {
		color: $color-discreet;
	}

</style>
