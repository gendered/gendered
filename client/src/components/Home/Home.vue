<template>
  <div class="home">
  	<aside>
		<SearchFilter></SearchFilter>
	 	<input type="button" v-on:click="getRandom" value="Get Random Word" />
	 </aside>
	<keep-alive>
		<WordList v-bind:words="filteredWords"></WordList>
	</keep-alive>
	<div class="filter-options">
		<FilterPanel :options="sources" v-on:filter="handleFilter"></FilterPanel>
		<FilterPanel :options="gender" v-on:filter="handleFilter"></FilterPanel>
	</div>
  </div>
</template>

<script src="./Home.js"></script>
<style src="./Home.scss"></style>
