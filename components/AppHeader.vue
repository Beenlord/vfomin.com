<template>
	<header class="AppHeader">
		<h1 class="AppHeader__name">{{ name }}</h1>

		<ul v-if="tags.length" class="AppHeader__tags">
			<li v-for="(tag, i) in tags" :key="i" class="AppHeader__tag">
				#{{ tag }}
			</li>
		</ul>
	</header>
</template>

<script>
export default {
	name: 'AppHeader',

	props: {
		name: { type: String, default: '' },
		tags: { type: Array, default: () => [] },
	},
};
</script>

<style lang="scss" scoped>
.AppHeader {
	&__name {
		font-size: var(--fs-xl);
		font-weight: var(--fw-l);
		letter-spacing: var(--ls-name);
		text-transform: uppercase;
		line-height: 1.05;
	}

	&__tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--gap-s);
		margin-top: var(--gap-m);
	}

	&__tag {
		font-size: var(--fs-s);
		letter-spacing: 0.03em;
		color: var(--c-text-muted);
	}
}

@media (max-width: 640px) {
	.AppHeader__name {
		letter-spacing: 0.08em;
	}
}
</style>
