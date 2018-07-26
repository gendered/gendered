<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> 
      <router-link to="/about">About</router-link>
      <SearchFilter></SearchFilter>
      <input type="button" v-on:click="getRandom" value="Get Random Word" />
    </div>
    <router-view/>
  </div>
</template>
<style src="./App.scss"></style>
<script>
  import SearchFilter from '@/components/SearchFilter'
  export default {
    components: {
      SearchFilter,
    },
    methods: {
      getRandom() {
        alert('get random!');
      },
    }
  }
</script>
