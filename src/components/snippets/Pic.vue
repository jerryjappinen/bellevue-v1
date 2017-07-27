<script>
	import { isEmpty, isString } from 'lodash';

	export default {

		name: 'pic',

		// NOTE: not bothering with validation here since this is a lightweight wrapper component
		props: [
			'asset',
			'src',
			'hideUntilLoaded',
			'title'
		],

		computed: {

			useSvg: function () {
				if (isString(this.asset) && !isEmpty(this.asset)) {
					return true;
				}
				return false;
			}

		}

	};

</script>

<template>

	<span class="view-pic">
		<pic-svg v-if="useSvg" :asset="asset"></pic-svg>
		<pic-img v-else :src="src" :title="title" :hideUntilLoaded="hideUntilLoaded"></pic-img>
	</span>

</template>

<style lang="scss">
	@import '~@shared-styles';

	.view-pic {
		display: inline-block;
	}

</style>
