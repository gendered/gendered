  <template>
  <ul class="word-list">
     <li class="letter-list" v-for="(value, key) in words">
        <span class="letter">{{key}}</span>
        <section class="words">
          <ul v-for="word in value">
          <li>
            <a :href="'./words/' + word.word" :class="'word ' + word.gender">{{word.word}}</a>
            <span><i>{{word.gender}}</i></span>
            <ul class="tag-list" v-for="tag in word.tags">
              <li><i>{{tag}}</i></li>
            </ul>
          </li>
          </ul>
        </section>
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
