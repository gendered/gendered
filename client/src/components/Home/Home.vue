<template>
  <div class="home">
	<!--<SearchFilter></SearchFilter>-->
 	<input type="button" v-on:click="getRandom" value="Get Random Word" />
	<div class="filter-options">
		<FilterPanel :options="sources" v-on:filter="handleFilter"></FilterPanel>
		<FilterPanel :options="gender" v-on:filter="handleFilter"></FilterPanel>
	</div>
	<keep-alive>
		<WordList v-bind:words="filteredWords"></WordList>
	</keep-alive>
  </div>
</template>

<script src="./Home.js"></script>
<style src="./Home.scss"></style>
