<template>
  <div>
    <li class="word-list">
      <div>
        <span class="letter">{{letter}}</span>
      </div>
      <ul class="words">
        <li v-for="(word, index) in list" v-show="index < displayCount || !preview">
          <router-link :to="{name: 'word', params: {word: word.word}}" :class="`word ${word.state} ${word.gender} can-open-modal`">{{word.word}}</router-link>
        </li>
      </ul>
    </li>
    <button class="toggle" v-on:click="toggleDisplay">+</button>
  </div>
</template>
<style lang="scss" scoped>
	@import '../mixins.scss';

  .word-list {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(10, 1fr);

		@include break(small) {
			grid-template-columns: repeat(5, 1fr);
		}

		@include break(medium) {
			grid-template-columns: repeat(7, 1fr);
		}
  }

  .letter {
    font-size: 4.096rem;
    margin-top: 0;
    line-height: 0.85em;
    font-family: "Romana Std Bold", Arial, sans-serif;
		position: -webkit-sticky;
	  position: sticky;
	  top: 1.6rem;
  }

  .toggle {
    font-size: 1.6rem;
    margin-right: 0;
    -webkit-transition: all 0.5s ease;
       -moz-transition: all 0.5s ease;
         -o-transition: all 0.5s ease;
            transition: all 0.5s ease;
		position: -webkit-sticky;
	  position: sticky;
	  bottom: 2.56rem;
    margin-bottom: 2.56rem;

		&:hover {
	    font-style: italic;
	    cursor: pointer;
		}
  }

  .words {
    display: grid;
    grid-column: span 8;
    padding: 0;
    margin: 0;
    grid-template-columns: repeat(8, 1fr);
    column-gap: 1rem;

		@include break(small) {
			grid-template-columns: repeat(4, 1fr);
		}

		@include break(medium) {
			grid-template-columns: repeat(6, 1fr);
		}

    li {
      margin: 0;
      line-height: 1.6em;

      a {
        padding: 0;
        font-size: 1rem;
        font-weight: 400;
        -webkit-transition: all 0.5s ease;
           -moz-transition: all 0.5s ease;
             -o-transition: all 0.5s ease;
                transition: all 0.5s ease;
      }
      a:hover {
        cursor: pointer;
        border-bottom: 1.6px solid black;
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
