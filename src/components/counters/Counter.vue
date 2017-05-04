
<!--

NOTE

I'm duplicating code from LocalCounter. In real life, if I wanted to have two counters that only differ in the one-way vs. two-way behavior, I could do one of the following:

1. Write just one component that only conditionally emits the input events to parent scope.
2. Write a generic two-way wrapper component

If I had a lot of other components dealing with similar behavior, I'd go for the second. This separates the behavioral concerns from the visualization of the data (let's say I had many components that visualised numbers in different ways).

-->

<script>

	// View model
	export default {

		name: 'Counter',

		props: {
			value: {
				required: true,
				type: Number
			},
			label: {
				required: false,
				type: String
			}
		},

		data: function () {
			return {
			};
		},

		computed: {

			// NOTE: This guy handles emitting out of component scope
			ownValue: {
				get: function () {
					return this.value;
				},
				set: function (value) {
					this.$emit('input', value);
				}
			},

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

	<span class="view-counter" @click="increment">
		<span class="view-counter-label" v-if="shouldRenderLabel">{{ label }}: </span>
		<span class="view-counter-value">{{ valueToRender }}</span>
	</span>

</template>

<style lang="scss">
	@import '~@styles/shared.scss';

	.view-counter {
		display: inline-block;
		padding: 0.25em 0.5em;
	}

	.view-counter-label {
		color: green;
	}

	.view-counter-value {
		color: red;
	}

</style>
