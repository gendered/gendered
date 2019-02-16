<template>
	<main class="container">
		<ul class="letter-list" aria-describedby="instructions">
			<!-- want to give .letter-list grid layout 12 columns  -->
			<WordList
				v-for="value in words"
				:list="value.words"
				:letter="value.letter"
				:key="value.letter"
				:toggleAllLists="toggleAllLists"
			/>
		</ul>
		<router-view :key="$route.fullPath" />
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
}
</style>
<script>
import WordList from "@/components/WordList";

export default {
	name: "WordListContainer",
	components: {
		WordList
	},
	props: {
		words: {
			type: Array,
			default: () => []
		},
		toggleAllLists: {
			type: Boolean
		}
	}
};
</script>
