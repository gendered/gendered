<template>
  <div class="home">
  	<aside>
		<SearchFilter v-on:input="updateSearchText" class="search"></SearchFilter>
	 	<input class="random can-open-modal" type="button" v-on:click="getRandom" value="Get Random Word" />
	 </aside>
	<keep-alive>
		<!-- list of words for each letter -->
		<!-- contians 26 WordList components -->
		<Main v-bind:words="filteredWords"></Main>
	</keep-alive>
	<Footer v-on:filter="handleFilter"></Footer>
  </div>
</template>

<script src="./Home.js"></script>
<style lang="scss" src="./Home.scss"></style>
