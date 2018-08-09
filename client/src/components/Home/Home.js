import WordList from '@/components/WordList'
import FilterPanel from '@/components/FilterPanel'
const API = 'http://localhost:3000/api/words';
import SearchFilter from '@/components/SearchFilter'

export default {
  name: 'Home',
  components: {
    WordList,
    FilterPanel,
    SearchFilter,
  },
  data() {
    return {
      activeFilters: [],
      sources: [],
      gender: [
        {
          'category': 'gender',
          'type': 'female'
        },
        {
          'category': 'gender',
          'type': 'male'
        }
      ],
      words: [],
      count: 0
    }
  },
  created() {
    fetch(API)
    .then(res => res.json())
    .then((res) => {
      this.words = this.alphabetize(res);
    });
  },
  computed: {
    filteredWords () {
      var filtered = Object.assign({}, this.words);
      var activeFilters = this.activeFilters;
      const len = activeFilters.length;
      if (len > 0) {
        for (let letter in filtered) {
          const words = filtered[letter];
          filtered[letter] = words.filter(function(entry) {
            return (function () {
              for (let i = 0; i < len; i++) {
                let option = activeFilters[i];
                switch (option.category) {
                  case 'gender':
                    return entry['gender'] === option.type;
                  case 'source':
                    if (entry['tags']) {
                      return entry['tags'].includes(option.type);
                    }
                }
                return false;
              }
            }());
          });
        }
      }
      return filtered;
    }
  },
  methods: {
    alphabetize(data) {
      let allSources = new Set([]);
      let obj = {};
      for (let i = 0; i < data.length; i++) {
        const item = data[i]
        // Get all tags being used
        const tags = item.tags;
        if (tags) {
          for (let i = 0; i < tags.length; i++) {
            let tag = tags[i];
            if (!allSources.has(tag)) {
              allSources.add(tag)
            }
          }
        }
        const letter = item.word[0].toUpperCase();
        if(!obj[letter]) {
          obj[letter] = [item];
        } else {
          obj[letter].push(item);
        }
      }
      this.createSources(Array.from(allSources));
      return this.sort(obj);
    },
    createSources(arr) {
      this.sources = arr.map((item) => {
        return {'category': 'source', 'type': item }
      });
    },
    sort(unordered) {
      const ordered = {};
      Object.keys(unordered).sort().forEach(function(key) {
        ordered[key] = unordered[key];
      });
      return ordered;
    },
    handleFilter(option) {
      let activeFilters = this.activeFilters;
      let index = -1;
      const category = option.category;
      const type = option.type;
      let obj = {
        'category': category,
        'type': type
      };
      // if it's not you can add or remove
      if (activeFilters) {
        index = this.activeFilters.findIndex(i => i.type === option.type);
        if (index === -1) {
          this.addFilter(obj);
        }
        else {
          this.removeFilter(index);
        }
      }
      else {
        this.addFilter(obj);
      }
    },
    addFilter(option) {
      this.activeFilters.push(option);
    },
    removeFilter(idx) {
      this.activeFilters.splice(idx, 1);
    },
    $_randomProperty: function (obj) {
      var keys = Object.keys(obj);
      return obj[keys[ keys.length * Math.random() << 0]];
    },
    getRandom() {
      let data = this.words;
      let randomEntry = this.$_randomProperty(this.$_randomProperty(data));
      let randomWord = randomEntry['word'];
      this.$router.push(`words/${randomWord}`);
    },
  }
}
