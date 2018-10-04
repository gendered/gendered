<template>
  <ul class="words">
    <li v-for="(word, index) in value" v-if="index < displayCount || !preview">
      <button :class="'word ' + word.state +  ' ' + word.gender" v-on:click="showWordSet(word)">{{word.word}}</button>
    </li>
  </ul>
</template>
<style lang="scss" scoped>
  .words {
    display: grid;
    grid-column: span 10;
    padding: 0;
    margin: 0;
    margin-bottom: 2rem;
    grid-template-columns: repeat(5, 1fr);

    li {
      margin: 0;
      line-height: 0;
      button {
        padding: 0;
        font-size: 1rem;
        font-weight: 400;
      } 
      button:hover {
        cursor: pointer;
      }
    }
  }

  .highlight {
    &.female{
      background: blue;
    } 

    &.male {
      background: red;
    }
  }
</style>
<script>
export default {
  name: 'WordList',
  props: ['value', 'preview', 'displayCount'],
  methods: {
    showWordSet(word){
      this.$emit('show-word-set', word.word, word.gender);
    }
  }
};
</script>
