<template>
  <input aria-label="Search for word" @input="updateSearchFilter()" ref="search" type="text" name="textfield" placeholder="Search for words..">
</template>
<script>
import _ from 'lodash';

export default {
  name: 'SearchFilter',
  methods: {
    updateSearchFilter: _.debounce(function (e) {
      this.$emit('input', this.$refs.search.value);
    }, 300)
  }
};
</script>
