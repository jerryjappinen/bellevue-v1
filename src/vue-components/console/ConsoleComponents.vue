<script>

	// Child components
	import Pic from '@components/snippets/Pic';
	import Spinner from '@components/snippets/Spinner';

	export default {

		name: 'console-components',

		components: {
			Pic: Pic,
			Spinner: Spinner
		}

	};

</script>

<template>

	<dl class="view-console-components">

		<dt>Images and static assets</dt>

		<!-- References to static assets with resolved URLs -->
		<dd><img class="view-console-components-image" alt="Foo" src="../../assets/logo.png"> <code>img</code> with relative URL</dd>
		<dd><img class="view-console-components-image" alt="Foo" src="~@assets/logo.png"> <code>img</code> with alias in URL</dd>
		<dd><img class="view-console-components-image" alt="Foo" src="~@assets/some/folder/anotherlogo.png"> <code>img</code> in a subdirectory</dd>
		<dd><pic class="view-console-components-image" title="Foo" src="some/folder/anotherlogo.png"></pic> <code>pic</code> with a PNG</dd>
		<dd><pic class="view-console-components-image" title="Foo" src="some/folder/anotherlogo.png" hide-until-loaded></pic> <code>pic</code> with a PNG, hidden until loaded</dd>
		<dd><pic class="view-console-components-image" asset="chevron-down"></pic> <code>pic</code> with an SVG</dd>

		<dt>Spinner</dt>

		<!-- Spinners of various styles -->
		<dd><spinner class="view-console-components-spinner-1"></spinner></dd>
		<dd><spinner class="view-console-components-spinner-2"></spinner></dd>

	</dl>

</template>

<style lang="scss">
	@import '~@styles/shared.scss';

	.view-console-components-spinner-1 {
		width: 1em;
	}

	.view-console-components-spinner-2 {

		.view-spinner-circle {
			stroke: $color-red;
		}

	}

	.view-console-components-image {
		width: 1em;
		vertical-align: middle;
	}

</style>
