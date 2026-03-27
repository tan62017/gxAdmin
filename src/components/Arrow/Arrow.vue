<script setup>
	defineProps({
		type: {
			type: String,
			default: 'up'
		},
		color: {
			type: String,
			default: 'rgba(251, 96, 89, 1)'
		},
		size: {
			type: String,
			default: '10px'
		}
	})
</script>

<template>
	<div class="arrow" :class="[type]"></div>
</template>

<style lang="scss">
	.arrow {
		--size: v-bind(size);
		--color: v-bind(color);
		width: 0;
		height: 0;
		border: var(--size) solid transparent;
		&.left {
			border-right: var(--size) solid var(--color);
			transform: translateX(25%);
		}
		&.right {
			border-left: var(--size) solid var(--color);
			transform: translateX(-25%);
		}
		&.up {
			border-bottom: var(--size) solid var(--color);
			transform: translateY(-25%);
		}
		&.down {
			border-top: var(--size) solid var(--color);
			transform: translateY(25%);
		}
	}
</style>
