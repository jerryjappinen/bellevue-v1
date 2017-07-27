
<script>
	export default {
		name: 'fade-in',

		props: [
			'name',
			'mode',
			'appear'
		]

	};
</script>

<template>
	<custom-transition name="fade-in" :mode="mode" :appear="appear"><slot></slot></custom-transition>
</template>

<style lang="scss"></style>
