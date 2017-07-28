
<script>
	import { includes } from 'lodash';
	import { composeClassnames } from '@util';

	const limits = ['tiny', 'small', 'smallish', 'medium', 'large', 'verylarge', 'ridiculous', 'totallyridiculous'];

	export default {
		name: 'page',

		props: {

			limit: {
				type: String,
				default: null,
				validator: function (value) {
					return includes(limits, value);
				}
			}

		},

		computed: {

			// // Store parameters per page instead of for all pages
			// persistKey: function () {
			// 	return 'global-data-for-' + this.$parent.$options.name;
			// },

			// // Store page-specific data
			// persist: {
			// 	get: function () {
			// 		return {};
			// 	},
			// 	set: function (persist) {}
			// },

			// Generic class names for all pages
			classes: function () {
				var classnames = {};
				if (this.limit) {
					classnames[this.limit] = true;
				}
				return composeClassnames(classnames, 'view-page');
			}

		}

	};

</script>

<template>

	<div class="view-page" :class="classes">
		<slot></slot>
	</div>

</template>

<style lang="scss">
	@import '~@shared-styles';

	.view-page {
		@include keep-center;
		@include buffer-tight;
		@include buffer-bottom;

		@include viewport-over-small {
			@include buffer;
			@include buffer-loose-bottom;
		}

		@include viewport-over-large {
			@include buffer-loose;
			padding-bottom: $buffer-loose * 2;
		}

	}



	// Limits

	.view-page-tiny {
		@include limit-tiny;
	}

	.view-page-small {
		@include limit-small;
	}

	.view-page-smallish {
		@include limit-smallish;
	}

	.view-page-medium {
		@include limit-medium;
	}

	.view-page-large {
		@include limit-large;
	}

	.view-page-verylarge {
		@include limit-verylarge;
	}

	.view-page-ridiculous {
		@include limit-ridiculous;
	}

	.view-page-totallyridiculous {
		@include limit-totallyridiculous;
	}

</style>
