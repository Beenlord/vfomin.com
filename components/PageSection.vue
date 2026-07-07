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
	border-top: var(--rule-thick);

	&__title {
		margin: var(--gap-s) 0 var(--gap-l);

		font-family: var(--ff-label);
		font-size: var(--fs-xs);
		font-weight: 700;
		letter-spacing: var(--ls-label);
		text-transform: uppercase;
		color: var(--c-text);
	}
}
</style>
