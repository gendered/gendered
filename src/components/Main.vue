<template>
	<main class="container">
		<ul class="letter-list">
			<!-- want to give .letter-list grid layout 12 columns  -->
			<WordList
				v-for="value in words"
				:list="value.words"
				:letter="value.letter"
				:preview="preview"
				@preview="turnOnPreview"
			/>
		</ul>
		<div>
			<router-view :key="$route.fullPath" />
		</div>
	</main>
</template>
<style lang="scss">
@import "../mixins.scss";
main {
	margin-bottom: 2.56rem;
}

.letter-list {
	font-size: 1rem;
	font-weight: 400;
	padding: 0;
	margin: 0;
	column-count: 2;
	column-gap: 1fr;

	@include break(small) {
		column-count: 1;
	}
}

.modal {
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
	transition: opacity 0.3s ease;
	padding: 4.096rem 2.56rem;
	box-sizing: border-box;

	@include break(small) {
		width: 80%;
	}

	@include break(medium) {
		width: 62.5%;
	}

	button {
		position: fixed;
		bottom: 1.6rem;
		font-size: 1rem;
	}
}
</style>
<script>
import WordList from "@/components/WordList";

export default {
	name: "Main",
	components: {
		WordList
	},
	data() {
		return {
			preview: true
		};
	},
	props: {
		words: {
			type: Array,
			default: []
		}
	},
	methods: {
		turnOnPreview() {
			this.preview = true;
		}
	}
};
</script>
