export default {
	title: 'V.Fomin',
	description: 'SEO Описание моего портфолио',

	name: 'Владимир Фомин',
	tags: ['frontend', 'backend', 'fullstack', 'gamedev'], // теги-специализации под именем
	avatar: '@/assets/i/me.webp',
	birthDate: '02.04.2000',

	aboutMe: `
Немного о себе
    `,
	aboutXp: `
Немного об опыте
    `,

	/* Места работы */
	experience: [
		{
			years: '2021-н.в.',
			name: 'ООО "Компания"',
			description: 'Описание деятельности',
		},
	],

	/* Образование */
	educations: [
		{
			name: 'РЭУ ми. Плеханова',
			years: '2018-2021',
			education: 'Наименование образования',
		},
	],

	/* Навыки */
	skills: [
		{
			name: 'JS',
			skillValue: 70, // Процент на сколько я себя оцениваю
			// (отображается в
			// виде шкалы)
			sinceValue: 2015, // Год начала отсчёта опыта
		},
	],

	/* Контакты */
	links: [
		{
			icon: '@/assets/i/icons/gmail.svg',
			href: '',
		},
		{
			icon: '@/assets/i/icons/tg.svg',
			href: '',
		},
		{
			icon: '@/assets/i/icons/vk.svg',
			href: '',
		},
		{
			icon: '@/assets/i/icons/phone.svg',
			href: '',
			text: '', // Текст справа от иконки
		},
	],

	/* Ссылки на сделанные мной работы */
	refs: [
		{
			title: 'Pioneer',
			cover: '/portfolio/pioneer/cover.webp',
			description: 'Вёрстка мобильной версии',
			href: 'pioneer.ru',
		},
	],
};
