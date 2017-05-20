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

				controlsAreDisabled: false,

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

		},

		methods: {
			toggleControlsDisabled: function () {
				this.controlsAreDisabled = !this.controlsAreDisabled;
			}
		}

	};

</script>

<template>

	<div class="view-console-components">


		<h3>Images and static assets</h3>

		<!-- References to static assets with resolved URLs -->
		<ul>
			<li><img class="view-console-components-image" alt="Foo" src="../../assets/logo.png"> <code>img</code> with relative URL</li>
			<li><img class="view-console-components-image" alt="Foo" src="~@assets/logo.png"> <code>img</code> with alias in URL</li>
			<li><img class="view-console-components-image" alt="Foo" src="~@assets/some/folder/anotherlogo.png"> <code>img</code> in a subdirectory</li>
			<li><pic class="view-console-components-image" title="Foo" src="some/folder/anotherlogo.png"></pic> <code>pic</code> with a PNG</li>
			<li><pic class="view-console-components-image" title="Foo" src="some/folder/anotherlogo.png" hide-until-loaded></pic> <code>pic</code> with a PNG, hidden until loaded</li>
			<li><pic class="view-console-components-image" asset="chevron-down"></pic> <code>pic</code> with an SVG</li>
			<li><icon asset="chevron-down"></icon> <code>icon</code></li>
		</ul>



		<h3>Spinner</h3>

		<!-- Spinners of various styles -->
		<ul>
			<li><spinner class="view-console-components-spinner-1"></spinner></li>
			<li><spinner class="view-console-components-spinner-2"></spinner></li>
		</ul>



		<h3>Controls</h3>

		<p><button class="button" @click="toggleControlsDisabled">Disable/enable controls</button> ({{ controlsAreDisabled }})</p>

		<!-- Testing barebones control components -->
		<table class="view-console-components-controls">
			<tr>
				<td class="pad">Click</td>
				<td><click class="pad" :callback="clickTestCallback" :disabled="controlsAreDisabled">Click me</click></td>
			</tr>
			<tr>
				<td class="pad">Set to bar</td>
				<td><set class="pad" v-model="setTestValue" to="Bar" :disabled="controlsAreDisabled">{{ setTestValue }}</set></td>
			</tr>
			<tr>
				<td class="pad">Set to original + bar dynamically</td>
				<td><set class="pad" v-model="setTestValue" :to="setTestTargetValue" :disabled="controlsAreDisabled">{{ setTestValue }}</set></td>
			</tr>
			<tr>
				<td class="pad">Toggle</td>
				<td><toggle class="pad" v-model="toggleTestValue" :disabled="controlsAreDisabled">{{ toggleTestValue }}</toggle></td>
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
