
<script>
	import { Post } from '@models';

	export default {
		name: 'post-list-item',

		props: {

			post: {
				type: Post,
				required: true
			},

			filter: {},

			isOpen: {
				default: false,
				required: false
			},

			forceOpen: {
				default: false,
				required: false
			}

		},

		data: function () {
			return {
				isReallyOpen: this.isOpen ? true : false
			};
		},

		computed: {

			toggleIcon: function () {
				return this.isReallyOpen ? 'chevron-up' : 'chevron-down';
			}

		},

		methods: {

			toggle: function () {
				this.isReallyOpen = !this.isReallyOpen;
			}

		}

	};

</script>

<template>

	<div class="view-post-list-item control control-enabled control-area">

		<div class="view-post-list-item-title">
			{{ post.title }}
		</div>

		<div class="view-post-list-item-excerpt">
			{{ post.excerpt }}
		</div>

	</div>

</template>

<style lang="scss">
	@import '~@shared-styles';

	.view-post-list-item {
		@include pad-loose;
	}

	// .view-post-list-item-title {}

	.view-post-list-item-excerpt {
		@include type-discreet-small;
	}

</style>
