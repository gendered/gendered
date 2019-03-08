<template>
	<transition name="modal">
		<div class="modal" v-focus tabindex="-1" @keydown.esc="navigateHome">
			<router-link
				@click.native="closeModal"
				:to="{ name: 'home' }"
				class="modal-link exit"
				aria-label="Close modal"
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
				class="modal-link info"
				aria-label="More about project"
			>
				<img
					src="../assets/imgs/info.svg"
					alt="More information about project."
				/>
			</router-link>
		</div>
	</transition>
</template>
<style lang="scss" scoped>
@import "../mixins.scss";

.modal {
	overflow-y: scroll;
	display: flex;
	flex-direction: column;
	position: fixed;
	z-index: 9998;
	top: 0;
	right: 0;
	width: 37.5%;
	height: 100%;
	background-color: #fff;
	box-shadow: -2px 2px 3px rgba(0, 0, 0, 0.33);
	padding: 4.096rem 2.56rem;
	box-sizing: border-box;

	@include break(small) {
		width: 80%;
		padding: 1.6rem;
	}

	@include break(medium) {
		width: 62.5%;
	}
}

.modal-enter-active,
.modal-leave-active {
	-webkit-transition: transform 0.35s ease-out, opacity 0.2s ease-out;
	-moz-transition: transform 0.35s ease-out, opacity 0.2s ease-out;
	-o-transition: transform 0.35s ease-out, opacity 0.2s ease-out;
	transition: transform 0.35s ease-out, opacity 0.2s ease-out;
}

.modal-enter /* .fade-leave-active below version 2.1.8 */ {
	opacity: 0;
	transform: translateX(300px);
}

.modal-leave-to {
	opacity: 0;
	transform: translateX(400px);
}

.info {
	margin-top: 2.56rem;
}

.exit {
	font-size: 1.6rem;
	text-align: right;
}

.word-set-container {
	grid-gap: 2rem;
	width: 100%;
}
</style>

<script>
const API = "https://gendered-api.glitch.me/api/words";
import WordInfo from "@/components/WordInfo";
import localforage from "localforage";

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
				localforage.setItem(res.word, res);
				let equivalent = this.entry.equivalent;
				if (equivalent) {
					localforage.getItem(equivalent).then(equiv => {
						if (!equiv) {
							this.getWord(
								equivalent,
								function(res) {
									this.equivalent = res;
									localforage.setItem(equivalent, res);
								}.bind(this)
							);
						} else this.equivalent = equiv;
					});
				}
			}
		}.bind(this);
		localforage.getItem(currentWord).then(data => {
			let version = localforage.getItem("version");
			let currentVersion = 2;
			if (!data || !version || version < currentVersion) {
				this.getWord(currentWord, currentVersion, setData);
			} else setData(data);
		});
		document.querySelector("body").classList.add("modal-open");
	},
	methods: {
		getWord(word, version, callback) {
			let url = `${API}/${word}`;
			fetch(url)
				.then(res => res.json())
				.then(res => {
					if (callback) {
						localforage.setItem("version", version);
						callback(res.data);
					} else return res.data;
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
