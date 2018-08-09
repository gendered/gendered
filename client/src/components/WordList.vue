  <template>
  <ul class="word-list">
     <li class="letter-list" v-for="(value, key) in words">
        <span class="letter">{{key}}</span>
        <ul v-for="word in value">
          <li>
            <a :href="'./words/' + word.word" :class="'word ' + word.gender">{{word.word}}</a>
            <ul class="tag-list" v-for="tag in word.tags">
            <span><i>{{tag}}</i></span>
            </ul>
          </li>
        </ul>
     </li>
   </ul>
</template>
<script>
  const API = 'http://localhost:3000/api/words';
  export default {
    name: 'WordList',
    props: ['words'],
  };
</script>
