<template>
  <div class="word-set-container">
    <section :class="'word-set ' + entry.gender">
      <h1>{{ entry.word }}</h1>
      <p>{{ entry.definition }}</p>
      <ul class="word-set" v-for="syn in entry.syns">
        <li v-if="syn != entry.word"><a :href="'./words/' + syn">{{syn}}</a></li>
      </ul>
    </section>
    <section v-if="equivalent" :class="'word-set ' + equivalent.gender">
      <h1>{{ equivalent.word }}</h1>
      <p>{{ equivalent.definition }}</p>
      <ul class="word-set" v-for="syn in equivalent.syns">
        <li v-if="syn != equivalent.word">
          <a :href="'./words/' + syn">{{syn}}</a>
        </li>
      </ul>
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
        equivalent: {},
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
        }
      }).bind(this);
      this.getWord(this.word, setData);
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
