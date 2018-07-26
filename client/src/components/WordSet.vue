<template>
  <div>
    <section :class="'word-set ' + entry.gender">
      <span>{{ entry.word }}</span>
      <span>{{ entry.definition }}</span>
    </section>
    <!-- <section :class="'word-set ' + word.gender">
      <span>{{ word.word }}</span>
      <span>{{ word.definition }}</span>
    </section> -->
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
        entryOpposite: {}
      }
    },
    created() {
      let obj = JSON.stringify({ "where": { "word": this.word } });
      const url = `${API}findOne?filter=${obj}`
      fetch(url)
      .then(res => res.json())
      .then((res) => {
        console.log(res);
        this.entry = res;
      })
      .then(() => {
        let genderEquivalent = this.entry.equivalent;
      })
    },
  };
</script>
