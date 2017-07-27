<script>
	import { isInteger } from 'lodash';
	import { composeClassnames } from '@util';

	export default {
		name: 'route-pagination',

		props: {

			param: {
				type: String,
				required: false,
				default: 'page'
			},

			max: {
				type: Number,
				required: true,
				validator: function (int) {
					return (isInteger(int) && int > 1) ? true : false;
				}
			}

		},

		computed: {

			currentPage: {
				get: function () {
					return parseInt(this.$route.params[this.param] ? this.$route.params[this.param] : 1);
				},
				set: function (page) {
					this.setCurrentPage(Math.max(Math.min(this.max, parseInt(page)), 1));
				}
			},

			isOnFirst: function () {
				return this.currentPage <= 1 ? true : false;
			},

			isOnLast: function () {
				return this.currentPage >= this.max ? true : false;
			},



			// Links to prev/next etc.

			firstLink: function () {
				return this.composeRouteLink(1);
			},

			lastLink: function () {
				return this.composeRouteLink(this.max);
			},

			previousLink: function () {
				if (this.isOnFirst) {
					return this.firstLink;
				}
				return this.composeRouteLink(this.currentPage - 1);
			},

			nextLink: function () {
				if (this.isOnLast) {
					return this.lastLink;
				}
				return this.composeRouteLink(this.currentPage + 1);
			},



			// Tabs

			tabsShouldBeShown: function () {
				return this.max <= 6 ? true : false;
			},

			tabLinks: function () {
				var links = [];
				for (var i = 0; i < this.max; i++) {
					links.push({
						label: i + 1,
						route: this.composeRouteLink(i + 1)
					});
				}
				return links;
			},



			// State classes

			classes: function () {
				return composeClassnames({
					onFirst: this.isOnFirst,
					onLast: this.isOnLast
				}, 'view-route-pagination');
			},

			previousLinkClasses: function () {
				return composeClassnames({
					enabled: !this.isOnFirst,
					disabled: this.isOnFirst
				}, 'view-route-pagination-link');
			},

			nextLinkClasses: function () {
				return composeClassnames({
					enabled: !this.isOnLast,
					disabled: this.isOnLast
				}, 'view-route-pagination-link');
			}

		},

		methods: {

			selectAll: function () {
				this.$refs.input.select();
			},

			composeRouteLink: function (i) {
				var link = {
					params: {}
				};
				link.params[this.param] = i;
				return link;
			},

			setCurrentPage: function (page) {
				return this.$router.replace(this.composeRouteLink(page));
			},

			previous: function () {
				if (this.currentPage > 1) {
					this.setCurrentPage(this.currentPage - 1);
				}
			},

			next: function () {
				if (this.currentPage < this.max) {
					this.setCurrentPage(this.currentPage + 1);
				}
			}

		}

	};

</script>

<template>

	<div class="view-route-pagination" :class="classes">

		<!-- Tab selection for small number of links -->
		<tabs v-if="tabsShouldBeShown" class="view-route-pagination-tabs" :links="tabLinks"></tabs>

		<!-- Scalable number input with buttons -->
		<div v-else class="view-route-pagination-buttons">

			<router-link class="view-route-pagination-link view-route-pagination-first" :class="previousLinkClasses" :to="firstLink">
				<inline-icon asset="chevron-left-left"></inline-icon>
			</router-link>

			<router-link class="view-route-pagination-link view-route-pagination-previous" :class="previousLinkClasses" :to="previousLink">
				<inline-icon asset="chevron-left"></inline-icon>
			</router-link>

			<label class="view-route-pagination-current">
				<input
					ref="input"
					class="view-route-pagination-input"
					v-model="currentPage"
					@focus="selectAll"
					type="number"
					:min="1"
					:max="max"></input><span class="view-route-pagination-max"> / {{ max }}</span>
			</label>

			<router-link class="view-route-pagination-link view-route-pagination-next" :class="nextLinkClasses" :to="nextLink">
				<inline-icon asset="chevron-right"></inline-icon>
			</router-link>

			<router-link class="view-route-pagination-link view-route-pagination-last" :class="nextLinkClasses" :to="lastLink">
				<inline-icon asset="chevron-right-right"></inline-icon>
			</router-link>

		</div>

	</div>

</template>

<style lang="scss">
	@import '~@shared-styles';



	// Inline-block by default

	.view-route-pagination {
		@include inline-block;
	}

	.view-route-pagination-tabs,
	.view-route-pagination-buttons {
		@include inline-flex;
	}



	// Buttons

	.view-route-pagination-buttons {
		@include border-box;
		@include radius-loose;

		line-height: 1;

		overflow-x: auto;
		max-width: 100%;
		border-width: 2px;
		text-align: center;

		border-color: $color-dark;
		background-color: $color-white;
	}

	.view-route-pagination-link,
	.view-route-pagination-current,
	.view-route-pagination-input,
	.view-route-pagination-max {
		@include inline-block;
	}

	.view-route-pagination-link-enabled,
	.view-route-pagination-current {
		@include transition-properties-common;

		.view-icon {
			@include transition-properties-transform;
		}

		&:hover {
			background-color: $color-feedback-dark;
		}

		&:active {
			.view-icon {
				transform: scale(1.5 * 0.85);
			}
		}

	}


	// Links

	.view-route-pagination-link {
		width: 1em;
		@include pad-horizontal;
		padding-top: $pad-loose-vertical - 1px;
		padding-bottom: $pad-loose-vertical - 1px;

		color: $color-dark;
	}

	.view-route-pagination-first,
	.view-route-pagination-previous {
		border-right-width: 1px;
	}

	.view-route-pagination-next,
	.view-route-pagination-last {
		border-left-width: 1px;
	}

	.view-route-pagination-link-disabled {
		@include cursor-inherit;
		color: $color-grey;
	}



	// Input

	.view-route-pagination-current {
		position: relative;
	}

	.view-route-pagination-input {
		position: relative;
		top: -1px;
		box-sizing: initial;
		width: 2.5em;
		height: 1em;

		padding: 0;
		@include pad-loose-top;
		@include pad-loose-left;

		text-align: center;
		vertical-align: top;
	}

	.view-route-pagination-max {
		@include pad-loose-top;
		@include pad-right;
		@include type-discreet;
	}

	// .view-route-pagination-link {}

</style>
