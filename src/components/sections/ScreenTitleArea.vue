
<script>
	import { isFunction, isPlainObject } from 'lodash';
	import { trimWhitespace } from '@util';

	export default {
		name: 'screen-title-area',

		props: {

			back: {
				required: false,
				default: null
			}

		},

		computed: {

			renderTitle: function () {
				return this.$slots.default && this.$slots.default.length ? true : false;
			},

			titleKey: function () {
				if (this.renderTitle) {
					let key = '';
					let slotTags = this.$slots.default;
					for (var i = 0; i < slotTags.length; i++) {
						key += slotTags[i].text ? slotTags[i].text : '';
					}
					return trimWhitespace(key);
				}
				return null;
			},

			renderControls: function () {
				return this.$slots.controls && this.$slots.controls.length;
			}

		},

		methods: {

			onBack: function () {

				if (this.back) {

					if (isPlainObject(this.back)) {
						this.$router.push(this.back);

					} else if (isFunction(this.back)) {
						this.back();
					}

				} else {
					window.history.back();
				}

			}

		}

	};

</script>

<template>

	<div class="view-screen-title-area">

		<!-- Back button and title -->
		<fade>

			<!-- FIXME: would be better if this was a link with a href -->
			<div class="view-screen-title-area-back" v-if="back">
				<icon-button icon="arrow-left" :callback="onBack"></icon-button>
			</div>

		</fade>

		<fade>
			<div class="view-screen-title-area-title" v-if="renderTitle" :key="titleKey">
				<h1><slot></slot></h1>
			</div>
		</fade>

		<div class="view-screen-title-area-controls" v-if="renderControls">
			<slot name="controls"></slot>
		</div>

	</div>

</template>

<style lang="scss">
	@import '~@shared-styles';

	.view-screen-title-area {
		@include push-bottom;
		@include flex;
	}

	.view-screen-title-area-back {
		width: 3em;

		.view-icon-button {
			vertical-align: middle;
		}

	}

	.view-screen-title-area-title {
		flex-grow: 1;

		h1 {
			@include no-push-vertical;
			line-height: 1;
			position: relative;
			top: 0.1em;
			display: inline-block;
			vertical-align: middle;
		}

	}

	.view-screen-title-area-controls {
		flex-grow: 1;
		text-align: right;
	}

</style>
