<template>
	<main class="PageIndex">
		<div class="container">
			<div class="PageIndex__masthead">
				<span class="PageIndex__brand kicker">{{ config.title }}</span>
				<span class="PageIndex__date kicker">{{ today }}</span>
				<ThemeSwitch class="PageIndex__switch" />
			</div>

			<div class="PageIndex__inner">
				<ProfileCard
					:name="config.name"
					:avatar="config.avatar"
					:birth-date="config.birthDate"
					:about="config.aboutMe"
					:links="config.links"
				/>

				<PageSection
					v-if="config.aboutXp"
					title="О деятельности"
					class="PageIndex__section"
				>
					<p class="PageIndex__lead">{{ config.aboutXp }}</p>
				</PageSection>

				<PageSection
					v-if="config.experience && config.experience.length"
					title="Опыт"
					class="PageIndex__section"
				>
					<TimelineList :items="config.experience" />
				</PageSection>

				<PageSection
					v-if="hasEducationBlock"
					title="Образование и навыки"
					class="PageIndex__section"
				>
					<TimelineList
						v-if="config.educations && config.educations.length"
						:items="config.educations"
					/>

					<div
						v-if="config.skills && config.skills.length"
						class="PageIndex__skills"
					>
						<SkillBar
							v-for="(skill, i) in config.skills"
							:key="i"
							:name="skill.name"
							:skill-value="skill.skillValue"
							:since-value="skill.sinceValue"
						/>
					</div>
				</PageSection>

				<PageSection
					v-if="config.refs && config.refs.length"
					title="Портфолио"
					class="PageIndex__section"
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
		hasEducationBlock() {
			const hasEducations =
				this.config.educations && this.config.educations.length;
			const hasSkills = this.config.skills && this.config.skills.length;
			return hasEducations || hasSkills;
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
.PageIndex {
	padding-block: var(--gap-m) var(--gap-xl);

	&__masthead {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--gap-m);

		padding: var(--gap-s) 0;

		border-top: var(--rule-thick);
		border-bottom: var(--rule);
	}

	&__brand {
		color: var(--c-text);
	}

	&__date {
		flex: 1;
		text-align: center;
		color: var(--c-text-muted);
	}

	&__inner {
		display: flex;
		flex-direction: column;
		gap: var(--gap-xl);

		margin-top: var(--gap-xl);
	}

	&__lead {
		column-count: 2;
		column-gap: var(--gap-l);
		column-rule: var(--rule);

		font-size: var(--fs-s);
		color: var(--c-text);
		white-space: pre-line;
	}

	&__skills {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(28rem, 1fr));
		gap: var(--gap-m) var(--gap-l);
		margin-top: var(--gap-l);
	}

	&__works {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(26rem, 1fr));
		gap: var(--gap-l);
	}
}

@media (max-width: 640px) {
	.PageIndex {
		&__date {
			display: none;
		}

		&__inner {
			gap: var(--gap-l);
			margin-top: var(--gap-l);
		}

		&__lead {
			column-count: 1;
		}
	}
}
</style>
