<script>

	export default {
		name: 'console-components',

		data: function () {
			return {

				controlsAreDisabled: false,

				clickTestCallback: function () {
					alert('Clicked on <click>');
				},

				setTestValue: 'foo',

				toggleTestValue: true,

				textinputTestValue: ''

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
			<li><pic class="view-console-components-image" title="Foo" src="logo.png"></pic> <code>pic</code> with a PNG</li>
			<li><pic class="view-console-components-image" title="Foo" src="some/folder/anotherlogo.png" hide-until-loaded></pic> <code>pic</code> with a PNG, hidden until loaded</li>
			<li><pic class="view-console-components-image" asset="chevron-down"></pic> <code>pic</code> with an SVG</li>
			<li><icon asset="chevron-down"></icon> <code>icon</code></li>
			<li class="view-console-components-highlight"><icon asset="chevron-down"></icon> <code>icon</code> with an asset that supports currentColor</li>
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

			<!--Clicking-->
			<tr>
				<td class="pad">Click</td>
				<td><click class="pad" :callback="clickTestCallback" :disabled="controlsAreDisabled">Click me</click></td>
			</tr>
			<tr>
				<td class="pad">Set to bar</td>
				<td>
					<set class="pad" v-model="setTestValue" to="bar" :disabled="controlsAreDisabled">
						<checkbox :value="setTestValue === 'bar'" :disabled="controlsAreDisabled"></checkbox>
						<flipswitch :value="setTestValue === 'bar'" :disabled="controlsAreDisabled"></flipswitch>
						{{ setTestValue }}
					</set>
				</td>
			</tr>

			<!--Switches and toggles-->
			<tr>
				<td class="pad">Set to + bar (dynamic)</td>
				<td>
					<set class="pad" v-model="setTestValue" :to="setTestTargetValue" :disabled="controlsAreDisabled">
						<radio :value="setTestValue" selected-on="foo" :disabled="controlsAreDisabled"></radio>
						<radio :value="setTestValue" selected-on="bar" :disabled="controlsAreDisabled"></radio>
						<radio :value="setTestValue" selected-on="foo bar" :disabled="controlsAreDisabled"></radio>
						<radio :value="setTestValue" selected-on="bar bar" :disabled="controlsAreDisabled"></radio>
						{{ setTestValue }}
					</set>
				</td>
			</tr>

			<tr>
				<td class="pad">Toggle</td>
				<td>
					<toggle class="pad" v-model="toggleTestValue" :disabled="controlsAreDisabled">
						<checkbox :value="toggleTestValue" :disabled="controlsAreDisabled"></checkbox>
						<flipswitch :value="toggleTestValue" :disabled="controlsAreDisabled"></flipswitch>
						{{ toggleTestValue }}
					</toggle>
				</td>
			</tr>



			<!--Textinput-->

			<tr>
				<td class="pad">{{ textinputTestValue }}</td>
				<td>

					<!--NOTE: using v-model-->
					<label class="block pad">
						<textinput
							v-model="textinputTestValue"
							:disabled="controlsAreDisabled"
							:clear="true"
							:sanitize="true">
						</textinput>
					</label>

				</td>
			</tr>

			<tr>
				<td class="pad">{{ textinputTestValue }}</td>
				<td>

					<!--NOTE: using v-model-->
					<label class="block pad">
						<textinput
							v-model="textinputTestValue"
							type="multiline"
							:disabled="controlsAreDisabled"
							:clear="true"
							:sanitize="true">
						</textinput>
					</label>

				</td>
			</tr>

		</table>

	</div>

</template>

<style lang="scss">
	@import '~@shared-styles';

	.view-console-components-highlight {
		color: $color-red;
	}

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
