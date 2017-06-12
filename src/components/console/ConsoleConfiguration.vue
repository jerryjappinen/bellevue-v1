<script>

	// Vendor code
	// import _ from 'lodash';

	// Config
	import config from '@config';

	export default {
		name: 'console-configuration',

		computed: {

			configurationValues: function () {
				return config;
			}

		}

	};

</script>

<template>

	<dl class="view-console-configuration">
		<template v-for="(value, key) in configurationValues">
			<dt scope="row">{{ key }}</dt>
			<dd><pre><code>{{ JSON.stringify(value, null, 2) }}</code></pre></dd>
		</template>
	</dl>

</template>

<style lang="scss">
	// @import '~@shared-styles';
	// .view-console-configuration {}
</style>
