<template>
  <div class="home">
  	<form role="search">
			<SearchFilter v-on:input="updateSearchText" class="search"></SearchFilter>
			<!-- <input class="random can-open-modal" type="button" v-on:click="getRandom" value="Get Random Word" /> -->
	 </form>
		<!-- list of words for each letter -->
		<!-- contains 26 WordList components -->
		<keep-alive :include="['WordList']">
			<Main v-bind:words="filteredWords"></Main>
		</keep-alive>
		<Footer v-on:scrollToTop="scrollToTop" v-on:filter="handleFilter"></Footer>
  </div>
</template>

<script src="./Home.js"></script>
<style lang="scss" src="./Home.scss"></style>
