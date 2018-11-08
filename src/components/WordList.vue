<template>
  <li class="word-list">
    <div>
      <span class="letter">{{letter}}</span>
      <button class="toggle" v-on:click="toggleDisplay">+</button>
    </div>
    <ul class="words">
      <li v-for="(word, index) in list" v-show="index < displayCount || !preview">
        <router-link :to="{name: 'word', params: {word: word.word}}" :class="`word ${word.state} ${word.gender} can-open-modal`">{{word.word}}</router-link>
      </li>
    </ul>
  </li>
</template>
<style lang="scss" scoped>
  .word-list {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(12, 1fr);
  }

  .letter {
    font-size: 5.063rem;
    margin-top: 0;
    line-height: 0.85em;
    font-family: "Romana Std Bold", Arial, sans-serif;
    position: relative;
  }

  .toggle {
    font-size: 1.5rem;
    margin-right: 0;
    -webkit-transition: all 0.5s ease;
       -moz-transition: all 0.5s ease;
         -o-transition: all 0.5s ease;
            transition: all 0.5s ease;
  }
  .toggle:hover {
    font-style: italic;
    cursor: pointer;
  }

  .words {
    display: grid;
    grid-column: span 10;
    padding: 0;
    margin: 0;
    margin-bottom: 2.25rem;
    grid-template-columns: repeat(5, 1fr);

    li {
      margin: 0;
      line-height: 1.5em;
      button {
        padding: 0;
        font-size: 1.5rem;
        font-weight: 400;
      }
      button {
        -webkit-transition: all 0.5s ease;
           -moz-transition: all 0.5s ease;
             -o-transition: all 0.5s ease;
                transition: all 0.5s ease;
      }
      button:hover {
        cursor: pointer;
        text-decoration: underline;
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
  props: ['letter', 'list'],
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
