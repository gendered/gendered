import WordList from '@/components/WordList'
import FilterPanel from '@/components/FilterPanel'
const API = 'http://localhost:3000/api/words';

export default {
  name: 'Home',
  components: {
    WordList,
    FilterPanel
  },
  data() {
    return {
      activeFilters: [],
      tags: [],
      sex: [
        {
          'name': 'sex',
          'type': 'female'
        },
        {
          'name': 'sex',
          'type': 'male'
        }
      ],
      words: [],
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
                switch (option.name) {
                  case 'sex':
                    return entry['gender'] === option.type;
                  case 'tag':
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
      let allTags = new Set([]);
      let obj = {};
      for (let i = 0; i < data.length; i++) {
        const item = data[i]
        // Get all tags being used
        const tags = item.tags;
        if (tags) {
          for (let i = 0; i < tags.length; i++) {
            let tag = tags[i];
            if (!allTags.has(tag)) {
              allTags.add(tag)
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
      this.createTags(Array.from(allTags));
      return this.sort(obj);
    },
    createTags(arr) {
      this.tags = arr.map((item) => {
        return {'name': 'tag', 'type': item }
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
      const name = option.name;
      const type = option.type;
      let obj = {
        'name': name,
        'type': type
      };
      // if it's not you can add or remove
      if (activeFilters) {
        index = this.activeFilters.findIndex(i => i.name === option.name);
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
    }
  }
}
