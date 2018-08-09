<template>
  <div class="home">
      <div class="filter-options">
       <FilterPanel :options="tags" v-on:filter="handleFilter"></FilterPanel>
       <FilterPanel :options="sex" v-on:filter="handleFilter"></FilterPanel>
     </div>
     <keep-alive>
        <WordList v-bind:words="filteredWords"></WordList>
     </keep-alive>
  </div>
</template>

<script src="./Home.js"></script>
<style src="./Home.scss"></style>
