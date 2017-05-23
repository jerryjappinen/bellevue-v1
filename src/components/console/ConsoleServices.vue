<script>

	// Vendor code
	// import _ from 'lodash';

	// Services
	import { popovers, viewport } from '@services';

	export default {

		name: 'console-services',

		computed: {

			dump: function () {
				return {

					popovers: {
						component: popovers.component,
						inPlaceTargetType: typeof popovers.inPlaceTarget,
						inPlaceTargetBoxType: typeof popovers.inPlaceTargetBox,
						inPlaceTarget: popovers.inPlaceTarget,
						inPlaceTargetBox: popovers.inPlaceTargetBox
					},

					viewport: {
						width: viewport.width,
						height: viewport.height,
						scrollX: viewport.scrollX,
						scrollY: viewport.scrollY,
						isScrolled: viewport.isScrolled,
						isScrolledX: viewport.isScrolledX,
						isLandscape: viewport.isLandscape,
						isPortrait: viewport.isPortrait
					}

				};
			}

		},

		methods: {

			openPopover: function (event) {
				popovers.open('ConsoleConfiguration', event.target, {
					someParameter: 'Foo'
				});
			}

		}

	};

</script>

<template>

	<div class="view-console-services">

		<p><click :callback="openPopover"><button>Open popover</button></click></p>

		<template v-for="(values, serviceName) in dump">

			<h3><code>{{ serviceName }}</code></h3>

			<table class="separate">
				<tr v-for="(value, key) in values">
					<td><code>{{ key }}</code></td>
					<td><pre><code>{{ JSON.stringify(value, null, 2) }}</code></pre></td>
				</tr>
			</table>

		</template>

	</div>

</template>

<style lang="scss">
	// @import '~@styles/shared.scss';
	.view-console-services {
		th,
		td {
			&:first-child {
				width: 10em;
			}
		}
	}
</style>
