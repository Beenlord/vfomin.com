<template>
	<button
		class="ThemeSwitch"
		type="button"
		:aria-label="isDark ? 'Включить дневную тему' : 'Включить ночную тему'"
		@click="toggle"
	>
		<span class="ThemeSwitch__icon" aria-hidden="true">
			<!-- Солнце -->
			<svg
				v-if="isDark"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
			>
				<circle cx="12" cy="12" r="4" />
				<path
					d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"
				/>
			</svg>
			<!-- Луна -->
			<svg v-else viewBox="0 0 24 24" fill="currentColor">
				<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
			</svg>
		</span>
		<span class="ThemeSwitch__label kicker">{{
			isDark ? 'День' : 'Ночь'
		}}</span>
	</button>
</template>

<script>
const STORAGE_KEY = 'portfolio-theme';

export default {
	name: 'ThemeSwitch',

	data() {
		return {
			theme: 'light',
		};
	},

	computed: {
		isDark() {
			return this.theme === 'dark';
		},
	},

	mounted() {
		const saved = localStorage.getItem(STORAGE_KEY);
		const prefersDark =
			window.matchMedia &&
			window.matchMedia('(prefers-color-scheme: dark)').matches;

		this.apply(saved || (prefersDark ? 'dark' : 'light'));
	},

	methods: {
		toggle() {
			this.apply(this.isDark ? 'light' : 'dark');
		},

		apply(theme) {
			this.theme = theme;
			document.documentElement.setAttribute('data-theme', theme);
			localStorage.setItem(STORAGE_KEY, theme);
		},
	},
};
</script>

<style lang="scss" scoped>
.ThemeSwitch {
	display: inline-flex;
	align-items: center;
	gap: var(--gap-xs);

	padding: 0.8rem var(--gap-s);

	color: var(--c-text);

	background-color: var(--c-bg);
	border: var(--rule);

	transition:
		var(--theme-transition),
		color 0.15s ease;

	&:hover {
		color: var(--c-bg);
		background-color: var(--c-text);
	}

	&__icon {
		display: inline-flex;
		width: 1.8rem;
		height: 1.8rem;

		svg {
			width: 100%;
			height: 100%;
		}
	}
}
</style>
