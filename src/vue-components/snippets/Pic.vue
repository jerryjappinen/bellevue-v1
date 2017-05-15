
<script>

	// Vendor
	import _ from 'lodash';

	// Child components
	import PicImg from '@components/snippets/PicImg';
	import PicSvg from '@components/snippets/PicSvg';

	// View model
	export default {

		name: 'pic',

		components: {
			PicImg: PicImg,
			PicSvg: PicSvg
		},

		// NOTE: not bothering with validation here since this is a lightweight wrapper component
		props: [
			'id',
			'src',
			'hideUntilLoaded',
			'title'
		],

		computed: {

			useSvg: function () {
				if (_.isString(this.id) && !_.isEmpty(this.id)) {
					return true;
				}
				return false;
			}

		}

	};

</script>

<template>

	<span class="view-pic">
		<pic-svg v-if="useSvg" :id="id"></pic-svg>
		<pic-img v-else :src="src" :title="title" :hideUntilLoaded="hideUntilLoaded"></pic-img>
	</span>

</template>

<style lang="scss">
	@import '~@styles/shared.scss';

	.view-pic {
		display: inline-block;
	}

</style>
