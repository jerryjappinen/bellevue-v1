
<script>

	import Console from '@components/console/Console';

	export default {

		name: 'page-console',

		components: {
			Console: Console
		},

		metaInfo: {
			title: 'Debugging stuff'
		}

	};

</script>

<template>

	<div class="view-page-console">
		<h1>Debug console</h1>
		<console></console>
	</div>

</template>

<style lang="scss">
	// @import '~@styles/shared.scss';
	// .view-page-console {}
</style>
