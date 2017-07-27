<script>

	export default {
		name: 'console-components',

		data: function () {
			return {
				controlsAreDisabled: false,
				setTestValue: 'foo',
				toggleTestValue: true,
				textinputTestValue: '',
				sliderTestValue: 50,
				buttonsAreLoading: false
			};
		},

		computed: {

			setTestTargetValue: function () {
				return this.setTestValue + ' bar';
			}

		},

		methods: {

			testButtonToggle: function () {
				let vm = this;
				if (!this.buttonsAreLoading) {
					this.buttonsAreLoading = true;
					setTimeout(function () {
						vm.buttonsAreLoading = false;
					}, 2000);
				}
			},

			clickTestCallback: function () {
				alert('Clicked on <click>');
			},

			toggleControlsDisabled: function () {
				this.controlsAreDisabled = !this.controlsAreDisabled;
			}

		}

	};

</script>

<template>

	<div class="view-console-components">

		<h3>Tags</h3>

		<card>

			<p>
				<tag>Foo bar</tag>
				<tag color="blue">Foo bar</tag>
				<tag color="green">Foo bar</tag>
				<tag color="yellow">Foo bar</tag>
				<tag color="orange">Foo bar</tag>
				<tag color="red">Foo bar</tag>
			</p>

			<p>
				<tag icon="arrow-right">Foo bar</tag>
				<tag icon="arrow-left" color="blue">Foo bar</tag>
				<tag icon="cross" color="green">Foo bar</tag>
				<tag icon="check" color="yellow">Foo bar</tag>
				<tag icon="help" color="orange">Foo bar</tag>
				<tag icon="hamburger" color="red">Foo bar</tag>
			</p>

			<p>
				<tag :disabled="true" >Foo bar</tag>
				<tag :disabled="true" color="blue">Foo bar</tag>
				<tag :disabled="true" icon="help" color="orange">Foo bar</tag>
				<tag :disabled="true" icon="cross" color="red">Foo bar</tag>
			</p>

		</card>

		<h3>Controls</h3>

		<p><click-button :callback="toggleControlsDisabled">Disable/enable controls</click-button> ({{ controlsAreDisabled }})</p>

		<p><slider :value.sync="sliderTestValue" :disabled="controlsAreDisabled"></slider></p>

		<p>
			<checkmark :value="true"></checkmark>
			<checkmark :value="false"></checkmark>
			<checkmark :disabled="true" :value="true"></checkmark>
			<checkmark :disabled="true" :value="false"></checkmark>
			{{ sliderTestValue }}
		</p>



		<!-- Testing barebones control components -->

		<card :buffer="false">

			<table class="view-console-components-controls no-push-vertical">

				<!--Clicking-->

				<tr>
					<td class="pad">Click</td>
					<td><click class="block pad" feedback="area" :callback="clickTestCallback" :disabled="controlsAreDisabled">Click me</click></td>
				</tr>

				<tr>
					<td class="pad">Set to bar</td>
					<td>
						<set class="block pad" feedback="area" :value.sync="setTestValue" to="bar" :disabled="controlsAreDisabled">
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
						<set class="block pad" feedback="area" :value.sync="setTestValue" :to="setTestTargetValue" :disabled="controlsAreDisabled">
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
						<toggle class="block pad" feedback="area" :value.sync="toggleTestValue" :disabled="controlsAreDisabled">
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

						<!--NOTE: using value.sync-->
						<label class="block pad">
							<textinput
								:value.sync="textinputTestValue"
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

						<!--NOTE: using value.sync-->
						<label class="block pad">
							<textinput
								type="multiline"
								:value.sync="textinputTestValue"
								:disabled="controlsAreDisabled"
								:clear="true"
								:sanitize="true">
							</textinput>
						</label>

					</td>
				</tr>

			</table>

		</card>



		<h3>Buttons</h3>

		<p>
			<click-button :callback="testButtonToggle" :loading="buttonsAreLoading">Bar</click-button>
			<click-button :callback="testButtonToggle" :loading="buttonsAreLoading" theme="stroke">Bar</click-button>
			<click-button :callback="testButtonToggle" :loading="buttonsAreLoading" theme="plain">Bar</click-button>
			<click-button :callback="testButtonToggle" :loading="buttonsAreLoading" icon="check"></click-button>
			<click-button :callback="testButtonToggle" :loading="buttonsAreLoading" icon="check">Bar</click-button>
		</p>

		<p>
			<click-button :callback="testButtonToggle" :loading="buttonsAreLoading" color="green">Bar</click-button>
			<click-button :callback="testButtonToggle" :loading="buttonsAreLoading" color="green" theme="stroke">Bar</click-button>
			<click-button :callback="testButtonToggle" :loading="buttonsAreLoading" color="green" theme="plain">Bar</click-button>
		</p>

		<p>
			<click-button :callback="testButtonToggle" :loading="buttonsAreLoading" color="red">Bar</click-button>
			<click-button :callback="testButtonToggle" :loading="buttonsAreLoading" color="red" theme="stroke">Bar</click-button>
			<click-button :callback="testButtonToggle" :loading="buttonsAreLoading" color="red" theme="plain">Bar</click-button>
		</p>

		<p>
			<click-button :callback="testButtonToggle" :loading="buttonsAreLoading" :disabled="true">Bar</click-button>
			<click-button :callback="testButtonToggle" :loading="buttonsAreLoading" :disabled="true" theme="stroke">Bar</click-button>
			<click-button :callback="testButtonToggle" :loading="buttonsAreLoading" :disabled="true" theme="plain">Bar</click-button>
		</p>



		<h3>Link buttons</h3>

		<p>
			<click-button :route="{ to: 'root' }" :loading="buttonsAreLoading" :disabled="false">Enabled link</click-button>
			<click-button :route="{ to: 'root' }" :loading="buttonsAreLoading" :disabled="true">Disabled link</click-button>
		</p>



		<h3>Images and static assets</h3>

		<!-- References to static assets with resolved URLs -->
		<ul>
			<li><pic class="view-console-components-image" title="User" src="user-avatar-placeholder.png" hide-until-loaded></pic> <code>pic</code> with a PNG, hidden until loaded</li>
			<li><pic class="view-console-components-image" asset="chevron-down"></pic> <code>pic</code> with an SVG</li>
			<li><icon asset="chevron-down"></icon> <code>icon</code></li>
			<li class="view-console-components-highlight"><icon asset="chevron-down"></icon> <code>icon</code> with an asset that supports currentColor</li>
		</ul>



		<h3>Spinners <ellipsis :loading="false"></ellipsis> <ellipsis></ellipsis></h3>

		<!-- Spinners of various styles -->
		<p>
			<spinner></spinner>
			<inline-spinner></inline-spinner>
			<spinner class="view-console-components-spinner-1"></spinner>
			<spinner class="view-console-components-spinner-2"></spinner>
			<spinner class="view-console-components-spinner-3"></spinner>
		</p>

	</div>

</template>

<style lang="scss">
	@import '~@shared-styles';

	.view-console-components-highlight {
		color: $color-red;
	}

	.view-console-components-spinner-1 {
		width: 1.5em;
	}

	.view-console-components-spinner-2 {
		color: $color-green;
	}

	.view-console-components-spinner-3 {
		.view-spinner-circle {
			stroke: $color-red;
		}
	}

	.view-console-components-image {
		width: 1em;
		vertical-align: middle;
	}

	.view-console-components-controls {

		td {
			&:first-of-type {
				width: 12em;
			}
		}

		th,
		td {
			border-bottom-width: 1px;
		}

		tr {
			&:last-of-type {
				th,
				td {
					border-bottom-width: 0;
				}
			}
		}

	}

</style>
