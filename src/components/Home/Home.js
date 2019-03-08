import WordListContainer from "@/components/WordListContainer";
import OptionsContainer from "@/components/OptionsContainer";
import SearchFilter from "@/components/SearchFilter";
import "isomorphic-fetch";
import localforage from "localforage";
import letters from './letters';

let base64 = require("base-64");

const API = "https://gendered-api.glitch.me/api/words";

export default {
	name: "HomePage",
	head: {
		title: { inner: "The Gendered Project - Home" },
		script: [
			{
				type: "text/javascript",
				src: "https://unpkg.com/focus-visible@4.1.5/dist/focus-visible.js",
				async: true
			}
		]
	},
	components: {
		WordListContainer,
		OptionsContainer,
		SearchFilter
	},
	data() {
		return {
			activeFilters: [],
			words: letters,
			count: 0,
			searchText: "",
			toggleAllLists: false,
			optionsIsActive: false,
			loading: true
		};
	},
	created() {
		let self = this;
		localforage
			.getItem("data")
			.then(data => {
				let version = localforage.getItem("version");
				let currentVersion = 2;
				if (!data || !version || version < currentVersion) {
					this.fetchData(currentVersion);
					return;
				}
				this.words = data;
				this.loading = false;
			})
			.catch(function() {
				self.fetchData();
			});
	},
	computed: {
		filteredWords() {
			if (!this.words) {
				return;
			}
			let filtered = this.words.map(entry => ({ ...entry }));
			const searchFilter = new RegExp(this.searchText, "i");
			const activeFilters = this.activeFilters;
			const len = activeFilters.length;
			const length = filtered.length;
			for (let i = 0; i < length; i++) {
				const item = filtered[i];
				const words = item["words"];
				item["words"] = words
					? words.filter(entry => {
							if (!len) {
								entry.state = "";
							}
							for (let i = 0; i < len; i++) {
								let option = activeFilters[i];
								switch (option.category) {
									case "gender":
										entry.state = "";
										if (entry["gender"] === option.type) {
											entry.state = "highlight";
										} else break;
								}
							}
							if (entry["word"] && !!this.searchText) {
								return entry["word"].match(searchFilter);
							} else {
								return true;
							}
					  })
					: [];
			}
			this.count = filtered.reduce((count, obj) => {
				return (count += obj.words.length);
			}, 0);
			this.updateAriaLive();
			return filtered;
		}
	},
	methods: {
		fetchData(currentVersion) {
			let headers = new Headers();
			let username = process.env.VUE_APP_API_USERNAME;
			let password = process.env.VUE_APP_API_SECRET;
			headers.set(
				"Authorization",
				"Basic " + base64.encode(username + ":" + password)
			);
			fetch(`${API}/letter/AZ`, { headers: headers })
				.then(res => res.json())
				.then(res => {
					let d = res.data;
					this.words = d;
					this.loading = false;
					localforage.setItem("data", d);
					localforage.setItem("version", currentVersion);
				});
		},
		toggleOptions() {
			this.optionsIsActive = !this.optionsIsActive;
		},
		closeOptions() {
			if (this.optionsIsActive) this.toggleOptions();
			const controlButton = document.getElementById("show-controls");
			controlButton.focus();
		},
		onSubmit() {
			document.querySelector('.word-link').focus();
		},
		updateSearchText(value) {
			this.searchText = value;
			this.toggleAllLists = !!this.searchText;
		},
		handleFilter(option, toggle, options) {
			let activeFilters = this.activeFilters;
			let index = -1;
			const category = option.category;
			const type = option.type;
			let obj = {
				category: category,
				type: type
			};
			// if it's not you can add or remove
			if (activeFilters) {
				index = this.activeFilters.findIndex(i => i.type === option.type);
				if (index === -1) {
					// If there are only two filters in a category, it should be a toggle
					if (toggle && activeFilters.length) {
						// find filter of the same category and remove
						let i = activeFilters.findIndex(
							i => i.category === option.category
						);
						options.find(item => item.active === true).active = false;

						this.removeFilter(i);
					}
					this.addFilter(obj);
					option.active = true;
				} else {
					this.removeFilter(index);
					option.active = false;
				}
			} else {
				this.addFilter(obj);
			}
		},
		addFilter(option) {
			this.activeFilters.push(option);
		},
		removeFilter(idx) {
			this.activeFilters.splice(idx, 1);
		},
		$_getRandom: function(count) {
			return Math.floor(Math.random() * count);
		},
		getRandomWord() {
			this.closeOptions();
			let data = this.words;
			let randomLetterList = data[this.$_getRandom(data.length)].words;
			let randomWord =
				randomLetterList[this.$_getRandom(randomLetterList.length)].word;
			this.$router.push({ name: "word", params: { word: randomWord } });
		},
		updateAriaLive() {
			const searchUpdates = document.getElementById("search-updates");
			if (searchUpdates) {
				searchUpdates.textContent = `${
					this.count
				} results found matching your search input`;
			}
		}
	}
};
