<template>
  <div class="word-list">
    <ul>
       <li v-for="(value, key) in words">
          <span>{{key}}</span>
          <ul v-for="word in value">
            <li>
              <a :href="'./words/' + word.word" :class="'word ' + word.gender">{{word.word}}</a>
              <ul v-for="tag in word.tags">
              <span><i>{{tag}}</i></span>
              </ul>
            </li>
          </ul>
       </li>
     </ul>
  </div>
</template>

<script>
  const API = 'http://localhost:3000/api/words';
  export default {
    name: 'WordList',
    props: ['words'],
  };
</script>
