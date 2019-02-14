<template>
	<div
		class="modal"
		ref="modal"
		v-focus
		tabindex="-1"
		@blur="closeModal"
		@keydown.esc="closeModal"
	>
		<!-- <div v-if="invalidWord">
		Word not in dictionary
	</div> -->
		<router-link :to="{ name: 'home' }">
			X
		</router-link>
		<div class="w-80 w-60-ns center word-set-container">
			<WordInfo v-if="entry" :entry="entry" />
			<WordInfo v-if="equivalent" :entry="equivalent" />
		</div>
		<router-link :to="{ name: 'about' }">
			?
		</router-link>
	</div>
</template>
<style lang="scss" scoped>
.modal {
	overflow-y: scroll;
}

.word-set-container {
	grid-gap: 2rem;
	width: 100%;
}
</style>

<script>
const API = "https://gendered-api.glitch.me/api/words";
import WordInfo from "@/components/WordInfo";

export default {
	name: "WordContainer",
	components: {
		WordInfo
	},
	props: {
		word: {
			type: String,
			required: true
		},
		wordRef: {
			type: String,
			default: ""
		},
		index: {
			type: Number,
			default: -1
		}
	},
	computed: {
		// Compute element to re-focus when modal loses focus
		elementToFocus() {
			let wordRef = this.wordRef;
			if (wordRef && wordRef[0]) {
				return wordRef[0].querySelector(".word-link");
			} else {
				const letter = this.entry.word.charAt(0).toUpperCase();
				let xpath = this._getXPath("span", letter);
				const letterEl = document.evaluate(
					xpath,
					document,
					null,
					XPathResult.FIRST_ORDERED_NODE_TYPE,
					null
				).singleNodeValue;
				const wordList = letterEl.parentElement.nextElementSibling;
				xpath = this._getXPath("a", this.entry.word.toLowerCase());
				return document.evaluate(
					xpath,
					wordList,
					null,
					XPathResult.FIRST_ORDERED_NODE_TYPE,
					null
				).singleNodeValue;
			}
		}
	},
	data() {
		return {
			entry: {},
			equivalent: {}
		};
	},
	created() {
		const currentWord = this.$route.params.word;
		this.entry.word = currentWord;
		let setData = function(res) {
			if (res.word) {
				this.entry = res;
				let equivalent = this.entry.equivalent;
				if (equivalent) {
					this.getWord(
						equivalent,
						function(res) {
							this.equivalent = res;
						}.bind(this)
					);
				}
			}
		}.bind(this);
		this.getWord(currentWord, setData);
	},
	methods: {
		_getXPath(el, txt) {
			return `//${el}[normalize-space()="${txt}"]`;
		},
		getWord(word, callback) {
			let url = `${API}/${word}`;
			fetch(url)
				.then(res => res.json())
				.then(res => {
					if (callback) {
						callback(res);
					} else return res;
				});
		},
		closeModal(e) {
			let refs = this.$refs;
			let parent = refs.modal;
			let relatedTarget = e.relatedTarget || e.target;
			if (
				relatedTarget &&
				(relatedTarget.classList.contains("can-open-modal") ||
				parent === relatedTarget || parent.contains(relatedTarget))
			) {
				return;
			}
			else {
				if (this.elementToFocus) this.elementToFocus.focus();
				this.$router.push({ name: "home" });
			}
		}
	}
};
</script>
