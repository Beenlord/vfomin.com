<template>
	<div class="ContactList">
		<div class="ContactList__avatar">
			<img
				:src="avatarSrc"
				:alt="name"
				loading="lazy"
				@error="onAvatarError"
			/>
		</div>

		<p v-if="ageLabel" class="ContactList__age kicker">{{ ageLabel }}</p>

		<ul v-if="contacts.length" class="ContactList__links">
			<li v-for="(link, i) in contacts" :key="i">
				<a
					class="ContactList__link"
					:href="link.href || '#'"
					target="_blank"
					rel="noopener noreferrer"
				>
					<span
						class="ContactList__icon"
						:style="{ '--icon': `url(${link.iconSrc})` }"
						aria-hidden="true"
					/>
					<span v-if="link.label" class="ContactList__label">{{
						link.label
					}}</span>
				</a>
			</li>
		</ul>
	</div>
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
	name: 'ContactList',

	props: {
		name: { type: String, default: '' },
		avatar: { type: String, default: '' },
		birthDate: { type: String, default: '' },
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
					href: link.href,
					iconSrc: resolveAsset(link.icon),
					// В качестве подписи — явный текст либо сам адрес ссылки
					label: link.text || link.href || '',
				}))
				.filter((link) => link.iconSrc || link.label);
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
.ContactList {
	display: flex;
	flex-direction: column;

	&__avatar {
		width: 100%;
		aspect-ratio: 3 / 4; // портретный кадр во всю ширину колонки
		overflow: hidden;

		border: var(--bw) solid var(--c-border);
		background-color: var(--c-surface-2);

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			filter: grayscale(.7); // газетная полутоновая печать
		}
	}

	&__age {
		margin-top: var(--gap-s);
		text-align: center;
		color: var(--c-text-muted);
	}

	&__links {
		display: flex;
		flex-direction: column;
		margin-top: var(--gap-l);

		border: var(--bw) solid var(--c-border);
		border-bottom: none; // нижнюю границу даёт каждый пункт
	}

	&__link {
		display: flex;
		align-items: stretch;
		min-height: 4.4rem;

		font-size: var(--fs-s);
		color: var(--c-text);

		border-bottom: var(--bw) solid var(--c-border);

		&:hover {
			color: var(--c-bg);
			background-color: var(--c-text-strong);
		}
	}

	&__icon {
		flex-shrink: 0;

		display: inline-flex;
		width: 4rem;

		color: currentColor;

		border-right: var(--bw) solid var(--c-border);

		// сама иконка — маска в currentColor
		&::before {
			content: '';
			display: block;
			width: 1.7rem;
			height: 1.7rem;
			margin: auto;

			background-color: currentColor;
			mask: var(--icon) center / contain no-repeat;
			-webkit-mask: var(--icon) center / contain no-repeat;
		}
	}

	&__label {
		min-width: 0;
		padding: var(--gap-xs) var(--gap-s);

		overflow-wrap: anywhere;
	}
}

@media (max-width: 768px) {
	.ContactList__age {
		text-align: left;
	}
}
</style>
