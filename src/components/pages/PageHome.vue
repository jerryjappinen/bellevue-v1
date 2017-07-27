<script>
	export default {
		name: 'page-home',

		data: function () {
			return {
				welcomeMessage: 'Hello World!'
			};
		}

	};
</script>

<template>

	<page class="view-page-home">

		<h1>{{ welcomeMessage }}</h1>

		<div class="bodytext">

			<ul>
				<li><router-link :to="{ name: 'posts' }">Posts</router-link></li>
			</ul>

		</div>

	</page>

</template>

<style lang="scss">
	// @import '~@shared-styles';
	// .view-page-home {}
</style>
