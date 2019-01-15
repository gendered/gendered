<template>
<div class="modal">
	<!-- <div v-if="invalidWord">
	  Word not in dictionary
	</div> -->
  <div class="w-80 w-60-ns center word-set-container">
    <Word v-if="entry" :entry="entry"></Word>
    <Word v-if="equivalent" :entry="equivalent"></Word>
  </div>
  <router-link :to="{ name: 'home' }">Close</router-link>
</div>
</template>
<style lang="scss">
  .word-set-container {
    grid-gap: 2rem;
    width: 100%;
  }
</style>

<script>
  const API = 'https://gendered-api.glitch.me/api/words';
  import Word from '@/components/Word'

  export default {
    name: 'WordContainer',
    components: {
      Word,
    },
    props: ['word'],
    data() {
      return {
        entry: null,
        equivalent: null,
      }
    },
    created() {
      const currentWord = this.$route.params.word;
      let setData = (function(res) {
				if (res.word) {
					this.entry = res;
					let equivalent = this.entry.equivalent;
					if (equivalent) {
						this.getWord(
							equivalent,
							(function(res) {
								this.equivalent = res;
						}).bind(this));
					}
				}
      }).bind(this);
      this.getWord(currentWord, setData);
    },
    methods: {
      getWord(word, callback){
        let url = `${API}/${word}`;
        fetch(url)
        .then(res => res.json())
        .then((res) => {
          if (callback) {
            callback(res);
          }
          else return res;
        })
      },
    },
  };
</script>
