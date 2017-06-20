<script>
	import _ from 'lodash';
	import axios from 'axios';

	import { string } from '@util';

	export default {
		name: 'console-plugins',

		data: function () {
			return {
				httpError: null,
				httpResponse: null,
				testingHttp: false
			};
		},

		computed: {

			utilStringDomainName: function () {
				return string.getDomainName(' github.com');
			},

			httpResult: function () {
				if (this.httpError) {
					window.a = this.httpError;
					return this.httpError.message;
				} else if (this.httpResponse) {
					return JSON.stringify(this.httpResponse, null, 2);
				}
				return null;
			},

			throttleIsAvailable: function () {
				return this.$throttle ? true : false;
			}

		},

		methods: {

			testHttp: function () {
				var vm = this;
				this.testingHttp = true;

				// Artificial lag
				setTimeout(function () {

					var url = 'https://jsonplaceholder.typicode.com';

					var options = {
						params: {
							id: 12345
						}
					};

					axios.get(url, options)
						.then(function (response) {
							vm.testingHttp = false;
							vm.httpResponse = _.merge({}, response, { data: '...' });
						})
						.catch(function (error) {
							vm.testingHttp = false;
							vm.httpError = error;

							// The request was made and the server responded with a status code
							// that falls out of the range of 2xx
							if (error.response) {
								console.log('error.response', error.response.data, error.response.status, error.response.headers);

							// The request was made but no response was received
							// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
							// http.ClientRequest in node.js
							} else if (error.request) {
								console.log('error.request', error.request);

							// Something happened in setting up the request that triggered an Error
							} else {
								console.log('error.message', error.message);
							}

							console.log('error.config', error.config);
						});

				}, 2000);

			}

		},

		created: function () {
			this.testHttp();
		}

	};

</script>

<template>

	<dl>

		<!-- Utils -->
		<dt><code>util.string</code></dt>
		<dd><pre><code>{{ utilStringDomainName }}</code></pre></dd>

		<!-- Throttle -->
		<dt><code>$throttle</code></dt>
		<dd><pre><code>{{ throttleIsAvailable }}</code></pre></dd>

		<!-- http -->
		<template v-if="httpResult || testingHttp">
			<dt>Testing Axios <spinner-small v-if="testingHttp"></spinner-small></dt>
			<dd>
				<transition name="transition-fade" mode="out-in">
					<pre key="testingHttpPlaceholder" v-if="testingHttp"><code>http get...</code></pre>
					<pre key="testingHttpResult" v-else><code>{{ httpResult }}</code></pre>
				</transition>
			</dd>
		</template>

	</dl>

</template>

<style lang="scss">
	@import '~@shared-styles';
</style>
