<template>
	<section>
		<h2 class="word light">
			{{ entry.word }}
		</h2>
		<p class="def">{{ entry.definition }}</p>
		<h4 class="syn-header" v-if="entry.syns.length > 0">Synonyms</h4>
		<ul class="word-set">
			<li v-for="syn in entry.syns" :key="syn">
				<router-link
					:to="{ name: 'word', params: { word: syn } }"
					class="can-open-modal"
				>
					{{ syn }},
				</router-link>
			</li>
		</ul>
		<ul class="tag-list">
			<li v-for="tag in entry.tags" :key="tag">
				{{ tag }}
			</li>
		</ul>
	</section>
</template>
<style lang="scss" scoped>
@import '../mixins.scss';

.word {
	text-transform: capitalize;
	margin-top: 1.6em;
}

.def:first-letter {
	text-transform: capitalize;
}

.syn-header {
	font-size: 1.3rem;
	font-weight: 400;
	// text-transform: uppercase;
	margin-bottom: 0.244rem;
}

.word-set {
	margin: 0;
	padding: 0;
	li {
		display: inline-block;
		margin-right: 0.5rem;
	}
}

.tag-list {
	color: rgba(0, 0, 0, 0.7);
	padding-left: 0;
	li {
		font-size: 0.625rem;
		text-transform: capitalize;
	}
}

</style>
<script>
export default {
	name: "WordInfo",
	props: {
		entry: {
			type: Object,
			default: () => {}
		}
	},
	created() {
		let entry = this.entry;
		let word = entry["word"];
		let syns = entry["syns"];
		if (!syns) return;
		this.entry.syns = syns.filter(syn => syn !== word);
	}
};
</script>
