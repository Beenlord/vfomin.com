<template>
	<div class="SkillBar">
		<div class="SkillBar__head">
			<span class="SkillBar__name">{{ name }}</span>
			<span v-if="experienceLabel" class="SkillBar__xp">{{
				experienceLabel
			}}</span>
		</div>

		<div
			class="SkillBar__track"
			role="progressbar"
			:aria-valuenow="value"
			aria-valuemin="0"
			aria-valuemax="100"
		>
			<div class="SkillBar__fill" :style="{ width: value + '%' }" />
		</div>
	</div>
</template>

<script>
export default {
	name: 'SkillBar',

	props: {
		name: { type: String, default: '' },
		// Оценка навыка в процентах (0–100)
		skillValue: { type: Number, default: 0 },
		// Год начала отсчёта опыта
		sinceValue: { type: Number, default: null },
	},

	computed: {
		value() {
			return Math.max(0, Math.min(100, this.skillValue));
		},

		years() {
			if (!this.sinceValue) return null;
			return new Date().getFullYear() - this.sinceValue;
		},

		experienceLabel() {
			if (this.years === null || this.years < 0) return '';
			if (this.years === 0) return '< года';
			return `${this.years} ${this.pluralYears(this.years)}`;
		},
	},

	methods: {
		pluralYears(n) {
			const mod10 = n % 10;
			const mod100 = n % 100;
			if (mod10 === 1 && mod100 !== 11) return 'год';
			if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20))
				return 'года';
			return 'лет';
		},
	},
};
</script>

<style lang="scss" scoped>
.SkillBar {
	&__head {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: var(--gap-s);
		margin-bottom: var(--gap-xs);
	}

	&__name {
		font-size: var(--fs-s);
		color: var(--c-text);
	}

	&__xp {
		font-size: var(--fs-xs);
		color: var(--c-text-muted);
	}

	&__track {
		width: 100%;
		height: 0.9rem;
		padding: 1px;
		background-color: var(--c-surface-2);
		border: var(--bw) solid var(--c-border);
	}

	&__fill {
		height: 100%;
		background-color: var(--c-accent);
		transition: width 0.5s ease;
	}
}
</style>
