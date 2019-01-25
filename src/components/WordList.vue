<template>
  <div class="word-list-container">
    <li class="word-list">
      <div class="letter">
        <span>{{letter}}</span>
        <!-- each letter should get individual id   -->
        <button class="toggle" v-on:click="toggleDisplay">+</button>
        <button class="visuallyhidden" v-on:click="skipLetterList">Skip</button>
      </div>
      <ul class="words">
        <li v-for="(word, index) in list" v-if="index < displayCount || !preview">
          <router-link :to="{name: 'word', params: {word: word.word}}" :class="`word ${word.state} ${word.gender} can-open-modal`">{{word.word}}</router-link>
        </li>
      </ul>
    </li>
  </div>
</template>
<style lang="scss" scoped>
	@import '../mixins.scss';

  .word-list {
    margin-bottom: 1.6rem;
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(5, 1fr);
  }

  .letter {
    font-size: 2.56rem;
    text-align: right;
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
    padding: 0;
    margin: 0;
    grid-column: 2 / 6;

		@include break(small) {
			// grid-template-columns: repeat(4, 1fr);
		}

		@include break(medium) {
			// grid-template-columns: repeat(6, 1fr);
		}

    li {
      margin: 0;
      margin-right: 0.625rem;
      line-height: 1.6em;
      display: inline-block;

      a {
        padding: 0.625rem;
        font-size: 1rem;
        font-weight: 400;
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

	.visuallyhidden:not(:focus):not(:active) {
	  position: absolute;

	  width: 1px;
	  height: 1px;
	  margin: -1px;
	  border: 0;
	  padding: 0;

	  white-space: nowrap;

	  clip-path: inset(100%);
	  clip: rect(0 0 0 0);
	  overflow: hidden;
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
    toggleDisplay(e) {
			let el = e.target;
      el.textContent = this.preview ? "-" : "+";
      this.preview = !this.preview;
    },
		skipLetterList(e) {
			let el = e.target;
			let container = el.closest(".word-list-container");
			let nextToggle = container.nextSibling.querySelector('.toggle')
			if (nextToggle) nextToggle.focus();
		},
  }
};
</script>
