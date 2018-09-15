<template>
<div>
  <ul class="words">
    <li v-for="(word, index) in value" v-if="index < displayCount || !preview">
      <a :href="'./words/' + word.word" :class="'word ' + word.gender">{{word.word}}</a>
    </li>
  </ul>
  <button class="toggle" v-on:click="toggleDisplay">+</button>
</div>
</template>
<style lang="scss">
  .words {
    display: grid;
    padding: 0;
    margin: 0;
    grid-template-columns: repeat(6, 1fr);
  }
</style>
<script>
export default {
  name: 'WordList',
  props: ['value'],
  data() {
    return {
      preview: true,
      displayCount: 24,
    }
  },
  methods: {
    toggleDisplay() {
      const toggleButton = document.querySelector(".toggle");
      toggleButton.textContent = this.preview ? "-" : "+";
      this.preview = !this.preview;
    },
  }
};
</script>
