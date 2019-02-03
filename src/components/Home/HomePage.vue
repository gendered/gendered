<template>
	<div class="home">
		<form role="search">
			<SearchFilter class="search" @input="updateSearchText" />
			<!-- <input class="random can-open-modal" type="button" v-on:click="getRandom" value="Get Random Word" /> -->
		</form>
		<!-- list of words for each letter -->
		<!-- contains 26 WordList components -->
		<keep-alive :include="['WordList']">
			<WordListContainer :words="filteredWords" />
		</keep-alive>
		<OptionsContainer @scrollToTop="scrollToTop" @filter="handleFilter" />
	</div>
</template>

<script src="./Home.js"></script>
<style lang="scss" src="./Home.scss"></style>
