
<script>

	// View model
	export default {

		name: 'page-home',

		data: function () {
			return {
				welcomeMessage: 'Hello world!'
			};
		}

	};

</script>

<template>

	<div class="view-page-home">

		<h1>{{ welcomeMessage }}</h1>

		<div class="bodytext" v-once>

			Thank you for using <code>Eiskis/vue-webpack</code>! To get started, please refer to the documentation at [eiskis.gitbooks.io/vue-webpack-docs](https://eiskis.gitbooks.io/vue-webpack-docs/). Happy hacking! :)

			<h2>About Vue</h2>

			<p>Vue is designed from the ground up to be incrementally adoptable. The core library is focused on the view layer only, and is very easy to pick up and integrate with other libraries or existing projects. On the other hand, Vue is also perfectly capable of powering sophisticated Single-Page Applications when used in combination with <a href="single-file-components.html">modern tooling</a> and <a href="https://github.com/vuejs/awesome-vue#components--libraries" target="_blank" rel="external">supporting libraries</a>.</p>

			<p>If you are an experienced frontend developer and want to know how Vue compares to other libraries/frameworks, check out the <a href="comparison.html">Comparison with Other Frameworks</a>.</p>

			<p>The easiest way to try out Vue.js is using the <a href="https://jsfiddle.net/chrisvfritz/50wL7mdz/" target="_blank" rel="external">JSFiddle Hello World example</a>. Feel free to open it in another tab and follow along as we go through some basic examples. Or, you can simply create an <code>.html</code> file and include Vue as a <code>&lt;script&gt;</code>.</p>

		</div>

	</div>

</template>

<style lang="scss">
	@import '~@styles/shared';

	// .view-page-home {}

</style>
