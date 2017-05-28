<script>

	export default {
		name: 'tabs',

		props: {

			// List of links to render. Each should be an object with
			// {
			//     label: 'Foo',
			//     route: 'Foo',
			//     selectedOn: 'Foo',
			//     callback: 'Foo'
			// }
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
					return link.selectedOn();
				} else if (this.selectedOn) {
					return this.selectedOn();
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
		<li class="view-tabs-tab" v-for="(link, index) in links">

			<!-- Router links -->
			<router-link
				v-if="!link.callback && !callback"
				class="view-tabs-link"
				active-class="view-tabs-link-active"
				:to="{ name: link.route }"
				>
				{{ link.label }}
			</router-link>

			<!-- Custom link -->
			<a
				v-else
				class="view-tabs-link"
				:class="{
					'view-tabs-link-active': getCustomLinkIsSelected()
				}"
				@click.prevent="onCustomLinkClick(event, link, index)">
				{{ link.label }}
			</a>

		</li>
	</ul>

</template>



<style lang="scss">
	@import '~@styles/shared';

	.view-tabs {
		@include no-push-vertical;
		@include inline-block;
		@include radius-loose;
		border-width: 2px;
		border-color: $color-dark;
		background-color: $color-white;
	}

	.view-tabs-tab {
		@include inline-block;

		+ .view-tabs-tab {
			.view-tabs-link {
				border-left-width: 1px;
			}
		}

	}

	.view-tabs-link {
		padding-top: $pad-vertical - 2px;
		padding-bottom: $pad-vertical - 2px;
		padding-left: $pad-horizontal;
		padding-right: $pad-horizontal;
	}

	.view-tabs-link-active {
		color: $color-white;
		background-color: $color-dark;

		&:hover {
			color: $color-white;
		}

	}

</style>
