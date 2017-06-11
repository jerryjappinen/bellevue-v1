
<script>

	export default {
		name: 'page-something',

		data: function () {
			return {
				myValue: 20
			};
		}

	};

</script>

<template>

	<div class="view-page-something">

		<h1>1-way and 2-way bindings</h1>

		<div class="bodytext" v-once>

			<p>Here we iterate counters in a few different ways. We're using two different child components, <code>&lt;local-counter&gt;</code>, and <code>&lt;counter&gt;</code>, that are set up for 1-way and 2-way bindings respectively:</p>

			<ul>
				<li>1-way binding is the default in Vue. It means that if you pass a value from a parent component to a child component, the child component can change that value but the parent component will not receive these updates. Vue has scoped both values and they are independent.</li>
				<li>2-way binding means that any changes the child makes to the value are also reflected in the parent scope. Vue requires you to explicitly fire update events to the parent scope, and the parent component to react to those events.</li>
			</ul>

			<p>While it requires a bit more work to set up and keep track of 2-way bindings this way, it also makes the code less magical and allows more granular control over how parent components should react to child components' update events. Vue comes with some syntactic sugar to make this easier, and you can limit using 2-way bindings in <code>control</code> components to make it clear which components are read-only and which mutate values in parent scope.</p>

		</div>

		<h2>Fun with counters {{ myValue }}</h2>

		<dl>
			<dt>LocalCounter (for 1-way bindings)</dt>

			<!-- Simple counter example with only ONE-WAY data binding -->
			<!-- NOTE: passing the same value to two components like this would be confusing in production -->
			<dd><local-counter label="Nothing passed (iterates a default value)"></local-counter></dd>
			<dd><local-counter label="myValue passed as value" :value="myValue"></local-counter></dd>

			<!-- Simple counter example with TWO-WAY data binding, i.e. the child component mutates the value of this component -->
			<!-- https://vuejs.org/v2/guide/components.html#Form-Input-Components-using-Custom-Events -->
			<dd><counter class="view-page-something-counter-1" label="Counter: Two-way binding to myValue" v-model="myValue"></counter></dd>
			<dd><counter class="view-page-something-counter-2" label="Counter: Two-way binding to myValue" v-model="myValue"></counter></dd>

			<dt>Counter (for 2-way bindings)</dt>
		</dl>

	</div>

</template>

<style lang="scss">
	@import '~@styles/shared';

	// Override child component styles per context
	.view-page-something-counter-2 {

		.view-counter-label {
			color: $color-green;
		}

	}

</style>
