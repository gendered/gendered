<template>
  <ul class="word-list">
     <li class="letter-list" v-for="(value, key) in words">
        <span class="letter">{{key}}</span>
        <WordList v-bind:value="value"></WordList>
     </li>
   </ul>
</template>
<style lang="scss">
  .word-list {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    font-size: 1.5rem;
    font-weight: 400;
    font-family: garamond;
    padding: 0;
    margin: 0;
    margin-bottom: 5%;

    .letter-list {
      display: grid;
      grid-template-columns: 15% 75%;
    }


    li {
      line-height: 0.8em;
    }

    .letter {
      font-size: 200px;
      font-family: "helvetica neue", Arial, sans-serif;
      position: relative;
      margin-top: 40%;
    }
  }
</style>
<script>
import WordList from '@/components/WordList'
export default {
  name: 'WordLists',
  components: {
    WordList,
  },
  props: ['words'],
};
</script>
