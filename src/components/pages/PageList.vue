
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

			page: function () {
				return this.$route.params.page ? this.$route.params.page : 1;
			},

			numberOfItems: function () {
				return this.allItems.length;
			},

			numberOfPages: function () {
				return Math.ceil(this.numberOfItems / this.itemsPerPage);
			},

			itemsOnPage: function () {
				var start = (this.page - 1) * this.itemsPerPage;
				var end = this.page * this.itemsPerPage;
				return this.allItems.slice(start, end);
			}

		}

	};

</script>

<template>

	<div class="view-page-list">

		<h1>List sample</h1>

		<ul>
			<li v-for="i in numberOfPages"><router-link :to="{ name: 'listpage', params: { page: i } }">{{ i }}</router-link></li>
		</ul>

		<table class="separate">
			<tr v-for="(item, index) in itemsOnPage">
				<td>{{ item.name }}</td>
				<td>{{ item.email }}</td>
			</tr>
		</table>

	</div>

</template>

<style lang="scss">
	// @import '~@shared-styles';
	// .view-page-list {}
</style>
