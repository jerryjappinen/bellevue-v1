import { includes, isArray, merge } from 'lodash';
import axios from 'axios';

import env from '../env';
import { processLargeArray } from '@util';

export default {

	data: function () {
		return {
			operationsCount: 0,
			defaultParameters: {}
		};
	},

	computed: {

		basePath: function () {
			if (env.currentRemote) {
				return env.currentRemote.apiPath;
			}
			return null;
		},

		isOperating: function () {
			return this.operationsCount > 0 ? true : false;
		}

	},

	methods: {

		// Something really wrong with backend
		onTotalFail: function (error) {
			console.log('API onTotalFail', error.message);
		},

		// Request sent but got no response
		onNoResponse: function (error) {
			console.log('API onNoResponse', error.request);
		},

		onAuthenticationFail: function (error) {
			console.log('API onAuthenticationFail', error.response);
			// window.location = env.currentRemote.loginPath;
		},

		// FIXME: should handle this with a notification or something
		onAuthorisationFail: function (error) {
			console.log('API onAuthorisationFail', error.response);
		},



		onOperationStart: function () {
			this.operationsCount++;
		},

		onOperationEnd: function () {
			this.operationsCount--;
		},



		// Generic AJAX methods

		onSendSuccess: function (customOnSuccess, customOnEither, response) {
			this.onOperationEnd();

			if (customOnSuccess) {
				customOnSuccess(response);
			}

			if (customOnEither) {
				customOnEither();
			}

		},

		onSendFail: function (customOnFail, customOnEither, error) {

			// Clean up after operation
			this.onOperationEnd();

			// The request was made, server responded with a status code (out of the range of 2xx)
			if (error.response) {

				// Missing access rights
				if (error.response.status === 401) {
					this.onAuthorisationFail();
				}

				// Not authenticated at all
				if (error.response.status === 403) {
					this.onAuthenticationFail();
				}

			// The request was made but no response was received
			// Happens when user is offline among other things
			// error.request is an `XMLHttpRequest`
			} else if (error.request) {
				this.onNoResponse(error);

			// Something happened in setting up the request that triggered an `Error`
			} else {
				this.onTotalFail(error);
			}

			// Custom handler
			if (customOnFail) {
				customOnFail(error);
			}

			// Clean up after operation
			if (customOnEither) {
				customOnEither();
			}

		},

		send: function (method, path, data, parameters, onSuccess, onFail, onEither, transformer) {
			var service = this;
			this.onOperationStart();

			// Merge custom parameters with
			parameters = merge({}, this.defaultParameters, parameters);

			// Normalise path so it always has a trailing slash
			// if (path.substr(-1) !== '/') {
			// 	path = path + '/';
			// }

			// Normalise path so it never has a trailing slash
			if (path.substr(-1) === '/') {
				path = path.substr(0, path.length - 1);
			}

			// Send request and do callback on success
			// FIXME: hackity hack
			let callback = function () {

				if (includes(['post', 'put', 'patch'], method)) {
					return axios[method](
						path,
						data,
						{
							baseURL: service.basePath,
							withCredentials: true,
							// headers: {},
							params: parameters
						}
					);
				}

				return axios[method](path, {
					baseURL: service.basePath,
					withCredentials: true,
					// headers: {},
					params: parameters
				});
			};

			return callback().then(function (response) {

				// onSuccess callback defined
				if (onSuccess) {

					// Transformation function defined
					if (transformer) {

						// We got one object: transform it and call request done
						if (!isArray(response.data)) {
							response.data = transformer(response.data);
							service.onSendSuccess(onSuccess, onEither, response);

						// We got a list: transform each item
						} else {
							// var consoleDate = new Date();

							// Process large data sets with the help of promises to not in chunks with this helper method
							let transformationPromise = new Promise(function (resolve, reject) {
								processLargeArray(

									// List to process
									response.data,

									// Callback to pass each item to
									// FIXME: support promises in transformers
									function (item, i, array) {
										array[i] = transformer(item);
									},

									// After last item has been processed
									function () {
										resolve(response);
									}

								);
							});

							// Run promise code
							transformationPromise.then(function (resolvedResponse) {
								// console.log('API list transformation: ' + (new Date() - consoleDate) + ' ms');

								// Finally resolve api.send
								service.onSendSuccess(onSuccess, onEither, resolvedResponse);
							});

						}

					// No transformer defined, we're done
					} else {
						service.onSendSuccess(onSuccess, onEither, response);
					}
				}

			// Request fails or something else goes wrong
			}).catch(function (error) {
				service.onSendFail(onFail, onEither, error);
			});
		},

		get: function (path, parameters, onSuccess, onFail, onEither, transformer) {
			return this.send('get', path, {}, parameters, onSuccess, onFail, onEither, transformer);
		},

		post: function (path, data, parameters, onSuccess, onFail, onEither, transformer) {
			return this.send('post', path, data, parameters, onSuccess, onFail, onEither, transformer);
		}

	}

};
