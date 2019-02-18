<template>
	<div class="modal" v-focus tabindex="-1" @keydown.esc="navigateHome">
		<!-- <div v-if="invalidWord">
		Word not in dictionary
	</div> -->
		<router-link
			@click.native="closeModal"
			:to="{ name: 'home' }"
			class="modal-link"
		>
			✕
		</router-link>
		<div class="w-80 w-60-ns center word-set-container">
			<WordInfo v-if="entry" :entry="entry" />
			<WordInfo v-if="equivalent" :entry="equivalent" />
		</div>
		<router-link
			@click.native="closeModal"
			:to="{ name: 'about' }"
			class="modal-link"
		>
			<img
				src="../assets/imgs/info.svg"
				alt="More information about project."
			/>
		</router-link>
	</div>
</template>
<style lang="scss" scoped>
.modal {
	overflow-y: scroll;
	z-index: 1010;
}

.modal-link {
	font-size: 2rem;
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
				return null;
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
		document.querySelector("body").classList.add("modal-open");
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
		navigateHome() {
			this.closeModal();
			this.$router.push({ name: "home" });
		},
		closeModal() {
			document.querySelector("body").classList.remove("modal-open");
			if (this.elementToFocus) this.elementToFocus.focus();
		}
	}
};
</script>
