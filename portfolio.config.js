export default {
	title: 'www.vfomin.com',
	description: 'SEO Описание моего портфолио',

	name: 'Владимир Фомин',
	tags: ['frontend', 'backend', 'fullstack', 'electron', 'nodejs', 'laravel'], // теги-специализации под
    // именем
	avatar: '@/assets/i/me.jpg',
	birthDate: '02.04.2000',

	aboutMe: `
Немного о себе
    `,

	aboutXp: `
Немного об опыте работы
    `,

	/* Места работы */
	experience: [
		{
			years: '2021-н.в.',
			name: 'ООО "Art3d Graphics"',
			description: `
Frontend-Backend специалист. Занимался разработкой и поддержкой сайтов компании. Работал над созданием ...
			`,
		},
	],

	/* Образование */
	educations: [
		{
			name: 'РЭУ ми. Плеханова',
			years: '2018-2021',
			education: 'Наименование образования',
		},
		{
			name: 'Синергия',
			years: '2022-н.в.',
			education: 'Наименование образования',
		},
	],

	/* Навыки */
	skills: [
		{
			name: 'HTML',
			skillValue: 95, // Процент на сколько я себя оцениваю
			// (отображается в
			// виде шкалы)
			sinceValue: 2015, // Год начала отсчёта опыта
		},
		{
			name: 'CSS',
			skillValue: 80, // Процент на сколько я себя оцениваю
			// (отображается в
			// виде шкалы)
			sinceValue: 2015, // Год начала отсчёта опыта
		},
		{
			name: 'JS',
			skillValue: 84, // Процент на сколько я себя оцениваю
			// (отображается в
			// виде шкалы)
			sinceValue: 2018, // Год начала отсчёта опыта
		},
		{
			name: 'PHP',
			skillValue: 92, // Процент на сколько я себя оцениваю
			// (отображается в
			// виде шкалы)
			sinceValue: 2019, // Год начала отсчёта опыта
		},
        {
            name: 'Laravel 9+',
            skillValue: 68, // Процент на сколько я себя оцениваю
            // (отображается в
            // виде шкалы)
            sinceValue: 2021, // Год начала отсчёта опыта
        },
		{
			name: 'GO',
			skillValue: 17, // Процент на сколько я себя оцениваю
			// (отображается в
			// виде шкалы)
			sinceValue: 2022, // Год начала отсчёта опыта
		},
		{
			name: 'C++',
			skillValue: 11, // Процент на сколько я себя оцениваю
			// (отображается в
			// виде шкалы)
			sinceValue: 2020, // Год начала отсчёта опыта
		},
		{
			name: 'C# + WinForms',
			skillValue: 18, // Процент на сколько я себя оцениваю
			// (отображается в
			// виде шкалы)
			sinceValue: 2020, // Год начала отсчёта опыта
		},
	],

	/* Контакты */
	links: [
		{
			icon: '@/assets/i/icons/gmail.svg',
			href: 'tombeenlord@gmail.com',
		},
		{
			icon: '@/assets/i/icons/tg.svg',
			href: '@vovikkko',
		},
		{
			icon: '@/assets/i/icons/phone.svg',
			href: 'tel:+79997509780',
			text: '+7 (999) 750 97 80', // Текст справа от иконки
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
