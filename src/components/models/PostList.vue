
<script>

	export default {
		name: 'post-list',

		props: {

			posts: {
				type: Array,
				required: true
			},

			filter: {
				type: Function,
				required: false
			}

		}

	};

</script>

<template>

	<div class="view-post-list">
		<router-link
			class="view-post-list-row"
			v-for="(post, index) in posts"
			v-if="!filter || filter(post)"
			:key="post.id"
			:to="{
				name: 'post',
				params: {
					id: post.id
				}
			}">
			<post-list-item :post="post"></post-list-item>
		</router-link>
	</div>

</template>

<style lang="scss">
	@import '~@shared-styles';

	.view-post-list-row {
		@include block;

		// Siblings
		+ .view-post-list-row {
			border-top-width: 1px;
		}

	}

</style>
