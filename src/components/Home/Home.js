import Main from '@/components/Main';
import Footer from '@/components/Footer';
import SearchFilter from '@/components/SearchFilter';
const API = 'https://gendered-api.glitch.me/api/words';

export default {
  name: 'Home',
  head: {
    title: {
      inner: 'The Gendered Project - Home'
    },
    meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        },
        {
          name: 'description',
          content: 'A library of gendered words.'
        },
        {
          property: 'og:description',
          content: 'A library of gendered words.'
        }
    ],
    link: [
      {
        rel: 'preconnect',
        href:'https://gendered-api.glitch.me'
      }
    ]
  },
  components: {
    Main,
    Footer,
    SearchFilter,
  },
  data() {
    return {
      activeFilters: [],
      words: [],
      count: 0,
      searchText: ''
    }
  },
  created() {
    fetch(`${API}/letter/AJ`)
    .then(res => res.json())
    .then((res) => {
      this.words = res;
			setTimeout(() => { this.loadMore(); }, 3000);
    });
  },
  computed: {
    filteredWords () {
      var filtered = Object.assign([], this.words);
      const filter = new RegExp(this.searchText, 'i');
      var activeFilters = this.activeFilters;
      const len = activeFilters.length;
			const length = filtered.length;
			for (let i = 0; i < length; i++) {
				const item = filtered[i];
        const words = item['words'];
        words.filter(entry => {
					if (!len) {
						entry.state = '';
					}
          for (let i = 0; i < len; i++) {
            let option = activeFilters[i];
            switch (option.category) {
              case 'gender':
                entry.state = '';
                if (entry['gender'] === option.type) {
                  entry.state = 'highlight';
                }
                else break;
              }
          }
          if (entry['word'] !== undefined) { return entry['word'].match(filter) }
          else return true;
        });
      }
      return filtered;
    },
  },
  methods: {
		loadMore() {
			fetch(`${API}/letter/KZ`)
			.then(res => res.json())
			.then((res) => {
				this.words = this.words.concat(res);
			});
		},
    updateSearchText(value) {
      this.searchText = value;
    },
    sort(unordered) {
      const ordered = {};
      Object.keys(unordered).sort().forEach(function(key) {
        ordered[key] = unordered[key];
      });
      return ordered;
    },
    handleFilter(option, toggle) {
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
          // If there are only two filters in a category, it should be a toggle
          if (toggle && activeFilters.length) {
            // find filter of the same category and remove
            let i = activeFilters.findIndex(i => i.category === option.category);
            this.removeFilter(i);
          }
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
      this.$router.push({ name: 'word', params: { word: randomWord }});
    },
		scrollToTop() {
			window.scrollTo(0, 0);
		}
  }
}
