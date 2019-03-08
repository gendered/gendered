<template>
	<div class="home container">
		<p tabindex="0" id="instructions" class="visuallyhidden">
			Use arrow keys to navigate inside words for a letter
		</p>
		<!-- list of words for each letter -->
		<!-- contains 26 WordList components -->
		<keep-alive :include="['WordList']">
			<WordListContainer
				:words="filteredWords"
				:toggleAllLists="toggleAllLists"
				:loading="loading"
			/>
		</keep-alive>
		<div id="search-updates" class="visuallyhidden" aria-live="polite">
			<!-- content will be updated with Javascript -->
		</div>
		<section class="controls">
			<form
				class="search-container"
				role="search"
				v-on:submit.prevent="onSubmit"
			>
				<img src="../../assets/imgs/search.svg" alt="Search in word list" />
				<SearchFilter class="search" @input="updateSearchText" />
			</form>
			<OptionsContainer
				@filter="handleFilter"
				@random="getRandomWord"
				:isActive="optionsIsActive"
			/>
			<button
				@click="toggleOptions"
				@keyup.esc="closeOptions"
				aria-label="Controls"
				:aria-expanded="optionsIsActive"
				aria-controls="options"
				id="show-controls"
			>
				<img src="../../assets/imgs/filter.svg" alt="Controls" />
			</button>
		</section>
	</div>
</template>

<script src="./Home.js"></script>
<style lang="scss" src="./Home.scss"></style>
