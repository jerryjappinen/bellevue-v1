
<script>
	import axios from 'axios';

	export default {
		name: 'page-list',

		data: function () {
			return {
				isLoading: false,
				isLoaded: false,
				itemsPerPage: 15,
				allItems: []
			};
		},

		computed: {

			currentPage: function () {
				return parseInt(this.$route.params.page ? this.$route.params.page : 1);
			},

			numberOfItems: function () {
				return this.allItems && this.allItems.length ? this.allItems.length : 0;
			},

			isEmpty: function () {
				return this.numberOfItems < 1;
			},

			numberOfPages: function () {
				return Math.ceil(this.numberOfItems / this.itemsPerPage);
			},

			itemsOnPage: function () {
				var start = (this.currentPage - 1) * this.itemsPerPage;
				var end = this.currentPage * this.itemsPerPage;
				return this.allItems.slice(start, end);
			},

			paginationLinks: function () {
				var links = [];
				for (var i = 0; i < this.numberOfPages; i++) {
					links.push({
						label: (i + 1),
						route: {
							name: 'listpage',
							params: {
								page: (i + 1)
							}
						}
					});
				}
				return links;
			}

		},

		methods: {

			fetchData: function () {
				var vm = this;
				vm.isLoading = true;
				axios.get('https://jsonplaceholder.typicode.com/posts').then(function (response) {
					vm.allItems = response.data;
				}).catch(function (error) {
					console.log(error);
				}).then(function () {
					vm.isLoading = false;
					if (!vm.isLoaded) {
						vm.isLoaded = true;
					}
				});
			},

			clearData: function () {
				this.allItems = [];
			}

		},

		created: function () {
			this.fetchData();
		}

	};

</script>

<template>

	<div class="view-page-list">

		<h1>List sample</h1>

		<p class="bodytext">Fetching sample data from <code>jsonplaceholder.typicode.com</code></p>

		<transition name="transition-fade" mode="out-in">

			<template v-if="isLoaded">
				<blank-state
					v-if="isEmpty"
					title="No items found"
					description="This text should tell you how to create items."
					:callback="fetchData"
					callbackLabel="Reset list items">
				</blank-state>

				<div v-else>

					<p><click-button :callback="clearData">Clear items</click-button></p>

					<!-- FIXME: should be a pagination component that wraps (removing excess links, adding next/previous etc.) <tabs> -->
					<p class="view-page-list-navigation">
						<tabs :links="paginationLinks"></tabs>
					</p>

					<list :items="allItems" :current-page="currentPage" :items-per-page="itemsPerPage">

						<!-- https://vuejs.org/v2/guide/components.html#Scoped-Slots -->
						<template scope="props">
							{{ props.item.id }}: {{ props.item.title }}
						</template>

					</list>

				</div>
			</template>
		</transition>

	</div>

</template>

<style lang="scss">
	// @import '~@shared-styles';
	.view-page-list-navigation {
		.view-tabs {
			display: inline-flex;
		}
	}
</style>
