<template>
	<section class="PageSection">
		<h2 class="PageSection__title">{{ title }}</h2>
		<div class="PageSection__body">
			<slot />
		</div>
	</section>
</template>

<script>
export default {
	name: 'PageSection',

	props: {
		title: {
			type: String,
			required: true,
		},
	},
};
</script>

<style lang="scss" scoped>
.PageSection {
	display: flex;
	flex-direction: column;

	&__title {
		margin-bottom: var(--gap-m);
		padding-bottom: var(--gap-s);

		font-family: var(--ff-label);
		font-size: var(--fs-xs);
		font-weight: 700;
		letter-spacing: var(--ls-label);
		text-transform: uppercase;
		color: var(--c-text-strong);

		border-bottom: var(--bw) solid var(--c-border);
	}

	&__body {
		flex: 1;
	}
}
</style>
