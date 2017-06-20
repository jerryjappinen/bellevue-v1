<script>

	// Custom utilities
	import { dom } from '@util';

	// Services
	import { notifications } from '@services';

	export default {
		name: 'notification',

		computed: {

			message: function () {
				return notifications.message;
			},

			// NOTE: this won't trigger transition if reopening the same component
			key: function () {
				return 'notification-' + this.message;
			},

			classes: function () {
				return dom.composeClassnames({
					on: notifications.shouldBeShown,
					off: !notifications.shouldBeShown
				}, 'view-notification');
			}

		},

		methods: {

			close: function () {
				notifications.close();
			}

		}

	};

</script>



<template>

	<div class="view-notification" :class="classes">
		<div class="view-notification-content">

			<!--

				NOTE
				- Example of how to use the key attribute to enable transitioning to elements of the same type.
				- Also enables transitioning out an element that contains a value whose value has already changed: Vue will keep the old value in the scope until the exit transition is complete.

				FIXME
				- this should be mentioned in guide about transitions

			-->

			<!--
				- This allows us to transition from one message to another while this wrapper is still active
				- I could also transition the whole notification component in and out by setting the keys in App.vue
			-->

			<transition name="transition-fade" mode="out-in">
				<div v-if="message" :key="key">
					<div>{{ message }}</div>
					<div><click-button :callback="close">Close</click-button></div>
				</div>
			</transition>

		</div>
	</div>

</template>



<style lang="scss">
	@import '~@shared-styles';

	.view-notification {

		&.transition-fade-enter,
		&.transition-fade-leave-to {
			opacity: 0;
		}

	}

	.view-notification-content {
		@include border-box;
		@include clear-after;
		position: relative;
		overflow: hidden;

		width: 26em;
		background-color: $color-white;
		@include radius-loose;
		@include shadow;
		@include buffer-tight-even;

		@include transition-slow;
	}

</style>
