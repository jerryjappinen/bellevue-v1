
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
				default: 10
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

	<div class="view-list">
		<div class="view-list-item" v-for="(item, index) in itemsOnPage">
			<slot :item="item" :index="index"></slot>
		</div>
	</div>

</template>

<style lang="scss">
	@import '~@shared-styles';

	.view-list {
		border-top-width: 1px;
		border-left-width: 1px;
		border-right-width: 1px;
	}

	.view-list-item {
		@include pad;
		border-bottom-width: 1px;
	}

</style>
