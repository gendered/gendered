<template>
	<li
		class="word-list"
		tabindex="0"
		ref="list"
		@keydown="moveWithin"
		v-if="list.length > 0 || loading"
	>
		<button
			class="toggle-container"
			@click="toggleDisplay"
			:aria-expanded="!this.toggleListOpen"
			tabindex="-1"
			:aria-label="`Toggle ${letter} list`"
		>
			<span class="letter">{{ letter }}</span>
			<span class="toggle" v-bind:class="{ invisible: shouldShowToggleButton }"
				>+</span
			>
		</button>
		<span class="visuallyhidden" v-if="loading">Loading content</span>
		<transition-group class="words" name="list" tag="ul">
			<li
				class="word"
				:ref="'word-' + index"
				v-for="(word, index) in wordsToDisplay"
				:key="'word-' + index"
			>
				<router-link
					:to="{
						name: 'word',
						params: { word: word.word, wordRef: $refs['word-' + index] }
					}"
					:class="`word-link can-open-modal`"
					tabindex="-1"
				>
					{{ word.word }}
					<span v-if="word.state" class="gender">({{ word.gender[0] }})</span>
				</router-link>
			</li>
		</transition-group>
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

.toggle-container {
	width: 100%;
	text-align: right;
	padding: 0;
	margin-top: 0;
	margin-bottom: 0.625rem;
	line-height: 0.85em;
	position: -webkit-sticky;
	position: sticky;
	top: 1.6rem;
	height: 50px;
	background: white;
	overflow: visible;

	@include break(small) {
		text-align: left;
	}
}

.letter {
	font-family: "Romana Std Bold", Arial, sans-serif;
	font-size: 2.56rem;
}

.toggle {
	font-size: 1.6rem;
	margin-right: 0;
	display: inline-block;
	padding: 0 0.244em;
	-webkit-transition: ease all 0.15s;
	-moz-transition: ease all 0.15s;
	-o-transition: ease all 0.15s;
	transition: ease all 0.15s;

	&:hover {
		opacity: 0.8;
		cursor: pointer;
	}
}

.words {
	padding: 0;
	margin: 0;
	grid-column: 2 / 6;

	.word {
		margin: 0;
		margin-top: 0.1525rem;
		margin-right: 0.625rem;
		line-height: 1.6em;
		display: inline-block;
	}
}

.words:empty {
	width: 100%;
	height: 140px;
	background-image: linear-gradient(
			100deg,
			rgba(255, 255, 255, 0),
			rgba(255, 255, 255, 0.5) 50%,
			rgba(255, 255, 255, 0) 80%
		),
		linear-gradient(lightgray 20px, transparent 0),
		linear-gradient(lightgray 20px, transparent 0),
		linear-gradient(lightgray 20px, transparent 0),
		linear-gradient(lightgray 20px, transparent 0),
		linear-gradient(lightgray 20px, transparent 0);

	background-repeat: repeat-y;
	background-size: 500px 180px, 440px 180px, 480px 180px, 520px 180px,
		180px 180px;
	background-position: 0 0px, 0 30px, 0 60px, 0 90px, 0 120px;
}

.word-link {
	margin-right: 0.625rem;
	font-size: 1rem;
	font-weight: 400;

	.gender {
		line-height: 0;
		vertical-align: middle;
		font-size: 0.244rem;
		text-transform: uppercase;
	}
}

.invisible {
	visibility: hidden;
}

.list-enter-active,
.list-leave-active {
	-webkit-transition: ease all 0.5s;
	-moz-transition: ease all 0.5s;
	-o-transition: ease all 0.5s;
	transition: ease all 0.5s;
}

.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
	opacity: 0;
	transform: translateY(-10px);
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
		loading: {
			type: Boolean
		},
		list: {
			required: true,
			validator(value) {
				return value === null || Array.isArray(value);
			},
			default: () => []
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
			let el = e.target.querySelector(".toggle");
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
