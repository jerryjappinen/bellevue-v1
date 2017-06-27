<script>

	export default {
		name: 'tabs',

		props: {

			// List of links to render. Each should be an object with
			// {
			//     label: 'Foo',
			//     route: { name: 'Foo' },
			//     selectedOn: 'Foo',
			//     callback: 'Foo'
			// }
			// You can include other parameters here as well, and they will be passed to your custom callbacks
			links: {
				type: Array,
				required: true
			},

			// Optional callback to use for each link instead of router-link
			// Callback is called with the link object passed in links array
			callback: {
				type: Function,
				default: null
			},
			selectedOn: {
				type: Function,
				default: null
			}

		},

		computed: {

		},

		methods: {

			getCustomLinkIsSelected: function (link) {
				if (link.selectedOn) {
					return link.selectedOn(link);
				} else if (this.selectedOn) {
					return this.selectedOn(link);
				}
			},

			onCustomLinkClick: function (event, link, index) {

				// Link item-specific callback
				if (link.callback) {
					link.callback(event, link);

				// Shared callback passed in props
				} else if (this.callback) {
					this.callback(event, link);
				}

			}

		}

	};

</script>



<template>

	<ul class="view-tabs">

		<template v-for="(link, index) in links">

			<!-- Router link passed -->
			<router-link v-if="link.route" tag="li" class="view-tabs-tab" active-class="view-tabs-tab-active" :to="link.route">
				<a href="" class="view-tabs-link">{{ link.label }}</a>
			</router-link>

			<!-- Custom link passed -->
			<li v-else class="view-tabs-tab" :class="{ 'view-tabs-tab-active': getCustomLinkIsSelected(link) }">
				<a class="view-tabs-link" @click.prevent="function (event) { onCustomLinkClick(event, link, index) }">
					{{ link.label }}
				</a>
			</li>

		</template>
	</ul>

</template>



<style lang="scss">
	@import '~@shared-styles';

	.view-tabs {
		@include no-push-vertical;
		@include radius-loose;
		@include flex;
		overflow-x: auto;
		border-width: 2px;
		border-color: $color-dark;
		background-color: $color-white;
	}

	.view-tabs-tab {
		flex-grow: 1;
		text-align: center;

		@include transition-properties-common;

		+ .view-tabs-tab {
			border-left-width: 1px;
		}

	}

	.view-tabs-tab-active {
		color: $color-white;
		border-color: $color-dark;
		background-color: $color-dark;
		@include transition-fast;

		// &:hover {}

		// Link next to active link
		+ .view-tabs-tab {
			border-color: $color-dark;
			@include transition-fast;
		}

	}

	.view-tabs-link {
		line-height: 1;
		display: block;
		@include no-transition;

		@include pad-loose;

	}

</style>
