<template>
	<div class="home container">
		<p tabindex="0" id="instructions" class="visuallyhidden">
			Use arrow keys to navigate inside words for a letter
		</p>
		<!-- list of words for each letter -->
		<!-- contains 26 WordList components -->
		<keep-alive :include="['WordList']">
			<WordListContainer :words="filteredWords" />
		</keep-alive>
		<div id="search-updates" class="visuallyhidden" aria-live="polite">
			<!-- content will be updated with Javascript -->
		</div>
		<section class="controls">
			<form role="search">
				<SearchFilter class="search" @input="updateSearchText" />
			</form>
			<OptionsContainer
				@close="closeOptions"
				@filter="handleFilter"
				@random="getRandomWord"
				@scroll="closeOptions"
				:isActive="optionsIsActive"
			/>
			<button
				@click="toggleOptions"
				@keyup.esc="closeOptions"
				:aria-expanded="optionsIsActive"
				id="show-controls"
			>
				*
			</button>
		</section>
	</div>
</template>

<script src="./Home.js"></script>
<style lang="scss" src="./Home.scss"></style>
