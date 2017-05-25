
<script>

	import { dom } from '@util';
	import { viewport } from '@services';

	export default {
		name: 'titlebar',

		data: function () {
			return {};
		},

		props: [
		],

		computed: {

			isScrolled: function () {
				return viewport.isScrolled;
			},

			classes: function () {
				return dom.composeClassnames({
					scrolled: this.isScrolled
				}, 'view-titlebar');
			}

		},

		methods: {

		}

	};

</script>

<template>

	<div class="view-titlebar" :class="classes">

		<ul class="view-titlebar-list">

			<!--Logo-->
			<li class="view-titlebar-list-item">
				<router-link class="view-titlebar-link" :to="{ name: 'hello' }">
					<pic class="view-titlebar-link-image" title="Foo" src="logo.png" hide-until-loaded></pic> Hello
				</router-link>
			</li>

		</ul>

	</div>

</template>

<style lang="scss">
	@import '~@styles/shared.scss';

	.view-titlebar {
		@include fill-width-fixed;
		line-height: 1;
		top: 0;
		z-index: $z-titlebar;

		background-color: $color-white;

		@include shadow;
		@include transition-slow;
		@include transition-properties-common;

		ul,
		ol,
		p {
			@include no-push-vertical;
		}

	}

	.view-titlebar-scrolled {
		@include shadow-loose;
	}

	.view-titlebar-list {
		@include clear-after;
	}

	.view-titlebar-list-item {
		@include keep-left;
	}

	.view-titlebar-link {
		display: block;
		@include buffer-tight-even;
	}

	.view-titlebar-link-image {
		display: inline-block;
		width: 1em;
		height: 1em;
		margin-left: 0.25em;
		margin-right: 0.25em;
		transform: scale(1.5);
	}

</style>
