<script>
	import { filter, isInteger } from 'lodash';
	import { trimWhitespace } from '@util';
	import { api, network, popovers } from '@services';

	export default {
		name: 'page-posts',

		data: function () {
			return {
				isLoading: false,
				isLoaded: false,
				isFailed: false,
				postsPerPage: 15,
				searchInput: '',
				allPosts: []
			};
		},

		computed: {

			// Pagination is based on routing
			// FIXME: should this be a mixin? Probably used on most pages.
			// Would also be better to pass this to pagination rather than have it work on router directly
			// RouterPagination creates links though, which is great
			currentPage: {

				get: function () {
					return this.$route.params.page && parseInt(this.$route.params.page) ? parseInt(this.$route.params.page) : 1;
				},

				set: function (currentPage) {
					if (parseInt(this.$route.params.page) !== parseInt(currentPage)) {
						this.$router.replace({
							params: {
								page: parseInt(currentPage)
							}
						});
					}
				}

			},

			pageTitle: function () {
				return 'Posts';
			},

			isOffline: function () {
				return network.isOffline;
			},



			// Search input is considered a whitespace-separated list of search terms
			searchTerms: function () {
				var input = trimWhitespace('' + this.searchInput);
				if (input.length) {
					return input.toLowerCase().split(' ');
				}
				return [];
			},

			searchResults: function () {
				return filter(this.allPosts, this.postFilter);
			},

			searchTermIsEmpty: function () {
				return !this.searchTerms.length ? true : false;
			},

			searchIsActive: function () {
				return !this.searchTermIsEmpty;
			},

			searchResultsIsEmpty: function () {
				return !this.searchResults.length;
			},



			// Show full list or filtered results
			displayedPosts: function () {

				// Search results is not paginated
				if (this.searchIsActive) {
					return this.searchResults;
				}

				// Full list will be paginated
				var start = (this.currentPage - 1) * this.postsPerPage;
				var end = this.currentPage * this.postsPerPage;

				return this.allPosts.sort(this.postSorter).slice(start, end);
			},

			numberOfAllPosts: function () {
				return this.allPosts && this.allPosts.length ? this.allPosts.length : 0;
			},

			allPostsIsEmpty: function () {
				return this.allPosts.length < 1;
			},

			numberOfDisplayedPosts: function () {
				return this.displayedPosts && this.displayedPosts.length ? this.displayedPosts.length : 0;
			},

			numberOfPages: function () {
				return Math.ceil(this.numberOfAllPosts / this.postsPerPage);
			}

		},

		methods: {

			clearSearch: function () {
				this.searchInput = '';
			},

			openCreatePopover: function () {
				popovers.open('PopoverMainMenu');
			},



			// Data handling

			clearData: function () {
				this.allPosts = [];
			},

			beforeFetch: function () {
				this.isLoading = true;
			},

			onFetchSuccess: function (response) {
				this.allPosts = response.data;
				if (this.isFailed) {
					this.isFailed = false;
				}
			},

			onFetchFail: function (e) {
				this.isFailed = true;
			},

			onFetchComplete: function () {
				this.isLoading = false;
				if (!this.isLoaded) {
					this.isLoaded = true;
				}
			},

			fetchPosts: function () {
				if (!this.isLoading) {
					this.beforeFetch();
					api.getPosts(this.onFetchSuccess, this.onFetchFail, this.onFetchComplete);
				}
			},



			// Helpers

			postSorter: function (a, b) {
				return a.name < b.name ? -1 : 1;
			},

			postFilter: function (post) {

				// Break whitespace
				let searchTerms = this.searchTerms.join('');

				// Looking for a match in title or body
				let string = post.title + ' ' + post.body;
				if (string.toLowerCase().indexOf(searchTerms) >= 0) {
					return true;
				}

				return false;
			}

		},

		created: function () {

			// Ensure page is in URL
			if (
				!this.$route.params.page ||
				!isInteger(parseInt(this.$route.params.page)) ||
				parseInt(this.$route.params.page) < 1
			) {
				this.$router.replace({
					params: {
						page: 1
					}
				});
			}

			// Load posts
			this.fetchPosts();
		}

	};

</script>

<template>

	<page class="view-page-posts">

		<!-- Top section with title, with loading indicator -->
		<screen-title-area>
			{{ pageTitle }}

			<!-- NOTE: only for debugging -->
			<template slot="controls">
				<click-button :callback="clearData" :disabled="isLoading">Clear</click-button>
				<click-button :callback="fetchPosts" :loading="isLoading">Refresh</click-button>
			</template>

		</screen-title-area>

		<!-- Placeholder before first load is complete -->
		<fade>

			<div key="placeholder" class="view-page-posts-placeholder" v-if="!isLoaded">
				<p><inline-spinner></inline-spinner> Loading<ellipsis></ellipsis></p>
			</div>

			<!-- Content loaded -->
			<div v-else key="loaded" class="view-page-posts-loaded">

				<!-- Loading failed -->
				<blank-state
					v-if="isFailed"
					title="Couldn't load posts"
					description="Something went wrong when looking for posts. Are you sure your connection works?">
					<click-button :callback="fetchPosts" :loading="isLoading" :disabled="isOffline">{{ isOffline ? 'Offline' : 'Try again' }}</click-button>
				</blank-state>

				<!-- Empty result set -->
				<blank-state
					v-else-if="allPostsIsEmpty"
					title="No posts written"
					description="Now is a good time to write your first post.">
					<click-button :callback="openCreatePopover">Create post</click-button>
				</blank-state>

				<!-- Results ok -->
				<div v-else>

					<!-- List controls -->
					<div class="view-page-posts-controls">

						<!-- Search filter input -->
						<div class="view-page-posts-controls-left">
							<textinput
								:value.sync="searchInput"
								:clear="true"
								:sanitize="true"
								:placeholder="'Filter ' + numberOfAllPosts + ' posts...'">
							</textinput>
							<fade>
								<span class="view-page-posts-search-results-count" v-if="searchIsActive">{{ numberOfDisplayedPosts }} matches</span>
							</fade>
						</div>

						<!-- Pagination -->
						<div class="view-page-posts-controls-right">
							<fade>
								<route-pagination :max="numberOfPages" v-if="numberOfPages > 1 && !searchIsActive"></route-pagination>
							</fade>
						</div>

					</div>

					<!-- List content area -->
					<card :buffer="false">

						<!-- No results for search -->
						<blank-state
							key="blank-search-results"
							v-if="searchIsActive && searchResultsIsEmpty"
							class="view-page-posts-search-blank"
							title="No items found with this search term">
							<click-button :callback="clearSearch">Clear search</click-button>
						</blank-state>

						<!-- Post list -->
						<post-list v-else class="view-page-posts-list" :posts="displayedPosts"></post-list>

					</card>

					<footer-summary>
						{{ searchIsActive ? numberOfDisplayedPosts : numberOfAllPosts }} posts
					</footer-summary>

				</div>

			</div>

		</fade>

	</page>

</template>

<style lang="scss">
	@import '~@shared-styles';

	.view-page-posts-placeholder {
		@include type-discreet;
	}

	.view-page-posts-search-results-count {
		@include inline-block;
		@include push-tight-left;
		@include type-discreet;
	}

	// Controls
	.view-page-posts-controls {
		@include clear-after;
		@include push-vertical;

		.view-tabs {
			max-width: 22em;
		}

	}

	.view-page-posts-controls-left {
		float: left;
	}

	.view-page-posts-controls-right {
		float: right;
	}

	.view-page-posts-list-search-results {
		overflow: scroll;
		max-height: 28em;
	}

	// Search
	.view-page-posts-list-search-results {
		overflow: scroll;
		max-height: 28em;
	}

</style>
