<template>
  <section>
    <h1>{{ entry.word }}</h1>
    <p>{{ entry.definition }}</p>
    <ul class="word-set">
      <li v-for="syn in entry.syns" v-if="syn != entry.word"><a :href="syn">{{syn}}</a></li>
    </ul>
    <ul class="tag-list">
      <li v-for="tag in entry.tags">{{tag}}</li>
    </ul>
  </section>
</template>
<style lang="scss" scoped>
  .tag-list {
    padding: 0.25rem 0;
    font-size: 0.75rem;
    color: rgba(0,0,0,0.7);
  }
</style>    
<script>
  export default {
    name: 'Word',
    props: ['entry'],
  };
</script>
