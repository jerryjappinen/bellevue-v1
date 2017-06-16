
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

	<div class="view-blank-state no-rhythm">
		<h2 class="view-blank-state-title">{{ title }}</h2>
		<p class="view-blank-state-description" v-if="hasDescription">{{ description }}</p>
		<div class="view-blank-state-callback" v-if="hasCallback">
			<p><click-button :callback="callback">{{ callbackLabel }}</click-button></p>
		</div>
	</div>

</template>

<style lang="scss">
	@import '~@shared-styles';

	.view-blank-state {
		@include buffer-even;
		@include radius-loose;
		background-color: $color-verylightgrey;
	}

	.view-blank-state-description {
		color: $color-discreet;
	}

	.view-blank-state-callback {
		@include push-top;
	}

</style>
