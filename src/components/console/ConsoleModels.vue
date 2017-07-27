<script>
	import { init, Post } from '@models';

	export default {
		name: 'console-models',

		data: function () {
			return {
				testPost: init(Post, {
					id: 3,
					name: 'Some Post name'
				})
			};
		}

	};

</script>



<template>

	<div class="view-console-models">

		<dl class="container-card-buffer bodytext">

			<dt>Post 1</dt>

			<dd><code>id</code>: {{ testPost.id }}</dd>
			<dd><code>name</code>: {{ testPost.name }}</dd>
			<dd><code>isTopLevel</code>: {{ testPost.isTopLevel }}</dd>
			<dd><code>hasParent</code>: {{ testPost.hasParent }}</dd>
			<dd><code>hasChildren</code>: {{ testPost.hasChildren }}</dd>

		</dl>

	</div>

</template>



<style lang="scss">

</style>
