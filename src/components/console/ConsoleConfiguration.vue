<script>

	// Vendor code
	// import _ from 'lodash';

	// Config
	import customConfiguration from '@config';

	export default {

		name: 'console-configuration',

		computed: {

			configurationValues: function () {
				return customConfiguration;
			}

		}

	};

</script>

<template>

	<table class="view-console-configuration separate">
		<tr v-for="(value, key) in configurationValues">
			<th scope="row">{{ key }}</th>
			<td><pre><code>{{ JSON.stringify(value, null, 2) }}</code></pre></td>
		</tr>
	</table>

</template>

<style lang="scss">
	// @import '~@styles/shared.scss';
	// .view-console-configuration {}
</style>
