<script>
	import { auth, env, network, notifications, panels, popovers, time, viewport } from '@services';

	export default {
		name: 'console-services',

		computed: {

			dump: function () {
				return {

					auth: {
						currentAccount: auth.currentAccount ? auth.currentAccount.nameOrEmail : auth.currentAccount,
						isLoading: auth.isLoading
					},

					env: {
						os: env.os,
						currentRemote: {
							code: env.currentRemote.code,
							isConfigured: env.currentRemote.isConfigured
						}
					},

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
						inPlaceTarget: popovers.inPlaceTarget ? 'yes' : 'no',
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
				panels.open('PanelReadme');
			},

			openPopover: function () {
				popovers.open('PopoverMainMenu');
			},

			openPopoverInPlace: function (event) {
				popovers.open('PopoverMainMenu', event.target, {
					someParameter: 'Foo'
				});
			}

		}

	};

</script>

<template>

	<div class="view-console-services">

		<p>
			<click-button theme="plain" :callback="setNotificationText">Set notification text</click-button>
			<click-button theme="plain" :callback="clearNotificationText">Clear notification</click-button>
			<click-button theme="plain" :callback="openPanel">Open panel</click-button>
			<click-button theme="plain" :callback="openPopover">Open popover</click-button>
			<click-button theme="plain" :callback="openPopoverInPlace">Open popover in-place (doesn't work reliably yet)</click-button>
		</p>

		<template v-for="(values, serviceName) in dump">

			<h2>{{ serviceName }}</h2>

			<dl>
				<template v-for="(value, key) in values">
					<dt><code>{{ serviceName }}.{{ key }}</code></dt>
					<dd><pre><code>{{ JSON.stringify(value, null, 2) }}</code></pre></dd>
				</template>
			</dl>

		</template>

	</div>

</template>

<style lang="scss">
	// @import '~@shared-styles';
	// .view-console-services {}
</style>
