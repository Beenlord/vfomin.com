<template>
	<main class="PageIndex">
		<div class="container">
			<div class="Sheet">
				<div class="Sheet__topline">
					<span class="Sheet__brand kicker">{{ config.title }}</span>
					<span class="Sheet__date kicker">{{ today }}</span>
					<ThemeSwitch class="Sheet__switch" />
				</div>

				<div class="Sheet__body">
					<div class="Sheet__name PageIndex__block">
						<AppHeader
							:name="config.name"
							:position="config.position"
						/>
					</div>

					<aside class="Sheet__aside">
						<div class="PageIndex__block">
							<ContactList
								:name="config.name"
								:avatar="config.avatar"
								:birth-date="config.birthDate"
								:links="config.links"
							/>
						</div>

						<PageSection
							v-if="config.educations && config.educations.length"
							title="Образование"
							class="PageIndex__block"
						>
							<EntryList :items="config.educations" compact />
						</PageSection>

						<PageSection
							v-if="config.skills && config.skills.length"
							title="Навыки"
							class="PageIndex__block"
						>
							<div class="PageIndex__skills">
								<SkillBar
									v-for="(skill, i) in config.skills"
									:key="i"
									:name="skill.name"
									:skill-value="skill.skillValue"
									:since-value="skill.sinceValue"
								/>
							</div>
						</PageSection>
					</aside>

					<div class="Sheet__main">
						<PageSection
							v-if="aboutMe"
							title="Профиль"
							class="PageIndex__block"
						>
							<p class="PageIndex__lead">{{ aboutMe }}</p>
						</PageSection>

						<PageSection
							v-if="hasExperienceBlock"
							title="Опыт работы"
							class="PageIndex__block"
						>
							<p v-if="aboutXp" class="PageIndex__intro">
								{{ aboutXp }}
							</p>

							<EntryList
								v-if="
									config.experience &&
									config.experience.length
								"
								:items="config.experience"
							/>
						</PageSection>

						<PageSection
							v-if="config.refs && config.refs.length"
							title="Портфолио"
							class="PageIndex__block"
						>
							<div class="PageIndex__works">
								<WorkCard
									v-for="(work, i) in config.refs"
									:key="i"
									:title="work.title"
									:description="work.description"
									:cover="work.cover"
									:href="work.href"
								/>
							</div>
						</PageSection>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script>
import config from '@/portfolio.config.js';

export default {
	name: 'PageIndex',

	data() {
		return {
			config,
		};
	},

	head() {
		return {
			title: config.title,
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: config.description,
				},
			],
		};
	},

	computed: {
		aboutMe() {
			return (this.config.aboutMe || '').trim();
		},

		aboutXp() {
			return (this.config.aboutXp || '').trim();
		},

		hasExperienceBlock() {
			const hasExperience =
				this.config.experience && this.config.experience.length;
			return this.aboutXp || hasExperience;
		},

		today() {
			return new Intl.DateTimeFormat('ru-RU', {
				day: 'numeric',
				month: 'long',
				year: 'numeric',
			}).format(new Date());
		},
	},
};
</script>

<style lang="scss" scoped>
.Sheet {
	background-color: var(--c-surface);

	transition: var(--theme-transition);

	/* ---- Верхняя строка: издание · дата · тема ---- */
	&__topline {
		display: flex;
		align-items: center;
		gap: var(--gap-m);

		padding: var(--gap-s) var(--cell-pad);
		border-bottom: var(--bw) solid var(--c-border);
	}

	&__brand {
		color: var(--c-text-strong);
	}

	&__date {
		flex: 1;
		text-align: center;
		color: var(--c-text-muted);
	}

	/* ---- Тело: сетка. Слева колонка-сайдбар во всю высоту,
	   справа сверху имя, ниже — основной контент. ---- */
	&__body {
		display: grid;
		grid-template-columns: var(--aside-width) 1fr;
		grid-template-areas:
			'aside name'
			'aside main';
		align-items: stretch;
	}

	&__name {
		grid-area: name;

		display: flex;
		flex-direction: column;
		justify-content: center;

		padding-block: var(--gap-xl);
		border-bottom: var(--bw) solid var(--c-border);
	}

	&__aside {
		grid-area: aside;

		display: flex;
		flex-direction: column;
		min-width: 0;

		border-right: var(--bw) solid var(--c-border);
	}

	&__main {
		grid-area: main;

		display: flex;
		flex-direction: column;
		min-width: 0;
	}
}

.PageIndex__block {
	padding: var(--cell-pad);
}

.Sheet__aside > .PageIndex__block:not(:last-child),
.Sheet__main > .PageIndex__block:not(:last-child) {
	border-bottom: var(--bw) solid var(--c-border);
}

.PageIndex {

	&__lead {
		max-width: 70ch;
		color: var(--c-text);
		white-space: pre-line;

		// газетная буквица на первом абзаце
		&::first-letter {
			float: left;
			margin-right: 1rem;
			font-size: 6rem;
			font-weight: var(--fw-l);
			line-height: 0.82;
		}
	}

	&__intro {
		max-width: 70ch;
		margin-bottom: var(--gap-l);
		padding-bottom: var(--gap-l);
		color: var(--c-text-muted);
		white-space: pre-line;

		border-bottom: var(--bw) solid var(--c-border);
	}

	&__skills {
		display: flex;
		flex-direction: column;
		gap: var(--gap-m);
	}

	&__works {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(22rem, 1fr));
		gap: var(--cell-pad);
	}
}

@media (max-width: 768px) {
	.Sheet__body {
		grid-template-columns: 1fr;
		grid-template-areas:
			'name'
			'aside'
			'main';
	}

	.Sheet__name {
		padding-block: var(--gap-l);
	}

	.Sheet__aside {
		border-right: none;
		border-bottom: var(--bw) solid var(--c-border);
	}
}

@media (max-width: 640px) {
	.Sheet__topline {
		flex-wrap: wrap;
	}

	.Sheet__date {
		order: 3;
		flex-basis: 100%;
		text-align: left;
	}
}
</style>
