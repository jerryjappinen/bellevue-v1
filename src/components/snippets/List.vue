
<script>
	export default {
		name: 'list',

		props: {

			items: {
				type: Array,
				required: true
			},

			itemsPerPage: {
				type: Number,
				default: 7
			},

			currentPage: {
				type: Number,
				default: 1
			}

		},

		computed: {

			itemsOnPage: function () {
				var start = (this.currentPage - 1) * this.itemsPerPage;
				var end = this.currentPage * this.itemsPerPage;
				return this.items.slice(start, end);
			}

		}

	};

</script>

<template>

	<table class="view-list separate">
		<tr v-for="(item, index) in itemsOnPage">
			<td>{{ item.name }}</td>
			<td>{{ item.email }}</td>
		</tr>
	</table>

</template>

<style lang="scss">
	// @import '~@shared-styles';
	// .view-page-list {}
</style>
