<template>
  <div>
    <ul v-on="listeners" class="word-list">
       <li class="letter-list" v-for="(value, key) in words">
          <span class="letter">{{key}}</span>
          <WordList v-bind:value="value"></WordList>
       </li>
     </ul>
     <div v-if="showSet && currentWord" class="modal">
       <WordContainer v-on:change-word="changeWord" :word="currentWord"></WordContainer>
       <button v-on:click="closeWordSet">Close</button>
     </div>
  </div>
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

    .modal {
      display: flex;
      flex-direction: column;
      position: fixed;
      z-index: 9998;
      top: 0;
      right: 0;
      width: 50%;
      height: 100%;
      background-color: #fff;
      box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
      transition: opacity .3s ease;
    }
  }
</style>
<script>
import WordList from '@/components/WordList'
import WordContainer from '@/components/WordContainer'

export default {
  name: 'WordLists',
  components: {
    WordList,
    WordContainer,
  },
  props: ['words'],
  data() {
    return {
      showSet: false,
      currentWord: null,
    }
  },
  computed: {
    listeners() {
      if (this.showSet) {
        return { click: this.closeWordSet }
      }
      return null
    },
  },
  methods: {
    showWordSet(word){
      this.showSet = true;
      this.currentWord = word;
    },
    closeWordSet() {
      this.showSet = false;
      this.currentWord = null;
    },
    changeWord(word) {
      console.log('changing');
      this.currentWord = word;
    },
  }
};
</script>
