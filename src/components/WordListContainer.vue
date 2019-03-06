<template>
	<main class="list-container">
		<ul class="letter-list" aria-describedby="instructions">
			<!-- want to give .letter-list grid layout 12 columns  -->
			<WordList
				v-for="value in words"
				:list="value.words"
				:letter="value.letter"
				:key="value.letter"
				:toggleAllLists="toggleAllLists"
				:loading="loading"
			/>
		</ul>
		<router-view :key="$route.fullPath" />
	</main>
</template>
<style lang="scss">
@import "../mixins.scss";
.list-container {
	-webkit-column-count: 2;
	column-count: 2;
	margin-bottom: 2.56rem;

	@include break(small) {
		-webkit-column-count: 1;
		column-count: 1;
		margin: 2.56rem auto;
	}
}

.letter-list {
	font-size: 1rem;
	font-weight: 400;
	padding: 0;
	margin: 0;
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
		},
		loading: {
			type: Boolean
		}
	}
};
</script>
