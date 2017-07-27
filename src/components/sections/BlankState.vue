<script>
	export default {
		name: 'blank-state',

		props: {

			title: {
				type: String,
				required: true
			},

			description: {
				type: String,
				required: false
			}

		},

		computed: {

			hasDescription: function () {
				return this.description && this.description.length;
			},

			hasExtra: function () {
				return this.$slots.default && this.$slots.default.length ? true : false;
			}

		}

	};

</script>

<template>

	<div class="view-blank-state">
		<div class="view-blank-state-content">

			<!-- If title changes, transition it smoothly -->
			<fade>
				<h2 class="view-blank-state-title" :key="title">{{ title }}</h2>
			</fade>

			<!-- If description changes, transition it smoothly -->
			<fade>
				<p class="view-blank-state-description" v-if="hasDescription" :key="description">{{ description }}</p>
			</fade>

			<!-- Additional content -->
			<fade>
				<p class="view-blank-state-extra" v-if="hasExtra"><slot></slot></p>
			</fade>

		</div>
	</div>

</template>

<style lang="scss">
	@import '~@shared-styles';

	.view-blank-state {
		@include container-white-buffer;
		@include buffer-loose-even;
		text-align: center;
	}

	.view-blank-state-content {
		@include keep-center;
		@include limit-tiny;
	}

	.view-blank-state-title,
	.view-blank-state-description {
		@include no-push-vertical;
	}

	.view-blank-state-description {
		color: $color-discreet;
	}

	.view-blank-state-extra {
		@include push-top;
		@include no-push-bottom;
	}

</style>
