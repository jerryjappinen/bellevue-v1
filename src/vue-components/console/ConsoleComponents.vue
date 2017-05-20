<script>

	// Child components
	import Icon from '@components/snippets/Icon';
	import Pic from '@components/snippets/Pic';
	import Spinner from '@components/snippets/Spinner';
	import Click from '@components/controls/Click';
	import Set from '@components/controls/Set';
	import Toggle from '@components/controls/Toggle';

	export default {

		name: 'console-components',

		components: {
			Icon: Icon,
			Pic: Pic,
			Spinner: Spinner,
			Click: Click,
			Set: Set,
			Toggle: Toggle
		},

		data: function () {
			return {

				clickTestCallback: function () {
					alert('Clicked on <click>');
				},

				setTestValue: 'foo',

				toggleTestValue: true

			};
		},

		computed: {

			setTestTargetValue: function () {
				return this.setTestValue + ' bar';
			}

		}

	};

</script>

<template>

	<div class="view-console-components">

		<dl>

			<dt>Images and static assets</dt>

			<!-- References to static assets with resolved URLs -->
			<dd><img class="view-console-components-image" alt="Foo" src="../../assets/logo.png"> <code>img</code> with relative URL</dd>
			<dd><img class="view-console-components-image" alt="Foo" src="~@assets/logo.png"> <code>img</code> with alias in URL</dd>
			<dd><img class="view-console-components-image" alt="Foo" src="~@assets/some/folder/anotherlogo.png"> <code>img</code> in a subdirectory</dd>
			<dd><pic class="view-console-components-image" title="Foo" src="some/folder/anotherlogo.png"></pic> <code>pic</code> with a PNG</dd>
			<dd><pic class="view-console-components-image" title="Foo" src="some/folder/anotherlogo.png" hide-until-loaded></pic> <code>pic</code> with a PNG, hidden until loaded</dd>
			<dd><pic class="view-console-components-image" asset="chevron-down"></pic> <code>pic</code> with an SVG</dd>
			<dd><icon asset="chevron-down"></icon> <code>icon</code></dd>

			<dt>Spinner</dt>

			<!-- Spinners of various styles -->
			<dd><spinner class="view-console-components-spinner-1"></spinner></dd>
			<dd><spinner class="view-console-components-spinner-2"></spinner></dd>

		</dl>

		<h3>Controls</h3>

		<table class="view-console-components-controls">
			<tr>
				<td class="pad">Click</td>
				<td><click class="pad" :callback="clickTestCallback">Click me</click></td>
			</tr>
			<tr>
				<td class="pad">Set to bar</td>
				<td><set class="pad" v-model="setTestValue" to="Bar">{{ setTestValue }}</set></td>
			</tr>
			<tr>
				<td class="pad">Set to original + bar dynamically</td>
				<td><set class="pad" v-model="setTestValue" :to="setTestTargetValue">{{ setTestValue }}</set></td>
			</tr>
			<tr>
				<td class="pad">Toggle</td>
				<td><toggle class="pad" v-model="toggleTestValue">{{ toggleTestValue }}</toggle></td>
			</tr>
		</table>

	</div>

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

	.view-console-components-controls {
		border-width: 1px;

		th,
		td {
			border-width: 1px;
		}

		td {
			&:first-of-type {
				width: 12em;
			}
		}

	}

</style>
