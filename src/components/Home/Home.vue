<template>
  <div class="home">
  	<aside>
		<SearchFilter></SearchFilter>
	 	<input type="button" v-on:click="getRandom" value="Get Random Word" />
	 </aside>
	<keep-alive>
		<!-- list of words for each letter -->
		<!-- contians 26 WordList components -->
		<Main v-bind:words="filteredWords"></Main>
	</keep-alive>	
	<div class="filter-options">
		<FilterPanel :options="gender" v-on:filter="handleFilter"></FilterPanel>
	</div>

  </div>
</template>

<script src="./Home.js"></script>
<style src="./Home.scss"></style>
