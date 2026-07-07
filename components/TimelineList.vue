<template>
	<ul class="TimelineList">
		<li v-for="(item, i) in items" :key="i" class="TimelineList__item">
			<div class="TimelineList__period kicker">{{ item.years }}</div>
			<div class="TimelineList__content">
				<h3 class="TimelineList__title">{{ item.name }}</h3>
				<p v-if="textOf(item)" class="TimelineList__text">
					{{ textOf(item) }}
				</p>
			</div>
		</li>
	</ul>
</template>

<script>
export default {
	name: 'TimelineList',

	props: {
		items: {
			type: Array,
			default: () => [],
		},
	},

	methods: {
		// Опыт хранит описание в description, образование — в education.
		textOf(item) {
			return item.description || item.education || '';
		},
	},
};
</script>

<style lang="scss" scoped>
.TimelineList {
	&__item {
		display: grid;
		grid-template-columns: 15rem 1fr;
		gap: var(--gap-l);

		padding: var(--gap-m) 0;
		border-top: var(--rule);

		&:first-child {
			border-top: none;
			padding-top: 0;
		}

		&:last-child {
			padding-bottom: 0;
		}
	}

	&__period {
		padding-top: 0.4rem;
		color: var(--c-text-muted);
	}

	&__title {
		font-size: var(--fs-m);
		font-weight: var(--fw-m);
		color: var(--c-text);
	}

	&__text {
		margin-top: var(--gap-xs);
		color: var(--c-text-muted);
	}
}

@media (max-width: 640px) {
	.TimelineList__item {
		grid-template-columns: 1fr;
		gap: var(--gap-xs);
	}
}
</style>
