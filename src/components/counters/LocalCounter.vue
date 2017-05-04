
<script>

	// View model
	export default {

		name: 'LocalCounter',

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

	<span class="view-local-counter" @click="increment">
		<span class="view-local-counter-label" v-if="shouldRenderLabel">{{ label }}: </span>
		<span class="view-local-counter-value">{{ valueToRender }}</span>
	</span>

</template>

<style lang="scss">
	@import '~@styles/shared.scss';

	.view-local-counter {
		display: inline-block;
		padding: 0.25em 0.5em;
	}

	.view-local-counter-label {
		color: purple;
	}

	.view-local-counter-value {
		color: orange;
	}

</style>
