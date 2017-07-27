<script>
	import { isInteger } from 'lodash';
	import { api } from '@services';

	export default {
		name: 'page-category',

		data: function () {
			return {
				isLoading: false,
				isLoaded: false,
				post: null
			};
		},

		computed: {

			currentId: function () {
				let id = parseInt(this.$route.params.id);

				if (isInteger(id)) {
					return id;
				}

				return null;
			},

			pageTitle: function () {
				return this.isLoaded && this.post ? this.post.title : '';
			},

			comments: function () {
				return this.post ? this.post.comments : null;
			},

			postIsEmpty: function () {
				return !this.post ? true : false;
			},

			commentsIsEmpty: function () {
				return !this.comments.length ? true : false;
			}

		},

		methods: {

			clearPost: function () {
				this.post = null;
			},

			fetchPost: function () {
				if (!this.isLoading) {
					var vm = this;
					vm.isLoading = true;

					api.getPost(
						this.currentId,

						// Success
						function (response) {
							vm.post = response.data;

							// Also fetch comments and user data
							vm.post.fetchComments();
							vm.post.fetchUser();

							// Ensure current page is visible
							if (vm.numberOfPages < vm.currentPage) {
								vm.currentPage = vm.numberOfPages;
							}

						},

						// Error
						null,

						// Either
						function () {
							vm.isLoading = false;
							if (!vm.isLoaded) {
								vm.isLoaded = true;
							}
						}

					);

				}
			}

		},

		watch: {

			currentId: function (newId, oldId) {
				if (this.postIsEmpty || newId !== this.post.id) {
					this.clearPost();
					this.fetchPost();
				}
			}

		},

		created: function () {
			this.fetchPost();
		}

	};

</script>

<template>

	<page class="view-page-post">

		<!-- Top section with title, with loading indicator -->
		<screen-title-area :back="{ name: 'posts' }">
			{{ pageTitle }}

			<!-- NOTE: only for debugging -->
			<template slot="controls">
				<click-button :callback="clearPost" :disabled="isLoading">Clear</click-button>
				<click-button :callback="fetchPost" :loading="isLoading">Refresh</click-button>
			</template>

		</screen-title-area>

		<fade>

			<!-- Placeholder before first load is complete -->
			<div key="placeholder" class="view-page-post-placeholder" v-if="!isLoaded">
				<p><inline-spinner></inline-spinner> Loading<ellipsis></ellipsis></p>
			</div>

			<!-- Content loaded -->
			<div key="loaded" class="view-page-post-loaded" v-else>

				<fade>

					<!-- Object not found in API -->
					<blank-state
						key="blank"
						v-if="postIsEmpty"
						title="Looks like this post doesn't exist"
						description="Did you find a broken link? Try going back and double-check the link.">
					</blank-state>

					<!-- Results ok -->
					<div v-else key="content" class="view-page-post-content">

						<p>By {{ post.user ? post.user.name : '...' }}</p>

						<p>{{ post.body }}</p>

						<p>{{ post.comments.length }} comments</p>

						<div v-for="(comment, index) in comments" :key="index" class="container-white buffer push-bottom">
							<p>{{ comment.name }} ({{ comment.email }})</p>
							<p>{{ comment.body }}</p>
						</div>

					</div>

				</fade>

			</div>

		</fade>

	</page>

</template>

<style lang="scss">
	@import '~@shared-styles';

	// .view-page-post {
	// 	.view-screen-title {}
	// }

	.view-page-post-placeholder {
		@include type-discreet;
		text-align: center;
	}

	.view-page-post-content {
		@include keep-center;
		@include limit-small;
	}

</style>
