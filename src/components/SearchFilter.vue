<template>
  <input
    ref="search"
    aria-label="Search for word"
    type="text"
    name="textfield"
    placeholder="Search for words.."
    @input="updateSearchFilter()"
  >
</template>
<script>
import _ from 'lodash';

export default {
	name: 'SearchFilter',
	methods: {
		updateSearchFilter() {
			_.debounce(()=> {
				this.$emit('input', this.$refs.search.value);
			}, 300).bind(this);
		}
	}
};
</script>
