<template>
	<li
		v-if="list.length > 0"
		class="word-list"
		tabindex="0"
		ref="list"
		@keydown="moveWithin"
	>
		<div class="letter">
			<span>{{ letter }}</span>
			<button
				class="toggle"
				@click="toggleDisplay"
				:aria-expanded="!this.toggleListOpen"
				tabindex="-1"
				:aria-label="`Toggle ${letter} list`"
				v-bind:class="{ invisible: shouldShowToggleButton }"
			>
				+
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
					tabindex="-1"
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
	display: -ms-grid;
	display: grid;
	grid-gap: 1rem;
	-ms-grid-columns: 1fr 1rem 1fr 1rem 1fr 1rem 1fr 1rem 1fr;
	grid-template-columns: repeat(5, 1fr);
	-webkit-column-break-inside: avoid;
	page-break-inside: avoid;
	break-inside: avoid;
	padding-top: 4px;

	@include break(small) {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-ms-flex-direction: column;
		flex-direction: column;
		-webkit-box-align: start;
		-ms-flex-align: start;
		align-items: flex-start;
	}
}

.letter {
	font-size: 2.56rem;
	text-align: right;
	margin-top: 0;
	line-height: 0.85em;
	height: -webkit-fit-content;
	height: -moz-fit-content;
	height: fit-content;
	font-family: "Romana Std Bold", Arial, sans-serif;
	position: -webkit-sticky;
	position: sticky;
	top: 1.6rem;
	height: 50px;
	background: white;
	overflow: visible;
}

.toggle {
	font-size: 1.6rem;
	margin-right: 0;
	background: none;
	position: -webkit-sticky;
	position: sticky;
	padding: 0.391em 0.625em;
	bottom: 2.56rem;

	&:hover {
		// font-style: italic;
		transform: skew(-15deg);
		cursor: pointer;
	}
}

.words {
	padding: 0;
	margin: 0;
	grid-column: 2 / 6;

	.word {
		margin: 0;
		margin-top: 0.244rem;
		margin-right: 0.625rem;
		line-height: 1.6em;
		display: inline-block;

		.word-link {
			margin-right: 0.625rem;
			margin-bottom: 0.625rem;
			font-size: 1rem;
			font-weight: 400;
		}
	}
}

.highlight {
	&.female,
	&.male {
		&::after {
			display: inline-block;
			font-size: 0.244rem;
			transform: translateY(-12.5%);
		}
	}

	&.female {
		&::after {
			content: "(F)";
		}
	}

	&.male {
		&::after {
			content: "(M)";
		}
	}
}

.invisible {
	visibility: hidden;
}
</style>
<script>
const arrowKeys = {
	ArrowUp: -1,
	ArrowDown: 1,
	ArrowLeft: -1,
	ArrowRight: 1
};

export default {
	name: "WordList",
	props: {
		letter: {
			type: String,
			required: true
		},
		toggleAllLists: {
			type: Boolean
		},
		list: {
			required: true,
			validator(value) {
				return value === null || Array.isArray(value);
			}
		}
	},
	computed: {
		toggleListOpen() {
			return this.toggleAllLists || this.toggleOpen;
		},
		wordsToDisplay() {
			if (!this.toggleListOpen) {
				return this.list.slice(0, this.displayCount);
			} else {
				return this.list;
			}
		},
		shouldShowToggleButton() {
			return this.list.length <= this.displayCount;
		}
	},
	data() {
		return {
			displayCount: 24,
			toggleOpen: false
		};
	},
	methods: {
		toggleDisplay(e) {
			let el = e.target;
			this.toggleOpen = !this.toggleOpen;
			el.textContent = this.toggleOpen ? "-" : "+";
		},
		_getFocusableElements(el) {
			const selectorArray = [
				"a:not([disabled])",
				"button:not([disabled])",
				"input:not([disabled])",
				"select:not([disabled])",
				"[tabindex]:not([disabled])"
			].join();
			return el.querySelectorAll(selectorArray);
		},
		moveWithin(e) {
			const key = e.key;
			const keys = Object.keys(arrowKeys);
			let content = [].slice.call(this._getFocusableElements(this.$refs.list));
			if (keys.indexOf(key) > -1) {
				// Only listen to arrow arrowKeys
				e.preventDefault();
				const { activeElement } = document;
				let direction = arrowKeys[key];
				let indexOfActive = content.indexOf(activeElement);
				indexOfActive =
					indexOfActive === -1 && direction === -1 ? 0 : indexOfActive;
				let curIndex =
					(indexOfActive + direction + content.length) % content.length;
				content[curIndex].focus();
			}
		}
	}
};
</script>
