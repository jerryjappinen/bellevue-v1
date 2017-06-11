<script>

	// Vendor code
	// import _ from 'lodash';

	// Services
	import { network, notifications, panels, popovers, time, viewport } from '@services';

	export default {
		name: 'console-services',

		computed: {

			dump: function () {
				return {

					network: {
						isConnecting: network.isConnecting,
						isOnline: network.isOnline,
						isOffline: network.isOffline
					},

					notifications: {
						message: notifications.message,
						shouldBeShown: notifications.shouldBeShown
					},

					panels: {
						component: panels.component
					},

					popovers: {
						component: popovers.component,
						inPlaceTarget: popovers.inPlaceTarget,
						inPlaceTargetBox: popovers.inPlaceTargetBox
					},

					time: {
						current: time.current
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

			setNotificationText: function () {
				notifications.show('This is a text message.');
			},

			clearNotificationText: function () {
				notifications.close();
			},

			openPanel: function () {
				panels.open('PanelConsole');
			},

			openPopover: function () {
				popovers.open('PopoverCounter');
			},

			openPopoverInPlace: function (event) {
				popovers.open('PopoverCounter', event.target, {
					someParameter: 'Foo'
				});
			}

		}

	};

</script>

<template>

	<div class="view-console-services">

		<h2>Test services</h2>

		<ul>
			<li><click :callback="setNotificationText">Set notification text</click></li>
			<li><click :callback="clearNotificationText">Clear notification</click></li>
			<li><click :callback="openPanel"><button>Open panel</button></click></li>
			<li><click :callback="openPopover"><button>Open popover</button></click></li>
			<li><click :callback="openPopoverInPlace"><button>Open popover in-place</button> (doesn't work reliably yet)</click></li>
		</ul>

		<h2>Services state</h2>

		<dl>
			<template v-for="(values, serviceName) in dump">
				<template v-for="(value, key) in values">
					<dt><code>{{ serviceName }}.{{ key }}</code></dt>
					<dd><pre><code>{{ JSON.stringify(value, null, 2) }}</code></pre></dd>
				</template>
			</template>
		</dl>

	</div>

</template>

<style lang="scss">
	// @import '~@styles/shared';
	// .view-console-services {}
</style>
