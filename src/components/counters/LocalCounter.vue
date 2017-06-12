
<script>

	// View model
	export default {

		name: 'local-counter',

		props: {
			value: {
				required: false,
				default: 100,
				type: Number
			},
			label: {
				required: false,
				type: String
			}
		},

		data: function () {
			return {
				ownValue: this.value
			};
		},

		computed: {

			shouldRenderLabel: function () {
				return this.label ? true : false;
			},

			valueToRender: function () {
				if (this.ownValue && this.ownValue) {
					return this.ownValue;
				}
				return '-';
			}

		},

		methods: {

			increment: function () {
				this.ownValue++;
			},

			decrement: function () {
				this.ownValue--;
			}

		}

	};

</script>

<template>

	<click class="view-local-counter" :callback="increment">
		<span class="view-local-counter-label" v-if="shouldRenderLabel">{{ label }}: </span>
		<span class="view-local-counter-value">{{ valueToRender }}</span>
	</click>

</template>

<style lang="scss">
	@import '~@shared-styles';

	.view-local-counter {
		display: inline-block;
		padding: 0.25em 0.5em;
	}

	.view-local-counter-value {
		color: orange;
	}

</style>
