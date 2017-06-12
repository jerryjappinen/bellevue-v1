
<script>
	import sampleData from '@assets/sample-data';

	export default {
		name: 'page-list',

		data: function () {
			return {
				itemsPerPage: 7,

				// FIXME: hackerman
				allItems: sampleData.concat(sampleData, sampleData, sampleData, sampleData, sampleData, sampleData, sampleData, sampleData, sampleData)

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
			}

		},

		methods: {

			clearData: function () {
				this.allItems = [];
			}

		}

	};

</script>

<template>

	<div class="view-page-list">

		<h1>List sample</h1>

		<transition name="transition-fade" mode="out-in">

			<blank-state
				v-if="isEmpty"
				title="No items found"
				description="This text should tell you how to create items.">
			</blank-state>

			<div v-else>

				<!-- FIXME: should be a pagination component similar to <tabs> -->
				<ul class="inline-block">
					<li v-for="i in numberOfPages">
						<router-link
							class="button"
							:to="{
								name: 'listpage',
								params: {
									page: i
								}
							}">
							{{ i }}
						</router-link>
					</li>
					<li><a href="#" @click.prevent="clearData">Clear items</a></li>
				</ul>

				<list :items="allItems" :current-page="currentPage"></list>

			</div>
		</transition>

	</div>

</template>

<style lang="scss">
	// @import '~@shared-styles';
	// .view-page-list {}
</style>
