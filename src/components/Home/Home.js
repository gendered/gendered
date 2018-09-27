import Main from '@/components/Main'
import FilterPanel from '@/components/FilterPanel'
const API = 'https://gendered-api.glitch.me/api/words';
import SearchFilter from '@/components/SearchFilter'

export default {
  name: 'Home',
  components: {
    Main,
    FilterPanel,
    SearchFilter,
  },
  data() {
    return {
      activeFilters: [],
      gender: [
        {
          'category': 'gender',
          'type': 'female',
          'active': false
        },
        {
          'category': 'gender',
          'type': 'male',
          'active': false
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
            let isValid = false;
            return (function () {
              for (let i = 0; i < len; i++) {
                let option = activeFilters[i];
                switch (option.category) {
                  case 'gender':
                    if (entry['gender'] === option.type) {
                      isValid = true;
                    }
                    else break;
                }
              }
              return isValid;
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
        const letter = item.word[0].toUpperCase();
        if(!obj[letter]) {
          obj[letter] = [item];
        } else {
          obj[letter].push(item);
        }
      }
      return this.sort(obj);
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
          option.active = true;
        }
        else {
          this.removeFilter(index);
          option.active = false;
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
