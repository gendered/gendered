<template>
	<div class="home">
		<!-- list of words for each letter -->
		<!-- contains 26 WordList components -->
		<keep-alive :include="['WordList']">
			<WordListContainer :words="filteredWords" />
		</keep-alive>
		<section class="controls">
			<form role="search">
				<SearchFilter class="search" @input="updateSearchText" />
			</form>
			<OptionsContainer
				@scrollToTop="scrollToTop"
				@filter="handleFilter"
				@random="getRandomWord"
				:isActive="optionsIsActive"
			/>
			<button @click="showOptions" :aria-expanded="optionsIsActive">*</button>
		</section>
	</div>
</template>

<script src="./Home.js"></script>
<style lang="scss" src="./Home.scss"></style>
