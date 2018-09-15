<template>
<div>
  <ul class="words">
    <li v-for="(word, index) in value" v-if="index < displayCount || !preview">
      <button :class="'word ' + word.gender" v-on:click="showWordSet(word.word)">{{word.word}}</button>
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

  li > button {
    font-size: 1.5rem;
    font-weight: 400;
    font-family: garamond;
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
    showWordSet(word){
      this.$emit('show-word-set', word);
    }
  }
};
</script>
