<template>
	<li v-if="list.length > 0" class="word-list">
		<div class="letter">
			<span>{{ letter }}</span>
			<!-- each letter should get individual id   -->
			<button
				class="toggle"
				@click="toggleDisplay"
				:aria-expanded="this.showPreview"
			>
				+
			</button>
			<button class="visuallyhidden" @click="skipLetterList">
				Skip
			</button>
		</div>
		<ul class="words" ref="words">
			<li
				class="word"
				:ref="'word-' + index"
				v-for="(word, index) in wordsToDisplay"
				:key="index"
			>
				<router-link
					:to="{
						name: 'word',
						params: { word: word.word, wordRef: $refs['word-' + index] }
					}"
					:class="`word-link ${word.state} ${word.gender} can-open-modal`"
				>
					{{ word.word }}
				</router-link>
			</li>
		</ul>
	</li>
</template>
<style lang="scss" scoped>
@import "../mixins.scss";

.word-list {
	margin-bottom: 1.6rem;
	display: grid;
	grid-gap: 1rem;
	grid-template-columns: repeat(5, 1fr);
	-webkit-column-break-inside: avoid;
	page-break-inside: avoid;
	break-inside: avoid;
}

.letter {
	font-size: 2.56rem;
	text-align: right;
	margin-top: 0;
	line-height: 0.85em;
	height: fit-content;
	font-family: "Romana Std Bold", Arial, sans-serif;
	position: -webkit-sticky;
	position: sticky;
	top: 1.6rem;
}

.toggle {
	font-size: 1.6rem;
	margin-right: 0;
	-webkit-transition: all 0.5s ease;
	-moz-transition: all 0.5s ease;
	-o-transition: all 0.5s ease;
	transition: all 0.5s ease;
	position: -webkit-sticky;
	position: sticky;
	bottom: 2.56rem;
	margin-bottom: 2.56rem;

	&:hover {
		font-style: italic;
		cursor: pointer;
	}
}

.words {
	padding: 0;
	margin: 0;
	grid-column: 2 / 6;

	.word {
		margin: 0;
		margin-right: 0.625rem;
		line-height: 1.6em;
		display: inline-block;

		.word-link {
			padding: 0.625rem;
			font-size: 1rem;
			font-weight: 400;
		}
	}

	@include break(small) {
		// grid-template-columns: repeat(4, 1fr);
	}

	@include break(medium) {
		// grid-template-columns: repeat(6, 1fr);
	}
}

.highlight {
	&.female {
		background: blue;
	}

	&.male {
		background: red;
	}
}

.visuallyhidden:not(:focus):not(:active) {
	position: absolute;
	width: 1px;
	height: 1px;
	margin: -1px;
	border: 0;
	padding: 0;
	white-space: nowrap;
	clip-path: inset(100%);
	clip: rect(0 0 0 0);
	overflow: hidden;
}
</style>
<script>
export default {
	name: "WordList",
	props: {
		letter: {
			type: String,
			required: true
		},
		list: {
			required: true,
			validator(value) {
				return value === null || (Array.isArray(value) && value.length > 0);
			}
		}
	},
	computed: {
		wordsToDisplay() {
			if (this.showPreview) {
				return this.list.slice(0, this.displayCount);
			} else {
				return this.list;
			}
		}
	},
	data() {
		return {
			displayCount: 24,
			showPreview: true
		};
	},
	methods: {
		toggleDisplay(e) {
			this.$emit("preview");
			let el = e.target;
			el.textContent = this.showPreview ? "-" : "+";
			this.showPreview = !this.showPreview;
		},
		skipLetterList(e) {
			let el = e.target;
			let container = el.closest(".word-list");
			let nextToggle = container.nextSibling.querySelector(".toggle");
			if (nextToggle) nextToggle.focus();
		}
	}
};
</script>
