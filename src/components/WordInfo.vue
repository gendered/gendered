<template>
	<section>
		<h2 class="word light">
			<span>{{ entry.word }}</span>
			<sup v-if="entry.gender" class="gender">({{ entry.gender[0] }})</sup>
		</h2>
		<p class="def">{{ entry.definition }}</p>
		<h4 class="syn-header" v-if="synsLen > 0">Synonyms</h4>
		<ul class="word-set">
			<li v-for="(syn, index) in entry.syns" :key="syn">
				<router-link
					:to="{ name: 'word', params: { word: syn } }"
					class="can-open-modal"
				>
					{{ syn }}<span v-if="index + 1 < synsLen">,</span>
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
@import "../mixins.scss";

.word {
	text-transform: capitalize;
	margin-top: 2.56rem;

	.gender {
		padding-left: 0.244em;
		top: -0.75em;
		font-size: 50%;
	}
}

.def:first-letter {
	text-transform: capitalize;
}

.syn-header {
	font-size: 1.3rem;
	font-weight: 400;
	margin-bottom: 0.244rem;
}

.word-set {
	margin: 0;
	padding: 0;
	li {
		display: inline-block;
		margin-right: 0.5rem;
		a {
			text-decoration: underline;
		}
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
	computed: {
		synsLen() {
			if (this.entry && this.entry.syns) {
				return this.entry.syns.length;
			}
		}
	},
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
