<template>
	<header class="ProfileCard">
		<div class="ProfileCard__avatar">
			<img
				:src="avatarSrc"
				:alt="name"
				loading="lazy"
				@error="onAvatarError"
			/>
		</div>

		<div class="ProfileCard__info">
			<p v-if="ageLabel" class="ProfileCard__byline kicker">
				{{ ageLabel }}
			</p>

			<h1 class="ProfileCard__name">{{ name }}</h1>

			<p v-if="about" class="ProfileCard__about">{{ about }}</p>

			<ul v-if="contacts.length" class="ProfileCard__links">
				<li v-for="(link, i) in contacts" :key="i">
					<a
						class="ProfileCard__link"
						:href="link.href || '#'"
						target="_blank"
						rel="noopener noreferrer"
					>
						<span
							class="ProfileCard__link-icon"
							:style="{ '--icon': `url(${link.iconSrc})` }"
							aria-hidden="true"
						/>
						<span v-if="link.text" class="ProfileCard__link-text">{{
							link.text
						}}</span>
					</a>
				</li>
			</ul>
		</div>
	</header>
</template>

<script>
import fallbackAvatar from '@/assets/i/avatar.svg';

// Контекст всех изображений из assets/i — чтобы резолвить пути,
// заданные в конфиге (например '@/assets/i/icons/tg.svg').
const media = require.context(
	'@/assets/i',
	true,
	/\.(png|jpe?g|webp|gif|svg)$/
);

/**
 * Превращает путь из конфига в реальный URL, обработанный сборщиком.
 * Абсолютные пути ('/...' или 'http...') отдаются как есть.
 * Ненайденный ассет возвращает null.
 */
function resolveAsset(path) {
	if (!path) return null;
	if (/^(https?:)?\//.test(path)) return path;

	const key = path.replace(/^[@~]\/assets\/i\//, './');
	try {
		return media(key);
	} catch (e) {
		return null;
	}
}

export default {
	name: 'ProfileCard',

	props: {
		name: { type: String, default: '' },
		avatar: { type: String, default: '' },
		birthDate: { type: String, default: '' },
		about: { type: String, default: '' },
		links: { type: Array, default: () => [] },
	},

	data() {
		return {
			avatarSrc: resolveAsset(this.avatar) || fallbackAvatar,
		};
	},

	computed: {
		age() {
			// birthDate в формате dd.mm.yyyy
			const parts = (this.birthDate || '').split('.').map(Number);
			if (parts.length !== 3 || parts.some(isNaN)) return null;

			const [day, month, year] = parts;
			const today = new Date();
			let age = today.getFullYear() - year;

			const passed =
				today.getMonth() + 1 > month ||
				(today.getMonth() + 1 === month && today.getDate() >= day);
			if (!passed) age -= 1;

			return age >= 0 ? age : null;
		},

		ageLabel() {
			if (this.age === null) return '';
			return `${this.age} ${this.pluralYears(this.age)}`;
		},

		contacts() {
			return this.links
				.map((link) => ({
					...link,
					iconSrc: resolveAsset(link.icon),
				}))
				.filter((link) => link.iconSrc || link.text);
		},
	},

	methods: {
		onAvatarError() {
			this.avatarSrc = fallbackAvatar;
		},

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
.ProfileCard {
	display: flex;
	align-items: flex-start;
	gap: var(--gap-l);

	&__avatar {
		flex-shrink: 0;

		width: 15rem;
		height: 15rem;

		overflow: hidden;

		border-radius: 50%;
		border: 2px solid var(--c-border);
		background-color: var(--c-surface-2);

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			filter: grayscale(1); // газетная полутоновая печать
		}
	}

	&__info {
		flex: 1;
		min-width: 0;
	}

	&__byline {
		color: var(--c-text-muted);
	}

	&__name {
		margin-top: var(--gap-xs);
		font-size: var(--fs-xl);
		font-weight: var(--fw-l);
		letter-spacing: -0.01em;
	}

	&__about {
		margin-top: var(--gap-m);
		max-width: 62ch;
		color: var(--c-text);
		white-space: pre-line;

		// Первый абзац — с буквицей, как в газете
		&::first-letter {
			float: left;
			margin-right: 0.8rem;
			font-size: 5.5rem;
			font-weight: var(--fw-m);
			line-height: 0.8;
		}
	}

	&__links {
		display: flex;
		flex-wrap: wrap;
		gap: 0;
		margin-top: var(--gap-l);

		border: var(--rule);
		border-right: none; // правую границу даёт каждый элемент
		width: fit-content;
	}

	&__link {
		display: inline-flex;
		align-items: center;
		gap: var(--gap-xs);

		min-width: 4.6rem;
		min-height: 4.6rem;
		padding: 0 var(--gap-s);

		color: var(--c-text);
		text-decoration: none;

		border-right: var(--rule);

		transition:
			var(--theme-transition),
			color 0.15s ease;

		&:hover {
			color: var(--c-bg);
			background-color: var(--c-text);
		}
	}

	&__link-icon {
		display: inline-block;
		width: 2rem;
		height: 2rem;

		background-color: currentColor;

		// Иконка красится в currentColor через маску —
		// поэтому корректно адаптируется под тему и инверсию при ховере.
		mask: var(--icon) center / contain no-repeat;
		-webkit-mask: var(--icon) center / contain no-repeat;
	}

	&__link-text {
		font-family: var(--ff-label);
		font-size: var(--fs-xs);
		font-weight: 700;
	}
}

@media (max-width: 640px) {
	.ProfileCard {
		gap: var(--gap-m);

		&__avatar {
			width: 10rem;
			height: 10rem;
		}

		&__about::first-letter {
			font-size: 4.5rem;
		}
	}
}
</style>
