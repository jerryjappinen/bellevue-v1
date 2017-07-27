// Menu service
// Offers up the main menu structure for the current user that can be used by any component
import Vue from 'vue';
import { filter, isUndefined, merge } from 'lodash';

import { auth } from '@services';
// import config from '@config';

export default new Vue({

	data: function () {
		return {
			links: [

				// Home link
				{
					label: 'Home',
					route: {
						name: 'root'
					}
				},

				// Category link
				{
					label: 'Posts',
					// keepParams: [],
					route: {
						name: 'posts',
						params: {
							// page: 1
						}
					}
				}

			]
		};
	},

	computed: {

		accessibleLinks: function () {
			return filter(this.links, function (link) {
				return auth.canAccessRoute(link.route.name) ? true : false;
			});
		},

		accessibleLinksWithoutRoot: function () {
			var links = this.accessibleLinks;

			// Look for root link in all links
			for (var i = 0; i < links.length; i++) {
				var link = links[i];

				// Match based on the named route name
				if (link.route.name === 'root') {

					// Remove link
					links.splice(i, 1);

					// Only removing the first root link, since we shouldn't have more
					break;
				}

			}

			return links;
		}

	},

	methods: {

		composeRouterLink: function (link, currentRoute) {
			var linkParams = link.route.params ? link.route.params : {};

			var keepParams = {};
			if (link.keepParams) {

				// Some URLs might be defined in URL and we want to keep them
				for (var i = 0; i < link.keepParams.length; i++) {
					var paramName = link.keepParams[i];
					if (!isUndefined(currentRoute.params[paramName])) {
						keepParams[paramName] = currentRoute.params[paramName];
					}
				}

			}

			return {
				name: link.route.name,
				params: merge(keepParams, linkParams)
			};

		}

	}

});
