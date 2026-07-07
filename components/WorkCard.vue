<template>
	<component
		:is="href ? 'a' : 'div'"
		class="WorkCard"
		:href="href ? normalizedHref : null"
		:target="href ? '_blank' : null"
		:rel="href ? 'noopener noreferrer' : null"
	>
		<div class="WorkCard__cover">
			<img
				v-if="cover && !coverFailed"
				:src="cover"
				:alt="title"
				loading="lazy"
				@error="coverFailed = true"
			/>
			<span v-else class="WorkCard__cover-fallback" aria-hidden="true">{{
				initial
			}}</span>
		</div>

		<div class="WorkCard__body">
			<h3 class="WorkCard__title">{{ title }}</h3>
			<p v-if="description" class="WorkCard__desc">{{ description }}</p>
		</div>
	</component>
</template>

<script>
export default {
	name: 'WorkCard',

	props: {
		title: { type: String, default: '' },
		description: { type: String, default: '' },
		cover: { type: String, default: '' },
		href: { type: String, default: '' },
	},

	data() {
		return {
			coverFailed: false,
		};
	},

	computed: {
		initial() {
			return (this.title || '?').charAt(0).toUpperCase();
		},

		normalizedHref() {
			if (!this.href) return null;
			return /^https?:\/\//.test(this.href)
				? this.href
				: `https://${this.href}`;
		},
	},
};
</script>

<style lang="scss" scoped>
.WorkCard {
	display: flex;
	flex-direction: column;

	color: var(--c-text);

	background-color: var(--c-surface);
	border: var(--bw) solid var(--c-border);

	transition:
		var(--theme-transition),
		transform 0.15s ease,
		box-shadow 0.15s ease;

	&:hover {
		transform: translate(-4px, -4px);
		box-shadow: var(--shadow-hard);
	}

	&__cover {
		display: flex;
		align-items: center;
		justify-content: center;

		aspect-ratio: 16 / 10;
		overflow: hidden;

		background-color: var(--c-surface-2);
		border-bottom: var(--bw) solid var(--c-border);

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			filter: grayscale(1);
		}
	}

	&__cover-fallback {
		font-family: var(--ff-title);
		font-size: var(--fs-xl);
		font-weight: var(--fw-l);
		color: var(--c-text-muted);
	}

	&__body {
		padding: var(--gap-m);
	}

	&__title {
		font-size: var(--fs-m);
		font-weight: var(--fw-l);
	}

	&__desc {
		margin-top: var(--gap-xs);
		font-size: var(--fs-s);
		color: var(--c-text-muted);
	}
}
</style>
