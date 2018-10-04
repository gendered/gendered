<template>
  <input @input="updateSearchFilter()" ref="search" type="text" name="textfield" placeholder="Search for words..">
</template>

<script>
export default {
  name: 'SearchFilter',
  methods: {
  	updateSearchFilter() {
		this.$emit('input', this.$refs.search.value);
  	}
  }
};
</script>
