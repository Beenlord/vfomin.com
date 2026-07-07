<template>
	<ul class="EntryList" :class="{ 'EntryList--compact': compact }">
		<li v-for="(item, i) in items" :key="i" class="EntryList__item">
			<h3 class="EntryList__name">{{ item.name }}</h3>
			<p v-if="item.years" class="EntryList__years">{{ item.years }}</p>
			<p v-if="textOf(item)" class="EntryList__text">
				{{ textOf(item) }}
			</p>
		</li>
	</ul>
</template>

<script>
export default {
	name: 'EntryList',

	props: {
		items: {
			type: Array,
			default: () => [],
		},
		// Компактный режим — для узкого сайдбара (образование)
		compact: {
			type: Boolean,
			default: false,
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
.EntryList {
	display: flex;
	flex-direction: column;

	&__item + &__item {
		margin-top: var(--gap-l);
		padding-top: var(--gap-l);
		border-top: var(--bw) solid var(--c-border);
	}

	&__name {
		font-size: var(--fs-m);
		font-weight: var(--fw-l);
		color: var(--c-text-strong);
	}

	&__years {
		margin-top: 0.4rem;
		font-family: var(--ff-label);
		font-size: var(--fs-xs);
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--c-text-muted);
	}

	&__text {
		margin-top: var(--gap-s);
		color: var(--c-text);
	}

	/* Компактный вариант для сайдбара */
	&--compact {
		.EntryList__item + .EntryList__item {
			margin-top: var(--gap-m);
			padding-top: var(--gap-m);
		}

		.EntryList__name {
			font-size: var(--fs-s);
		}

		.EntryList__text {
			margin-top: var(--gap-xs);
			font-size: var(--fs-xs);
			color: var(--c-text-muted);
		}
	}
}
</style>
