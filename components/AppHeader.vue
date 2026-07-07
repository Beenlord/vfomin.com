<template>
	<header class="AppHeader">
		<h1 class="AppHeader__name">{{ name }}</h1>
		<p v-if="position" class="AppHeader__position">{{ position }}</p>
	</header>
</template>

<script>
export default {
	name: 'AppHeader',

	props: {
		name: { type: String, default: '' },
		position: { type: String, default: '' },
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

	&__position {
		margin-top: var(--gap-s);

		font-family: var(--ff-label);
		font-size: var(--fs-xs);
		font-weight: 700;
		letter-spacing: var(--ls-label);
		text-transform: uppercase;
		color: var(--c-text-muted);
	}
}

@media (max-width: 640px) {
	.AppHeader__name {
		letter-spacing: 0.08em;
	}
}
</style>
