<template>
	<section>
		<h2 class="word">
			{{ entry.word }}
		</h2>
		<p>{{ entry.definition }}</p>
		<ul class="word-set">
			<li v-for="syn in entry.syns" :key="syn">
				<router-link
					:to="{ name: 'word', params: { word: syn } }"
					class="can-open-modal"
				>
					{{ syn }}
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
.word {
	text-transform: capitalize;
}
.tag-list {
	padding: 0.25rem 0;
	font-size: 0.75rem;
	color: rgba(0, 0, 0, 0.7);
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
