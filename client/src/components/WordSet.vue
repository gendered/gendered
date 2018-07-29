<template>
  <div>
    <section :class="'word-set ' + entry.gender">
      <span>{{ entry.word }}</span>
      <span>{{ entry.definition }}</span>
    </section>
    <section v-if="equivalent" :class="'word-set ' + equivalent.gender">
      <span>{{ equivalent.word }}</span>
      <span>{{ equivalent.definition }}</span>
    </section>
  </div>
</template>

<script>
  const API = 'http://localhost:3000/api/words/';

  export default {
    name: 'WordSet',
    props: ['word'],
    data() {
      return {
        entry: {},
        entrySet: [],
        equivalent: {},
        equivalentSet: []
      }
    },
    created() {
      let setData = (function(res) {
        this.entry = res;
        let equivalent = this.entry.equivalent;
        if (equivalent) {
          this.getWord(equivalent, (function(res) {
            this.equivalent = res;
          }).bind(this));
          this.equivalentSet = this.getWordSet(equivalent);
        }
      }).bind(this);
      this.getWord(this.word, setData);
      this.entrySet = this.getWordSet(this.word)
    },
    methods: {
      getWordSet(word) {

      },
      getWord(word, callback){
        let obj = JSON.stringify({ "where": { "word": word } });
        let url = `${API}findOne?filter=${obj}`
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
