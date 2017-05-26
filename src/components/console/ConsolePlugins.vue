<script>

	export default {

		name: 'console-plugins',

		data: function () {
			return {
				httpResponse: null,
				testingHttp: false
			};
		},

		computed: {

			throttleIsAvailable: function () {
				return this.$throttle ? true : false;
			},

			httpIsAvailable: function () {
				return this.$http ? true : false;
			}

		},

		methods: {

			testHttp: function () {
				if (this.httpIsAvailable) {
					var vm = this;
					this.testingHttp = true;

					// Artificial lag
					setTimeout(function () {

						var options = {
							params: {
								id: 12345
							}
						};

						vm.$http.get('http://localhost/', options)
							.then(function (response) {
								vm.testingHttp = false;
								vm.httpResponse = JSON.stringify(Object.create({}, response, { data: '...' }), null, 2);
							})
							.catch(function (error) {
								vm.testingHttp = false;
								throw error;
							});

					}, 2000);

				}
			}

		},

		created: function () {
			this.testHttp();
		}

	};

</script>

<template>

	<table class="view-console-plugins">

		<!-- Throttle -->
		<tr>
			<th scope="row"><code>$throttle</code></th>
			<td><code>{{ throttleIsAvailable }}</code></td>
		</tr>

		<!-- http -->
		<tr>
			<th scope="row"><code>$http</code></th>
			<td><code>{{ httpIsAvailable }}</code></td>
		</tr>
		<tr v-if="httpResponse || testingHttp">
			<td colspan="2">

				<transition name="transition-fade">

					<div key="testingHttpPlaceholder" v-if="testingHttp">
						<spinner></spinner> Testing <code>$http</code>...
					</div>

					<div key="testingHttpResult" v-else>
						<pre><code>{{ httpResponse }}</code></pre>
					</div>

				</transition>

			</td>
		</tr>

	</table>

</template>

<style lang="scss">
	@import '~@styles/shared';
</style>
